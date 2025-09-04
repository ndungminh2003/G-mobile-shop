import React from "react";
import { ReactComponent as VatIcon } from "../../assets/vat.svg";
import { ReactComponent as PhoneIcon } from "../../assets/phone.svg";
import { ReactComponent as BoxIcon } from "../../assets/box.svg";
import { ReactComponent as ProtectIcon } from "../../assets/protect.svg";

const ProductInfor = (props) => {
  return (
    <div>
      <div className="p-[10px] border border-[#e5e7eb] rounded-[10px] mt-[10px]">
        <h1 className="text-base font-bold mb-[10px] text-[#444]">
          Thông tin sản phẩm
        </h1>
        <div className="flex flex-col gap-[10px]">
          <div className="flex gap-2">
            <div>
              <PhoneIcon />
            </div>
            <div>Mới, đầy đủ phụ kiện từ nhà sản xuất</div>
          </div>
          <div className="flex gap-2">
            <div className="flex-start">
              <BoxIcon />
            </div>
            <div>
              {props.title} <br /> Cáp sạc <br /> Sách HDSD
            </div>
          </div>
          <div className="flex gap-2 ">
            <div>
              <ProtectIcon />
            </div>
            <div>
              Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong
              30 ngày nếu có lỗi phần cứng từ nhà sản xuất.{" "}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div>
              <VatIcon />
            </div>
            <div>Giá sản phẩm đã bao gồm VAT</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfor;
