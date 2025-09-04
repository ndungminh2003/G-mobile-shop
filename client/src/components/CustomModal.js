import React from "react";
import { Modal } from "antd";
import { useState } from "react";

const CustomModal = (props) => {
  const { open, hideModal, performAction, title } = props;
  const [isOKButtonHovered, setIsOKButtonHovered] = useState(false);

  const okButtonStyles = {
    background: isOKButtonHovered ? "#40a9ff" : "#1890ff",
    borderColor: isOKButtonHovered ? "#40a9ff" : "#1890ff",
  };

  return (
    <Modal
      title="Confirmation"
      open={open}
      onOk={performAction}
      onCancel={hideModal}
      okText="Ok"
      cancelText="Cancel"
      okButtonProps={{
        style: okButtonStyles,
        onMouseEnter: () => setIsOKButtonHovered(true),
        onMouseLeave: () => setIsOKButtonHovered(false),
      }}
    >
      <p>{title}</p>
    </Modal>
  );
};

export default CustomModal;
