import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function Content(props) {
  return (
    <main>
      {props.orders && props.orders.length === 0 ? (
        <p>No orders found!...</p>
      ) : (
        <ul>
          {props.orders.map((order) => {
            return (
              <li className="item" key={order.id}>
                <div>
                  <input
                    type="checkbox"
                    checked={order.checked}
                    onClick={props.handleChange}
                    // onChange={() => handleChange(order.id)}
                    id={order.id}
                  />
                  <span>{order.title}</span>
                </div>

                <FaTrashAlt onClick={() => props.handleDelete(order.id)} />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

export default Content;
