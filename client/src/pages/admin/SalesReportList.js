import React, { useEffect } from "react";
import moment from "moment";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getReports, resetState } from "../../features/salesreport/reportSlice";
import useGetColumnSearchProps from "../../hook/useSearchProps";
import { formatNumberWithDots } from "../../utils/formatNumber";

const SalesReportList = () => {
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Salesperson",
      dataIndex: "salesperson",
      sorter: (a, b) => a.salesperson.length - b.salesperson.length,
      ...useGetColumnSearchProps("salesperson", "Salesperson"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...useGetColumnSearchProps("email", "Email"),
    },
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
  ];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getReports());
  }, []);

  const report = useSelector((state) => state.report.reports);

  const data1 = [];
  for (let i = 0; i < report.length; i++) {
    data1.push({
      date: moment(report[i].createdAt).format("YYYY-MM-DD HH:mm:ss"),
      salesperson: report[i].name,
      email: report[i].email,
      noOrders: report[i].noOrders,
      sold: report[i].sold,
      revenue: formatNumberWithDots(report[i].totalRevenue) + " ₫",
    });
  }
  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Sales Report</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default SalesReportList;
