import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../../features/pcategory/pcategorySlice";
import CustomModal from "../../components/CustomModal";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);
  const pCatStat = useSelector((state) => state.pCategory.pCategories);
  const data1 = [];
  for (let i = 0; i < pCatStat.length; i++) {
    data1.push({
      key: i + 1,
      name: pCatStat[i].title,
      action: (
        <div className=" flex">
          <Link
            to={`/admin/category/${pCatStat[i]._id}`}
            className=" text-2xl text-red-600"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-2xl text-red-600 bg-transparent border-0"
            onClick={() => showModal(pCatStat[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  const deleteCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };
  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(pCatId);
        }}
        title="Are you sure you want to delete this Product Category?"
      />
    </div>
  );
};

export default CategoryList;
