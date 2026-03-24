import React from "react";
import { ExclamationOutlined } from "@ant-design/icons";
import { BsFillPencilFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const CustomerDetails = () => {
  return (
    <div className="max-w-[1320px] m-auto">
      <div className="py-5">
        <h1 className="text-[#071437] text-lg font-semibold">
          Customer Details
        </h1>
        <ul className="flex items-center gap-1 text-[#B5B5C3]">
          <li>
            <a href="">Home</a>
          </li>
          <span className="w-[5px] h-[2px] bg-[#B5B5C3] mt-[2px]"></span>
          <li>eCommerce</li>
          <span className="w-[5px] h-[2px] bg-[#B5B5C3] mt-[2px]"></span>
          <li>Customers</li>
        </ul>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-[350px] flex-[0_0_auto] mb-10">
          <div className="border border-solid border-[#F1F1F2] rounded-[5px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]">
            <div className="px-9 py-8 pt-[3.75rem]">
              <div className="flex justify-center items-center flex-col mb-5">
                <div className="inline-block relative shrink-0 rounded-[50%] mb-7">
                  <img
                    src="https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-1.jpg"
                    alt="image"
                    className="rounded-[50%] w-[150px] h-[150px] object-cover"
                  />
                </div>
                <a
                  href="#"
                  className="text-[#252F4A] text-[18px] font-bold mb-1"
                >
                  Max Smith
                </a>
                <a
                  href="#"
                  className="text-[#99A1B7] text-[15px] font-semibold mb-6"
                >
                  max@kt.com
                </a>
              </div>
              <div className="flex justify-between items-center text-[16px] py-3">
                <div className="font-bold">Details</div>
                <div className="flex justify-center items-center text-[#7239ea] bg-[#f8f5ff] text-[11px] font-bold leading-none rounded-[5px] px-[4px] py-[6px]">
                  Premium user
                </div>
              </div>
              <div className="block h-0 border-b border-dashed border-[#F1F1F2] my-3"></div>
              <div className="pb-5 text-[14px]">
                <div className="font-bold mt-5 text-[#071437]">Account ID</div>
                <div className="text-[#78829D]">ID-45453423</div>
                <div className="font-bold mt-5 text-[#071437]">
                  Billing Email
                </div>
                <div className="text-[#78829D]">
                  <a href="#" className="text-gray-600 text-hover-primary">
                    info@keenthemes.com
                  </a>
                </div>
                <div className="font-bold mt-5 text-[#071437]">
                  Delivery Address
                </div>
                <div className="text-[#78829D]">
                  101 Collin Street, <br />
                  Melbourne 3000 VIC
                  <br />
                  Australia
                </div>
                <div className="font-bold mt-5 text-[#071437]">Language</div>
                <div className="text-[#78829D]">English</div>
                <div className="font-bold mt-5 text-[#071437]">
                  Latest Transaction
                </div>
                <div className="text-[#78829D]">
                  <a href="#" className="text-[#78829D]">
                    #14534
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex ml-[50px] w-full flex-col">
          <ul
            className="flex flex-wrap pl-0 list-none text-[16px] border-0 font-semibold mb-8"
            role="tablist"
          >
            <li className="flex" role="presentation">
              <a
                className="text-[#99A1B7] mr-[13px] px-1 py-3 text-[16px] pb-4 hover:text-[#3E97FF] hover:border-b-2 hover:border-solid hover:border-[#3E97FF]"
                href="#"
              >
                Overview
              </a>
            </li>
            <li className="flex" role="presentation">
              <a
                className="text-[#3E97FF] mr-[13px] px-1 py-3 text-[16px] pb-4 border-b-2 border-solid border-[#3E97FF]"
                href="#"
              >
                General Settings
              </a>
            </li>
            <li className="flex" role="presentation">
              <a
                className="text-[#99A1B7] mr-[13px] px-1 py-3 text-[16px] pb-4 hover:text-[#3E97FF] hover:border-b-2 hover:border-solid hover:border-[#3E97FF]"
                href="#"
              >
                Advanced Settings
              </a>
            </li>
          </ul>
          <div className="flex flex-col">
            <div className="pt-4 border border-solid border-[#F1F1F2] rounded-[5px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.03)]">
              <div className="flex justify-between items-center min-h-[70px] px-[30px] flex-wrap bg-transparent">
                <div className="flex items-center m-[6px] font-semibold text-[20px] text-[#071437]">
                  <h2>Profile</h2>
                </div>
              </div>
              <div className="pb-5 pt-0 px-9 py-8">
                <form action="">
                  <div className="mb-7">
                    <label className="flex items-center text-[14px] font-medium mb-2 text-[#071437]">
                      <span>Update Avatar</span>
                      <span className="flex justify-center items-center w-[12px] h-[12px] rounded-[50%] bg-[#F1F1F2] ml-2">
                        <ExclamationOutlined className="text-[8px]" />
                      </span>
                    </label>
                    <div class="mt-1">
                      <div
                        className="relative inline-block rounded-[5px] bg-cover"
                        data-kt-image-input="true"
                      >
                        <div className="border-[3px] border-solid border-[#fff] rounded-[5px] bg-no-repeat bg-cover w-[125px] h-[125px] bg-[url('https://preview.keenthemes.com/metronic8/demo1/assets/media/avatars/300-1.jpg')] shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)]"></div>
                        <label className="rounded-[50%] w-[25px] h-[25px] shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)] border-0 absolute left-[90%] z-auto top-[-10px] cursor-pointer inline-flex justify-center items-center p-0 bg-[#fff]">
                          <BsFillPencilFill className="text-[10px] text-[#99A1B7]" />
                          <input
                            type="file"
                            name="avatar"
                            accept=".png, .jpg, .jpeg"
                            className="border-0 w-0 h-0 opacity-0 overflow-hidden"
                          />
                          <input
                            type="hidden"
                            name="avatar_remove"
                            className="border-0 w-0 h-0 opacity-0 overflow-hidden"
                          />
                        </label>
                        <span className="rounded-[50%] w-[25px] h-[25px] shadow-[0_0.5rem_1.5rem_0.5rem_rgba(0,0,0,0.075)] border-0 absolute left-[90%] z-auto bottom-[-10px] cursor-pointer inline-flex justify-center items-center p-0 bg-[#fff]">
                          <AiOutlineClose className="text-[12px] text-[#99A1B7]" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative mb-7">
                    <label className="text-[14px] font-medium mb-2 text-[#071437] form-input">
                      Name
                    </label>
                    <input
                      type="text"
                      className="block w-full text-base font-medium leading-normal text-[#4B5675] bg-[#F9F9F9] bg-clip-padding border appearance-none rounded px-3 py-2.5 border-solid border-[#F9F9F9] outline-0 text-[12px] focus:bg-[#F1F1F2] focus:border-[#F1F1F2] focus:text-[#4B5675]"
                      placeholder=""
                      name="name"
                    />
                  </div>
                  <div className="flex flex-wrap mr-[-15px] ml-[-15px] mt-0;">
                    <div className="mb-7 w-[50%] flex-[0_0_auto] pl-[15px] pr-[15px]">
                      <label className="flex items-center text-[14px] font-medium mb-2 text-[#071437]">
                        <span className="form-input">General Email</span>
                        <span className="flex justify-center items-center w-[12px] h-[12px] rounded-[50%] bg-[#F1F1F2] ml-2">
                          <ExclamationOutlined className="text-[8px]" />
                        </span>
                      </label>
                      <input
                        type="text"
                        className="block w-full text-base font-medium leading-normal text-[#4B5675] bg-[#F9F9F9] bg-clip-padding border appearance-none rounded px-3 py-2.5 border-solid border-[#F9F9F9] outline-0 text-[12px] focus:bg-[#F1F1F2] focus:border-[#F1F1F2] focus:text-[#4B5675]"
                        placeholder=""
                        name="name"
                      />
                    </div>
                    <div className="mb-7 w-[50%] flex-[0_0_auto] pl-[15px] pr-[15px]">
                      <label className="flex items-center text-[14px] font-medium mb-2 text-[#071437]">
                        <span>Billing Email</span>
                        <span className="flex justify-center items-center w-[12px] h-[12px] rounded-[50%] bg-[#F1F1F2] ml-2">
                          <ExclamationOutlined className="text-[8px]" />
                        </span>
                      </label>
                      <input
                        type="text"
                        className="block w-full text-base font-medium leading-normal text-[#4B5675] bg-[#F9F9F9] bg-clip-padding border appearance-none rounded px-3 py-2.5 border-solid border-[#F9F9F9] outline-0 text-[12px] focus:bg-[#F1F1F2] focus:border-[#F1F1F2] focus:text-[#4B5675]"
                        placeholder=""
                        name="name"
                      />
                    </div>
                  </div>
                  <div class="flex justify-end">
                    <button
                      type="submit"
                      class="flex justify-center items-center bg-[#f1faff] text-[#3E97FF] text-[14px] py-[11px] px-[20px] rounded-[8px] font-medium hover:text-[#fff] hover:bg-[#3E97FF]"
                    >
                      <span>Save</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
