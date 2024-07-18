import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";
const Home = () => {
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
    <div>
      <p>Home</p>
      <button className="bg-red-300 " onClick={HandleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
