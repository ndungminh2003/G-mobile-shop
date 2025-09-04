import React from "react";

export default function Contact() {
  return (
    <div className="flex justify-center container mx-auto items-center">
      <div className="flex mt-8 border p-4 rounded-md w-[90%]">
        <div className="flex gap-6 items-center">
          <img
            src="/logo/small.png"
            alt="logo"
            className="w-48 h-48 rounded-md"
          />
          <div className="flex flex-col">
            <p className="mb-1">
              <b>Tech Store</b> là một mạng lưới bán lẻ hàng công nghệ đa dạng,
              với hơn 30 thương hiệu hàng đầu khác nhau. Chúng tôi cam kết mang
              đến cho khách hàng những sản phẩm chất lượng tối ưu và mức giá vô
              cùng hợp lý.
            </p>
            <p className="mb-1">
              Với mục tiêu tạo nên một trải nghiệm mua sắm độc đáo, chúng tôi
              không ngừng tìm kiếm và lựa chọn những sản phẩm công nghệ mới
              nhất. Từ những điện thoại thông minh tiên tiến, máy tính bảng đa
              năng, đến những thiết bị gia dụng thông minh hiện đại, chúng tôi
              tự hào cung cấp một bộ sưu tập đa dạng để khách hàng có thể lựa
              chọn những sản phẩm phù hợp nhất với nhu cầu và mong muốn của
              mình.
            </p>
            <p className=" mb-4">
              Đội ngũ chuyên nghiệp tại Tech Store luôn sẵn sàng tư vấn và hỗ
              trợ khách hàng trong quá trình mua sắm, giúp họ hiểu rõ về từng
              sản phẩm và có được sự lựa chọn đúng đắn nhất. Chúng tôi tin rằng,
              việc kết hợp giữa chất lượng sản phẩm và mức giá hợp lý sẽ mang
              lại sự hài lòng tối đa cho khách hàng, đồng thời xây dựng lên mối
              quan hệ lâu dài dựa trên sự tin tưởng và sự phục vụ tận tâm.
            </p>

            <p className=" text-xl font-bold">Liên hệ với chúng tôi</p>
            <p className=" text-red-500">Hotline: 0934117756</p>
          </div>
        </div>
      </div>
    </div>
  );
}
