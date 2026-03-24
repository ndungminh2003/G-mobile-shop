import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/order/orderSlice";
import { getReports } from "../../features/salesreport/reportSlice";
import { formatNumberWithDots } from "../../utils/formatNumber";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (_, { status }) => (
      <>
        {status === "Processing" ? <Tag color="blue">{status}</Tag> : null}
        {status === "Completed" ? <Tag color="green">{status}</Tag> : null}
        {status === "Cancelled" ? <Tag color="red">{status}</Tag> : null}
        {status === "Delivering" ? <Tag color="blue">{status}</Tag> : null}
        {status === "Not Processed" ? <Tag color="red">{status}</Tag> : null}
      </>
    ),
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [orderThisMonth, setOrderThisMonth] = useState(0);
  const [dailySales, setDailySales] = useState(0);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getReports());
  }, []);
  const [data, setData] = useState([]);
  let { orders } = useSelector((state) => state.order);
  let { reports } = useSelector((state) => state.report);
  reports = reports || [];
  orders = orders || [];

  const data1 = orders.map((order, index) => {
    return {
      key: index + 1,
      name: order.name,
      product: order.products.length,
      status: order.orderStatus,
    };
  });

  // filter reports with all months
  const filterSalesEachMonth = () => {
    const revenueMonth = [];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let i = 1; i <= 12; i++) {
      const month = months[i - 1];
      const totalRevenue = reports.reduce((acc, report) => {
        const date = new Date(report.createdAt);
        const monthReport = date.getMonth() + 1;
        if (monthReport === i) {
          return acc + report.totalRevenue;
        }
        return acc;
      }, 0);
      revenueMonth.push({
        type: month,
        sales: (totalRevenue / 1000000).toFixed(0),
      });
    }
    return revenueMonth;
  };
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#005b96";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  const countOrderThisMonth = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const totalOrder = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const monthOrder = date.getMonth() + 1;
      if (monthOrder === month) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return totalOrder;
  };

  const calculateDailySales = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const totalRevenue = reports.reduce((acc, report) => {
      const date = new Date(report.createdAt);
      const monthReport = date.getMonth() + 1;
      if (monthReport === month) {
        return acc + report.totalRevenue;
      }
      return acc;
    }, 0);

    const dailySales = totalRevenue / 30;
    return dailySales.toFixed(0);
  };

  useEffect(() => {
    setOrderThisMonth(countOrderThisMonth());
  }, [orders]);

  useEffect(() => {
    setDailySales(calculateDailySales());
    setData(filterSalesEachMonth());
  }, [reports]);

  return (
    <div className="admin">
      <h3 className=" mb-4 text-3xl font-bold title">Dashboard</h3>
      <div className="flex justify-between items-center gap-3">
        <div className="flex justify-between items-end flex-grow bg-white p-6 roudned-3">
          <div>
            <p className="desc mb-4">Total Revenue</p>
            <h4 className="mb-0 text-2xl font-bold sub-title">
              {formatNumberWithDots(
                reports.reduce((acc, report) => {
                  return acc + report.totalRevenue;
                }, 0)
              )}{" "}
              ₫
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className=" flex gap-2 text-lg font-bold items-center">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="flex justify-between items-end flex-grow bg-white p-6 roudned-3">
          <div>
            <p className="desc mb-4">Average Daily Sales</p>
            <h4 className="mb-0 sub-title text-2xl font-bold">
              {formatNumberWithDots(dailySales)} ₫
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className=" flex gap-2 text-lg font-bold items-center text-red-600">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0  desc">Compared To April 2022</p>
          </div>
        </div>
        <div className="flex justify-between items-end flex-grow bg-white p-6 roudned-3">
          <div>
            <p className="desc mb-4">Orders This Month</p>
            <h4 className="mb-0 sub-title text-2xl font-bold">
              {orderThisMonth}
            </h4>
          </div>
          <div className="flex flex-col items-end">
            <h6 className=" flex gap-2 text-lg font-bold items-center text-green-600">
              <BsArrowUpRight /> 32%
            </h6>
            <p className="mb-0 desc">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics (Million VND)</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title text-3xl font-bold">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
