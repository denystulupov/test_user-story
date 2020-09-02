import React, { useState } from "react";
import "./App.css";
import Input from "./components/Input";
import Item from "./components/Item";

function App() {
  let [items, setItems] = useState([]);

  let changeItems = (value, index) => {
    setItems((i) => {
      return i.map((item, ind) => {
        if (ind === index) return value;
        return item;
      });
    });
  };

  let addItem = (text) => {
    setItems((i) => [...i, { text }]);
  };

  let addSubList = (index) => {
    let arr = items.map((item, ind) => {
      if (index === ind) return { text: item.text, subItems: [] };
      return item;
    });
    setItems(arr);
  };

  let removeSubList = (index) => {
    let arr = items.map((item, ind) => {
      if (index === ind) return { text: item.text };
      return item;
    });
    setItems(arr);
  };

  let liftItem = (index, value) => {
    let arr = [...items];
    let temp = items[index];
    arr[index] = items[index + value];
    arr[index + value] = temp;
    setItems(arr);
  };

  let sortItems = (value) => {
    setItems(Sort(items, value));
  };

  let removeItem = (index) => {
    let arr = items.filter((item, ind) => index !== ind);
    setItems(arr);
  };

  return (
    <div className="App">
      <h1 className="Title">User story</h1>
      {items.length > 1 ? (
        <div className="sortButtonApp">
          <button onClick={() => sortItems(true)}>a...z</button>
          <button onClick={() => sortItems(false)}>z...a</button>
        </div>
      ) : null}

      <ul>
        {items.map((item, index) => {
          return (
            <Item
              {...item}
              key={Math.random()}
              index={index}
              changeItems={changeItems}
              lenght={items.length}
              liftItem={liftItem}
              removeItem={removeItem}
              addSubList={addSubList}
              removeSubList={removeSubList}
              sortItems={sortItems}
            />
          );
        })}
        <li>
          <Input addItem={addItem} />
        </li>
      </ul>
    </div>
  );
}

export const Sort = (elem, value) => {
  let arr = [...elem];
  value
    ? arr.sort((a, b) => {
        if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
        if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
        return 0;
      })
    : arr.sort((a, b) => {
        if (a.text.toLowerCase() > b.text.toLowerCase()) return -1;
        if (a.text.toLowerCase() < b.text.toLowerCase()) return 1;
        return 0;
      });
  return arr;
};

export default App;
