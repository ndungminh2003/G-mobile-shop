import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getSalesperson,
  deleteAUser,
  resetState,
} from "../../features/account/accountSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../components/CustomModal";
import useGetColumnSearchProps from "../../hook/useSearchProps";

const SalespersonList = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...useGetColumnSearchProps("name", "Name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...useGetColumnSearchProps("email", "Email"),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      sorter: (a, b) => a.mobile.length - b.mobile.length,
      ...useGetColumnSearchProps("mobile", "Mobile"),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getSalesperson());
  }, []);
  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getSalesperson());
    }, 500);
  };
  const salespersonState = useSelector((state) => state.account.salesperson);
  const data1 = [];
  for (let i = 0; i < salespersonState.length; i++) {
    if (salespersonState[i].role !== "admin") {
      data1.push({
        key: i + 1,
        name: salespersonState[i].name,
        email: salespersonState[i].email,
        mobile: salespersonState[i].mobile,
        createdAt: new Date(salespersonState[i].createdAt).toLocaleString(),
        action: (
          <div className="flex">
            <Link
              className=" text-2xl text-red-600"
              to={`/admin/customer/${salespersonState[i]._id}`}
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 text-2xl text-red-600 bg-transparent border-0"
              onClick={() => showModal(salespersonState[i]._id)}
            >
              <AiFillDelete />
            </button>
          </div>
        ),
      });
    }
  }

  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Salespersons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUser(userId);
        }}
        title="Are you sure you want to delete this user ?"
      />
    </div>
  );
};

export default SalespersonList;
