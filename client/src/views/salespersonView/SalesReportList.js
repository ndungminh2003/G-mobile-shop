import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getReports,
  deleteAReport,
  resetState,
} from "../../features/salesreport/reportSlice";
import { Link } from "react-router-dom";
import useGetColumnSearchProps from "../../hook/useSearchProps";
import { formatNumberWithDots } from "../../utils/formatNumber";
import CustomModal from "../../components/CustomModal";

const SalesReportList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [reportID, setReportId] = useState("");
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    // {
    //   title: "Salesperson",
    //   dataIndex: "salesperson",
    //   sorter: (a, b) => a.salesperson.length - b.salesperson.length,
    //   ...useGetColumnSearchProps("salesperson", "Salesperson"),
    // },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   sorter: (a, b) => a.email.length - b.email.length,
    //   ...useGetColumnSearchProps("email", "Email"),
    // },
    {
      title: "No.Orders",
      dataIndex: "noOrders",
      sorter: (a, b) => a.noOrders - b.noOrders,
      ...useGetColumnSearchProps("title", "Title"),
    },
    {
      title: "Product Sold",
      dataIndex: "sold",
      sorter: (a, b) => a.sold - b.sold,
      ...useGetColumnSearchProps("sold", "Product Sold"),
    },
    {
      title: "Total Revenue",
      dataIndex: "revenue",
      sorter: (a, b) => parseInt(a.revenue) - parseInt(b.revenue),
      ...useGetColumnSearchProps("revenue", "Total Revenue"),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getReports());
  }, []);
  const showModal = (e) => {
    setOpen(true);
    setReportId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteReport = (e) => {
    dispatch(deleteAReport(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getReports());
    }, 500);
  };
  let report = useSelector((state) => state.report.reports);
  let user = useSelector((state) => state.auth.user);
  report = report.filter((item) => item.email === user.email);
  const data1 = [];
  for (let i = 0; i < report.length; i++) {
    data1.push({
      date: moment(report[i].createdAt).format("YYYY-MM-DD HH:mm:ss"),
      salesperson: report[i].name,
      email: report[i].email,
      noOrders: report[i].noOrders,
      sold: report[i].sold,
      revenue: formatNumberWithDots(report[i].totalRevenue) + " ₫",
      action: (
        <div className=" flex">
          <Link
            to={`/salesperson/report/${report[i]._id}`}
            className=" text-2xl text-red-600"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-2xl text-red-600 bg-transparent border-0"
            onClick={() => showModal(report[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Sales Report</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteReport(reportID);
        }}
        title="Are you sure you want to delete this user ?"
      />
    </div>
  );
};

export default SalesReportList;
