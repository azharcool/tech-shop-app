import { FaTrashAlt, FaPlus, FaRegWindowClose } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Search from "./components/Search";
import AddItem from "./components/AddItem";

const orderLists = [
  {
    id: "09e97395",
    title: "git",
    checked: true,
  },
  {
    id: "4dd5f429",
    title: "html",
    checked: false,
  },
];

const api = {
  baseUrl: "http://localhost:4000",
  endPoints: {
    orders: "/orders",
    shop: "/shop",
  },
};

function App() {
  const year = new Date().getFullYear();
  const [orders, setOrders] = useState([]);
  const [newTech, setNewTech] = useState("");
  const [search, setSearch] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const URL = "http://localhost:4000/orders";
    try {
      const response = await fetch(URL, {
        method: "GET"
      });
      if (response.statusText !== "OK") {
        throw new Error("Not Found");
      }
      const responseJson = await response.json();
      setOrders(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event) => {
    const id = event.target.id;
    const findOrder = orders.find((i) => i.id === id);

    try {
      const URL = `http://localhost:4000/orders/${id}`;
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          checked: !findOrder.checked,
        }),
      });
      fetchOrders();
    } catch (error) {
      // errror
    }
  };

  const handleDelete = async (id) => {
    try {
      const URL = `http://localhost:4000/orders/${id}`;
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      fetchOrders();
    } catch (error) {
      // errror
    }
    // const findOrder = orders.find((i) => i.id === id);
    // const filterOrderList = orders.filter((i) => i.id !== id);
    // localStorage.setItem("techData", JSON.stringify(filterOrderList));
    // setOrders(filterOrderList);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const temp = {
      id: uuidv4(),
      title: newTech,
      checked: false,
    };
    try {
      const URL = "http://localhost:4000/orders";
      const response = await fetch(URL, {
        method: "Post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(temp),
      });

      fetchOrders();
    } catch (error) {
      // console.log("error: ", error);
    } finally {
      setNewTech("");
    }
  };

  // Return value
  const memoizedOrderData = useMemo(() => {
    return (
      orders
        ?.filter(Boolean)
        ?.filter((i) => i.title.toLowerCase().includes(search.toLowerCase())) ||
      []
    );
  }, [orders, search]);

  return (
    <div className="app">
      <Header title="Techshops" />

      <AddItem
        handleAdd={handleAdd}
        newTech={newTech}
        setNewTech={setNewTech}
      />

      <Search search={search} setSearch={setSearch} />

      <Content
        data={memoizedOrderData}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />

      <button
        onClick={() => {
          localStorage.removeItem("techData");
          setForceUpdate((s) => !s);
        }}
      >
        Reset
      </button>

      <Footer year={year} />
    </div>
  );
}

export default App;
