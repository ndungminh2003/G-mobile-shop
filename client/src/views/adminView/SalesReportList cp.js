import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getReports, resetState } from "../../features/salesreport/reportSlice";
import useGetColumnSearchProps from "../../hook/useSearchProps";

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
      sorter: (a, b) => a.revenue - b.revenue,
      ...useGetColumnSearchProps("revenue", "Total Revenue"),
    },
  ];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getReports());
  }, []);

  let report = useSelector((state) => state.report.reports);

  const data1 = [];
  for (let i = 0; i < report.length; i++) {
    data1.push({
      date: report[i].createdAt,
      salesperson: report[i].name,
      email: report[i].email,
      noOrders: report[i].noOrders,
      sold: report[i].sold,
      revenue: report[i].totalRevenue,
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
