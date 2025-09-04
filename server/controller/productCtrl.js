const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const oldProduct = await Product.findById(id);
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (
      req.body.images &&
      req.body.images.length > 0 &&
      ((oldProduct.images.length > 0 &&
        oldProduct.images[0].url !== req.body.images[0].url) ||
        oldProduct.images.length === 0)
    ) {
      updatedProduct.thumbnail = req.body.images[0].url;
      await updatedProduct.save();
    } else if (req.body.images && req.body.images.length === 0) {
      updatedProduct.thumbnail =
        "https://res.cloudinary.com/dqwdvpi4d/image/upload/v1691639790/default-product-image-removebg-preview_p3g0jy.png";
      await updatedProduct.save();
    }

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  console.log(slug);
  try {
    const findProduct = await Product.findOne({ slug: slug })
      .populate("ratings.postedby", "_id name")
      .exec();
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// const searchProduct = asyncHandler(async (req, res) => {
//   const { query } = req.params;
//   console.log(query);
//   try {
//     const regexPattern = query
//       .split(" ")
//       .map((word) => `(?=.*\\b${word}\\b)`)
//       .join("");
//     console.log(regexPattern);
//     const findProduct = await Product.find({
//       title: { $regex: new RegExp(regexPattern, "i") },
//     });
//     const totalProducts = await Product.countDocuments({
//       title: { $regex: new RegExp(regexPattern, "i") },
//     });
//     res.json({ findProduct, totalProducts, keyword: query });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const searchProduct = asyncHandler(async (req, res) => {
  const query = req.query;
  const { keyword, page, limit } = query;
  console.log("Hi", keyword, page, limit);

  try {
    const regexPattern = keyword
      .split(" ")
      .map((word) => `(?=.*\\b${word}\\b)`)
      .join("");
    console.log(regexPattern);

    // Tính toán chỉ số bắt đầu dựa trên trang và giới hạn
    const startIndex = (page - 1) * limit;

    // Tìm kiếm sản phẩm và đếm tổng số sản phẩm
    const findProduct = await Product.find({
      title: { $regex: new RegExp(regexPattern, "i") },
    })
      .select(
        "title price thumbnail slug feature brand color category totalrating"
      )
      .skip(startIndex) // Bỏ qua các kết quả trước chỉ số bắt đầu
      .limit(limit); // Giới hạn số lượng kết quả trả về

    const totalProducts = await Product.countDocuments({
      title: { $regex: new RegExp(regexPattern, "i") },
    });

    res.json({
      findProduct,
      totalProducts,
      keyword: keyword,
      currentPage: page,
      limit: limit,
      totalPages: Math.ceil(totalProducts / limit),
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let countQuery = Product.find(JSON.parse(queryStr));

    const totalProducts = await countQuery.countDocuments();

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const products = await query;
    res.json({ products, totalProducts, page, limit });
  } catch (error) {
    throw new Error(error);
  }
});
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { proId } = req.body;
  try {
    const findUser = await User.findById(_id);
    const findProduct = await Product.findById(proId);
    if (!findProduct) throw new Error("Product not found");
    const alreadyadded = findUser.wishlist.find(
      (id) => id.toString() === proId
    );
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: proId },
        },
        {
          new: true,
        }
      )
        .populate("wishlist")
        .exec();
      const resUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        accessToken: user.accessToken,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        wishlist: user.wishlist,
      };
      res.json({ message: "Product removed from wishlist", user: resUser });
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: proId },
        },
        {
          new: true,
        }
      )
        .populate("wishlist")
        .exec();
      const resUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        accessToken: user.accessToken,
        wishlist: user.wishlist,
      };
      res.json({ message: "Product added to wishlist", user: resUser });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.createdAt": Date.now(),
          },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
              createdAt: Date.now(),
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    )
      .populate("ratings.postedby", "_id name")
      .exec();
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getRelatedProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ slug: id });
    const relatedProducts = await Product.find({
      slug: { $ne: id },
      category: product.category,
    })
      .limit(10)
      .select("_id title thumbnail price slug totalrating");
    res.json(relatedProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategoryBrands = asyncHandler(async (req, res) => {
  try {
    const catalog = await Product.aggregate([
      {
        $group: {
          _id: "$category", // Nhóm theo danh mục
          brands: { $addToSet: "$brand" }, // Lấy danh sách các thương hiệu (loại bỏ các giá trị trùng lặp)
        },
      },
      // {
      //   $project: {
      //     category: "$_id",
      //     brands: 1,
      //   },
      // },
      // {
      //   $unset: "_id",
      // },
    ]);
    res.json(catalog);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getProductBySlug,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  searchProduct,
  getRelatedProduct,
  getCategoryBrands,
};
