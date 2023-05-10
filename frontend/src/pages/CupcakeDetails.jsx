import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cupcake from "../components/Cupcake";

export default function CupcakeDetails() {
  const [cupcakeList, setCupcakeList] = useState([]);

  const location = useLocation();
  console.warn(location);

  console.warn(cupcakeList);

  const callApi = (url, setter) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}${url}`)
      .then((res) => setter(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    callApi("cupcakes", setCupcakeList);
  }, []);

  return (
    <div className="cupcake-info">
      <h1>
        {cupcakeList.map((cupcake) =>
          `/cupcakes/${cupcake.name}` === location.pathname ? (
            <div>
              <h1>Hello from {cupcake.name} 👋</h1>
              <Cupcake cupcake={cupcake} />
            </div>
          ) : (
            ""
          )
        )}
      </h1>
    </div>
  );
}
