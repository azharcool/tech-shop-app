import React from "react";
import { FaTrashAlt } from "react-icons/fa";

function ListItem(props) {
  const { item } = props;
  return (
    <li className="item" key={item.id}>
      <div>
        <input
          type="checkbox"
          checked={item.checked}
          onClick={props.handleChange}
          // onChange={() => handleChange(item.id)}
          id={item.id}
        />
        <label htmlFor={item.id}>{item.title}</label>
      </div>

      <FaTrashAlt onClick={() => props.handleDelete(item.id)} />
    </li>
  );
}

function List(props) {
  const renderList = props.data?.map((item) => {
    return (
      <ListItem
        item={item}
        key={item.id}
        handleChange={props.handleChange}
        handleDelete={props.handleDelete}
      />
    );
  });

  return <ul>{renderList}</ul>;
}

function Content(props) {
  const isEmpty = props.data && props.data?.length === 0;

  return (
    <main>
      {isEmpty ? (
        <p>No orders found!...</p>
      ) : (
        <List
          data={props.data}
          handleChange={props.handleChange}
          handleDelete={props.handleDelete}
        />
      )}
    </main>
  );
}

export default Content;
