import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const URL = "https://jsonplaceholder.typicode.com/comments";
const RandomApiCalls = () => {
  const [randomUser, setRandomUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRandomAPiCalls = async () => {
    setLoading(true);
    setError(null);
    const randomNumber = Math.floor(Math.random() * 500) + 1;
    try {
      const response = await fetch(`${URL}/${randomNumber}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setRandomUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRandomAPiCalls();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Spinner />;
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {randomUser && (
        <div className="text-3xl font-semibold">{randomUser.email}</div>
      )}
    </div>
  );
};

export default RandomApiCalls;
