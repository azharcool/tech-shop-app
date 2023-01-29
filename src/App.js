import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import Content from "./components/Content";

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
  const [orders, setOrders] = useState(orderLists);
  const [newTech, setNewTech] = useState("");
  const [search, setSearch] = useState("");

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

    setOrders(updateOrderList);
  };

  const handleDelete = (id) => {
    const filterOrderList = orders.filter((i) => i.id !== id);
    setOrders(filterOrderList);
  };

  return (
    <div className="app">
      <Header title="Techshops" />

      <form
        className="addForm"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(newTech);
          const temp = {
            id: uuidv4(),
            title: newTech,
            checked: false,
          };
          //  setOrders([...orders, temp])
          // setOrders((order) => [...order, temp]);
          const newOrders = [...orders, temp];
          setOrders(newOrders);
        }}
      >
        <input
          type="text"
          placeholder="add tech"
          value={newTech}
          onChange={(e) => {
            setNewTech(e.target.value);
          }}
        />
        <button>
          <FaPlus />
        </button>
      </form>

      <form className="searchForm">
        <input
          type="text"
          placeholder="search tech"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>

      <Content
        orders={orders
          .filter(Boolean)
          .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <Footer year={year} />
    </div>
  );
}

export default App;
