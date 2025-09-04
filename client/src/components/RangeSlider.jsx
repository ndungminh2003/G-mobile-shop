import { useEffect, useRef } from "react";

const RangeSlider = ({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  setIsFiltered,
  setFilterArray,
  min,
  max,
  step,
  priceCap,
  setIsOpen,
}) => {
  const progressRef = useRef(null);
  const handleMin = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + "%";
    progressRef.current.style.right = step - (maxValue / max) * step + "%";
  }, [minValue, maxValue, max, step]);

  return (
    <div className=" grid place-items-center ">
      <div className="flex flex-col w-96 bg-white shadow-xl shadow-slate-600 rounded-lg px-6 py-4">
        <div className="flex justify-between items-center my-6 ">
          <div className="rounded-md">
            <span className="p-2 font-semibold"> Min</span>
            <input
              onChange={(e) => setMinValue(e.target.value)}
              type="number"
              value={minValue}
              className="w-24 rounded-md border border-gray-400"
            />
          </div>
          <div className="ml-2 font-semibold text-lg"> - </div>
          <div className=" ">
            <span className="p-2 font-semibold"> Max</span>
            <input
              onChange={(e) => setMaxValue(e.target.value)}
              type="number"
              value={maxValue}
              className="w-24 rounded-md border border-gray-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="slider relative h-1 rounded-md bg-gray-300">
            <div
              className="progress absolute h-1 bg-green-300 rounded "
              ref={progressRef}
            ></div>
          </div>

          <div className="range-input relative ">
            <input
              onChange={handleMin}
              type="range"
              min={min}
              step={step}
              max={max}
              value={minValue}
              className="range-min absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none cursor-pointer"
            />

            <input
              onChange={handleMax}
              type="range"
              min={min}
              step={step}
              max={max}
              value={maxValue}
              className="range-max absolute w-full -top-1 h-1 bg-transparent appearance-none pointer-events-none cursor-pointer"
            />

            <div className=" flex justify-around gap-2">
              <button
                className=" bg-red-300 mt-6 h-10 w-1/2 text-red-800 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Đóng
              </button>

              <button
                className=" bg-slate-700 mt-6 h-10 w-1/2 text-white rounded-md"
                onClick={() => {
                  setIsFiltered(true);
                  setFilterArray((prevFilterArray) => [prevFilterArray[0], 1]);
                }}
              >
                Xem kết quả
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
