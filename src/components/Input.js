import React, { useState } from "react";

const Input = (props) => {
  let [newItemText, setNewItemText] = useState("");

  let onTextChange = (e) => {
    setNewItemText(e.target.value);
  };

  let addNewItem = () => {
    props.addItem(newItemText);
    setNewItemText("");
  };

  return (
    <>
      <input
        className="Input"
        type="text"
        placeholder="New Item"
        onChange={onTextChange}
        value={newItemText}
      />

      <button onClick={addNewItem}>Add</button>
    </>
  );
};

export default Input;
