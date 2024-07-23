import { useState, useEffect } from "react";

const Clock = ({ speed }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="clock w-[300px] h-[300px] rounded-full relative   shadow-xl text-lg text-gray-700 text-center">
      {/*  top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 */}
      <div
        className="absolute w-[6px] h-[60px] bg-gray-900 top-[30%] left-[49%] origin-bottom"
        style={{
          transform: `rotateZ(${time.getHours() * 30}deg)`,
        }}
      />
      <div
        className="absolute w-[4px] h-[80px] bg-gray-700 top-[22.5%] left-[49%] origin-bottom"
        style={{
          transform: `rotateZ(${time.getMinutes() * 6}deg)`,
        }}
      />
      <div
        className="absolute w-[2px] h-[118px] bg-red-500 top-[10.5%] left-1/2 origin-bottom"
        style={{
          transform: `rotateZ(${(60 - time.getSeconds()) * speed}deg)`,
        }}
      />
      <span className="top-[10px] left-[46%]">12</span>
      <span className="top-[10%] right-[26%]">1</span>
      <span className="top-[25%] right-[10%]">2</span>
      <span className="top-[46%] right-[10px]">3</span>
      <span className="top-[67%] right-[30px]">4</span>
      <span className="top-[80%] right-[78px]">5</span>
      <span className="left-[50%] bottom-[10px]">6</span>
      <span className="left-[80px] top-[82%]">7</span>
      <span className="left-[30px] top-[67%]">8</span>
      <span className="left-[10px] top-[46%]">9</span>
      <span className="top-[25%] left-[10%]">10</span>
      <span className="top-[10%] left-[26%]">11</span>
    </div>
  );
};

export default Clock;
