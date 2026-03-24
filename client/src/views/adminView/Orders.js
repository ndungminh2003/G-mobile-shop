import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllOrders, deleteOrder } from "../../features/order/orderSlice";
import { formatNumberWithDots } from "../../utils/formatNumber";
import CustomModal from "../../components/CustomModal";
import useGetColumnSearchProps from "../../hook/useSearchProps";

const Orders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orderState = useSelector((state) => state.order.orders);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "key",
      ...useGetColumnSearchProps("key", "Order ID"),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: (a, b) => a.customer.length - b.customer.length,
      ...useGetColumnSearchProps("customer", "Customer"),
    },
    {
      title: "View Order",
      dataIndex: "view",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      ...useGetColumnSearchProps("status", "Status"),
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
    {
      title: "Payment",
      dataIndex: "payment",
      sorter: (a, b) => a.payment.length - b.payment.length,
      ...useGetColumnSearchProps("payment", "Payment"),
      render: (_, { payment }) => (
        <>
          {payment === "VNPAY" ? <Tag color="blue">{payment}</Tag> : null}
          {payment === "COD" ? <Tag color="yellow">{payment}</Tag> : null}
        </>
      ),
    },
    {
      title: "Amount (VNĐ)",
      dataIndex: "amount",
      sorter: (a, b) => parseInt(a.amount) - parseInt(b.amount),
      ...useGetColumnSearchProps("amount", "Amount (VNĐ)"),
    },
    {
      title: "Create Date",
      dataIndex: "date",
      sorter: (a, b) => a.date - b.date,
    },

    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: "#" + orderState[i]._id,
      customer: orderState[i].name,
      view: <Link to={`/admin/order/${orderState[i]._id}`}>View Details</Link>,
      amount: formatNumberWithDots(orderState[i].totalAfterDiscount),
      status: orderState[i].orderStatus,
      payment: orderState[i].paymentIntent.method,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <div className=" flex">
          <Link
            to={`/admin/order/edit-order/${orderState[i]._id}`}
            className=" text-2xl text-red-600"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 text-2xl text-red-600 bg-transparent border-0"
            onClick={() => showModal(orderState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }
  const deleteOrderAction = (e) => {
    dispatch(deleteOrder(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllOrders());
    }, 500);
  };
  return (
    <div className="admin">
      <h3 className="mb-4 title text-3xl font-bold">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrderAction(orderId);
        }}
        title="Are you sure you want to delete this order ?"
      />
    </div>
  );
};

export default Orders;
