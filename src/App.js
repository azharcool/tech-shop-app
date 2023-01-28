import { FaTrashAlt } from "react-icons/fa";
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
      <Content
        orders={orders}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
      <Footer year={year} />
    </div>
  );
}

export default App;
