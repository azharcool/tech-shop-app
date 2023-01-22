import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
function App() {
  const year = new Date().getFullYear();
  const [orders, setOrders] = useState([
    {
      id: uuidv4(),
      title: "git",
      checked: true,
    },
    {
      id: uuidv4(),
      title: "html",
      checked: false,
    },
  ]);

  console.log(orders);

  return (
    <div className="app">
      <header>
        <h1>TechShop</h1>
      </header>
      <main>
        <ul>
          {orders.map((order) => {
            return (
              <li className="item" key={order.id}>
                <div>
                  <input type="checkbox" checked={order.checked} />
                  <span>{order.title}</span>
                </div>

                <FaTrashAlt />
              </li>
            );
          })}
        </ul>
      </main>
      <footer>Copyright &copy; {year}</footer>
    </div>
  );
}

export default App;
