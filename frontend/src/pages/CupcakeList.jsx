import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  const [cupcakeList, setCupcakeList] = useState([]);
  const [accessorieList, setAccesorieList] = useState([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");
  const filter = useRef();

  const callApi = (url, setter) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}${url}`)
      .then((res) => setter(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    callApi("cupcakes", setCupcakeList);
    callApi("accessories", setAccesorieList);
  }, []);

  const handleChange = () => {
    setSelectedAccessory(filter.current.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select onChange={handleChange} ref={filter} id="cupcake-select">
            <option value="">---</option>
            {accessorieList.map((accessorie) => (
              <option key={accessorie.id} value={accessorie.id}>
                {accessorie.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakeList &&
          cupcakeList
            .filter(
              (cupcake) =>
                !selectedAccessory || cupcake.accessory_id === selectedAccessory
            )
            .map((cupcake) => {
              return (
                <li className="cupcake-item" key={cupcake.id}>
                  <Link to={`/cupcakes/${cupcake.name}`}>
                    <Cupcake className="cupcake" cupcake={cupcake} />
                  </Link>
                </li>
              );
            })}
      </ul>
    </>
  );
}
