import { FaPlus } from "react-icons/fa";
import React from "react";

function AddItem(props) {
  const { handleAdd, newTech, setNewTech } = props;
  return (
    <form className="addForm" onSubmit={handleAdd}>
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
  );
}

export default AddItem;
