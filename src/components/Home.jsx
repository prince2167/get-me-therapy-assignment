import { useAuth } from "../context/auth-context";
import Cookies from "js-cookie";
const Home = () => {
  const { logout } = useAuth();
  const HandleLogout = async () => {
    try {
      await logout();
      Cookies.remove("user");
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
