import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";
import { getCategories } from "../../features/pcategory/pcategorySlice";
import { getColors } from "../../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../../features/upload/uploadSlice";
import {
  createProduct,
  getAProduct,
  updateAProduct,
  resetState,
  resetProductState,
} from "../../features/product/productSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const defaultProductState = {
  title: "",
  description: "",
  price: "",
  brand: "",
  category: "",
  tags: "",
  color: [],
  quantity: "",
  images: [],
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[3];
  const newProduct = useSelector((state) => state.product);
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const uploadImgState = useSelector((state) => state.upload.images);

  const [color, setColor] = useState([]);
  const [images, setImages] = useState(newProduct.productName?.images || []);
  useEffect(() => {
    setImages(newProduct.productName?.images || []);
  }, [newProduct.productName?.images]);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productName,
  } = newProduct;
  const product = productName !== undefined ? productName : defaultProductState;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isSuccess && updatedProduct) {
      toast.success("Product Updated Successfullly!");
      navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);
  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.title,
      value: i.title,
    });
  });
  // product.images.forEach((i) => {
  //   img.push({
  //     public_id: i?.public_id,
  //     url: i.url,
  //   });
  // });

  useEffect(() => {
    formik.setFieldValue("color", color || []);
  }, [color]);
  useEffect(() => {
    formik.setFieldValue("images", images || []);
  }, [images]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: product,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        console.log(data.productData);
        dispatch(updateAProduct(data));
        dispatch(resetState());
      } else {
        console.log(values);
        dispatch(createProduct(values));
        formik.resetForm();
        setColor(null);
        setImages([]);
        dispatch(resetProductState());
        // setTimeout(() => {
        //   dispatch(resetState());
        // }, 1000);
      }
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  const handleImages = async (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles)).then((res) => {
      setImages((prevImages) => [...prevImages, ...res.payload]);
    });
  };

  const handleDeleteImage = (image, index) => {
    if (image.public_id !== undefined) {
      dispatch(delImg(image.public_id));
    }
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    console.log("delete", updatedImages);
    setImages(updatedImages);
  };

  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="flex gap-5 flex-col">
          <div className=" h-16">
            <CustomInput
              type="text"
              label="Enter Product Title"
              name="title"
              onChng={formik.handleChange("title")}
              onBlr={formik.handleBlur("title")}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className=" relative">
            <div className=" h-25 ">
              <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error absolute bottom-[-18px]">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className=" h-16">
            <CustomInput
              type="number"
              label="Enter Product Price"
              name="price"
              onChng={formik.handleChange("price")}
              onBlr={formik.handleBlur("price")}
              val={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div className=" h-16 flex flex-col ">
            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              className="block appearance-none w-full px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded py-3 mb-3"
              id=""
            >
              <option value="">Select Brand</option>
              {brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error mt-[-10px]">
              {formik.touched.brand && formik.errors.brand}
            </div>
          </div>
          <div className=" h-16">
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
              className="block appearance-none w-full  px-2  text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded py-3 mb-3"
              id=""
            >
              <option value="">Select Category</option>
              {catState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            <div className="error mt-[-10px]">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div className=" h-16">
            <select
              name="tags"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
              className="block appearance-none w-full px-2 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded py-3 mb-3"
              id=""
            >
              <option value="" disabled>
                Select Tags
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error mt-[-10px]">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <div className=" h-10">
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Select colors"
              value={formik.values.color}
              defaultValue={color}
              onChange={(i) => handleColors(i)}
              options={coloropt}
            />
            <div className="error">
              {formik.touched.color && formik.errors.color}
            </div>
          </div>

          <div className=" h-16">
            <CustomInput
              type="number"
              label="Enter Product Quantity"
              name="quantity"
              onChng={formik.handleChange("quantity")}
              onBlr={formik.handleBlur("quantity")}
              val={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="bg-white border-1 p-12 text-center">
            <Dropzone onDrop={(acceptedFiles) => handleImages(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps({ multiple: true })} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages flex flex-wrap gap-3">
            {images?.map((i, j) => {
              return (
                <div className=" relative flex" key={j}>
                  <img src={i.url} alt="" width={200} height={200} />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(i, j)}
                    className="bg-white rounded-md p-0.5 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 relative z-20"
                    style={{ alignSelf: "start", size: "10px" }}
                    width={10}
                    height={10}
                  >
                    <span class="sr-only">Close menu</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
          <button
            className="inline-block align-middle text-center select-none font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-green-500 text-white hover:bg-green-600 border-0 rounded-3 my-5 h-10"
            type="submit"
          >
            {getProductId !== undefined ? "Edit" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
