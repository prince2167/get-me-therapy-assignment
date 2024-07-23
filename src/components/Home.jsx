import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";
import Clock from "./Clock";
import { useState } from "react";
import Slider from "./Slider";
import ShareButton from "./ShareButton";
import RandomApiCalls from "./RandomApiCalls";
const Home = () => {
  const [speed, setSpeed] = useState(6);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const HandleLogout = async () => {
    try {
      await logout();
      Cookies.remove("user");
      navigate("/login");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <button
        className="bg-blue-700 text-white p-2 font-semibold rounded-sm my-10 "
        onClick={HandleLogout}
      >
        Logout
      </button>
      <div className="my-10 flex gap-10">
        <Clock speed={speed} setSpeed={setSpeed} />
        <div>
          <Slider speed={speed} setSpeed={setSpeed} />
          <ShareButton speed={speed} />
        </div>
      </div>
      <RandomApiCalls />
    </div>
  );
};

export default Home;
