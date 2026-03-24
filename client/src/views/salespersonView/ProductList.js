import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteAProduct,
  resetState,
} from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import useGetColumnSearchProps from "../../hook/useSearchProps";
import CustomModal from "../../components/CustomModal";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const productState = useSelector((state) => state.product.products);
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      ...useGetColumnSearchProps("title", "Title"),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      ...useGetColumnSearchProps("brand", "Brand"),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
      ...useGetColumnSearchProps("category", "Category"),
    },
    {
      title: "Color",
      dataIndex: "color",
      sorter: (a, b) => a.color.length - b.color.length,
      ...useGetColumnSearchProps("color", "Color"),
    },
    {
      title: "Price (VNĐ)",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
    console.log(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      color: productState[i].color.join(", "),
      price: productState[i].price,
      action: (
        <div className=" flex">
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" text-2xl text-red-600"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-2xl text-red-600 bg-transparent border-0"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 500);
  };
  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this product ?"
      />
    </div>
  );
};

export default ProductList;
