const Slider = ({ speed, setSpeed }) => {
  return (
    <div className="slider-container mt-10">
      <p className="text-bold text-lg">Slider to change speed of clock</p>
      <input
        type="range"
        min="0"
        max="20"
        value={speed}
        onChange={(e) => setSpeed(parseInt(e.target.value))}
        className=" w-[300px] cursor-pointer"
      />
    </div>
  );
};

export default Slider;
