import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../features/auth/authSlice";
import { formatNumberWithDots } from "../../utils/formatNumber";
import { toast } from "react-toastify";
function WishList() {
  const dispatch = useDispatch();
  let wishlist = useSelector((state) => state.auth.user?.wishlist);
  wishlist = wishlist || [];

  const handleAddToCart = (product) => {
    const existingCart = localStorage.getItem("cart");
    const cart = existingCart
      ? JSON.parse(existingCart)
      : { products: [], total: 0, totalQuantity: 0, totalDiscount: 0 };

    const foundIndex = cart.products.findIndex((x) => x._id === product._id);
    if (foundIndex > -1) {
      cart.products[foundIndex].count += 1;
    } else {
      const productToAdd = {
        _id: product._id,
        color: product.color.length > 0 ? product.color[0] : "",
        name: product.title,
        slug: product.slug,
        thumbnail: product.thumbnail,
        feature:
          product.feature !== undefined && product.feature.length > 0
            ? product.feature[product.feature.length - 1].name
            : "",
        price: product.price,
        count: 1,
      };

      cart.products.push(productToAdd);
    }
    cart.totalQuantity += 1;
    cart.total += product.price;
    toast.success("Thêm vào giỏ hàng thành công");
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  };
  return (
    <div className="pt-[80px] pb-[80px] pl-[165px] pr-[165px]">
      <div className="container mx-auto ">
        <h4 className="mb-[20px] font-[500] inline-block text-[24px]">
          Danh sách sản phẩm yêu thích của bạn
        </h4>
        <table className="w-[100%]">
          <thead>
            <tr className="bg-[#f6f7fb]">
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              ></th>
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              >
                Sản phẩm
              </th>
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              ></th>
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              >
                {" "}
                Giá
              </th>
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="text-[20px] font-normal text-left capitalize border-none text-[#292930] p-[18px] py-[15px] px-[15px]"
              ></th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((product) => (
              <tr className="border-b border-gray-300">
                <td className="text-[20px] border-none p-[15px]">
                  <div
                    onClick={() => {
                      dispatch(addToWishlist({ proId: product._id }));
                    }}
                    className="block text-center h-[32px] w-[32px] line-[30px] bg-[#f6f7fb] rounded-[50%] text-[12px] text-[#000] transition-all duration-[.3s] ease-in-out hover:bg-[#1E293B] hover:text-[#fff]"
                  >
                    <CloseIcon className="w-[18px] mt-[5px] cursor-pointer" />
                  </div>
                </td>
                <td className="text-[20px] border-none p-[15px]">
                  <a href="#" className="block rounded-[10px]">
                    <img
                      src={product.thumbnail}
                      alt=""
                      className="rounded-[10px] h-[80px] w-[80px] object-cover"
                    />
                  </a>
                </td>
                <td className="text-[20px] border-none p-[15px]">
                  <a href="#">{product.title}</a>
                </td>
                <td className="text-[20px] border-none p-[15px] font-[500]">
                  {formatNumberWithDots(product.price)} ₫
                </td>
                <td className="text-[20px] border-none p-[15px] font-[500] text-[#7777]">
                  {product.quantity > 0 ? "In Stock" : "Out Stock"}
                </td>
                <td className="text-[20px] border-none p-[15px]">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="border border-[#dddddd] p-[20px] pt-[15px] pb-[15px] text-[14px] rounded-[7px] font-[500] transition-all duration-[.3s] ease-in-out hover:bg-[#1E293B] hover:text-[#fff]"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WishList;
