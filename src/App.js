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

function App() {
  const year = new Date().getFullYear();
  const [orders, setOrders] = useState([]);
  const [newTech, setNewTech] = useState("");
  const [search, setSearch] = useState("");
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const techData = localStorage.getItem("techData");
    const parseTechData = JSON.parse(techData);

    if (parseTechData) {
      setOrders(parseTechData);
    } else {
      setOrders([]);
    }
  }, [forceUpdate]);

  const handleChange = (event) => {
    const id = event.target.id;
    const updateOrderList = orders.map((i) => {
      if (i.id === id) {
        return {
          ...i,
          checked: !i.checked,
        };
      }
      return i;
    });

    localStorage.setItem("techData", JSON.stringify(updateOrderList));
    setOrders(updateOrderList);
  };

  const handleDelete = (id) => {
    const filterOrderList = orders.filter((i) => i.id !== id);
    localStorage.setItem("techData", JSON.stringify(filterOrderList));
    setOrders(filterOrderList);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    const temp = {
      id: uuidv4(),
      title: newTech,
      checked: false,
    };
    //  setOrders([...orders, temp])
    // setOrders((order) => [...order, temp]);
    try {
      const newOrders = [...orders, temp];
      console.log(newOrders);
      localStorage.setItem("techData", JSON.stringify(newOrders));
      setOrders(newOrders);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setNewTech("");
    }
  };

  // Return value
  const memoizedOrderData = useMemo(() => {
    console.log("memo calling");
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
