import React from "react";
import Input from "./Input";
import { Sort } from "../App";

const Item = (props) => {
  let changeItems = (obj, index) => {
    let arr = props.subItems.map((item, ind) => {
      if (ind === index) return obj;
      return item;
    });
    let obj1 = { text: props.text, subItems: [...arr] };
    props.changeItems(obj1, props.index);
  };

  let addItem = (text) => {
    let obj = { text: props.text, subItems: [...props.subItems, { text }] };
    props.changeItems(obj, props.index);
  };

  let liftItem = (index, value) => {
    let subItems = [...props.subItems];
    let temp = props.subItems[index];
    subItems[index] = props.subItems[index + value];
    subItems[index + value] = temp;
    props.changeItems({ text: props.text, subItems }, props.index);
  };

  let removeItem = (index) => {
    let subItems = props.subItems.filter((item, ind) => index !== ind);
    props.changeItems({ text: props.text, subItems }, props.index);
  };

  let sortItems = (value) => {
    let subItems = Sort(props.subItems, value);
    props.changeItems({ text: props.text, subItems }, props.index);
  };

  let addSubList = (index) => {
    let subItems = props.subItems.map((item, ind) => {
      if (index === ind) return { text: item.text, subItems: [] };
      return item;
    });
    props.changeItems({ text: props.text, subItems }, props.index);
  };

  let removeSubList = (index) => {
    let subItems = props.subItems.map((item, ind) => {
      if (index === ind) return { text: item.text };
      return item;
    });
    props.changeItems({ text: props.text, subItems }, props.index);
  };

  return (
    <li className="Item">
      <div className="liftButtons">
        {props.index !== 0 && (
          <button onClick={() => props.liftItem(props.index, -1)}>
            &#11014;
          </button>
        )}
        {props.lenght - 1 !== props.index && (
          <button onClick={() => props.liftItem(props.index, 1)}>
            &#11015;
          </button>
        )}
      </div>

      {props.text}

      <div className="controlButton">
        {props.subItems ? (
          <button onClick={() => props.removeSubList(props.index)}>
            Remove Sublist
          </button>
        ) : (
          <button onClick={() => props.addSubList(props.index)}>
            Add Sublist
          </button>
        )}
      </div>

      <div className="sortButton">
        <button
          disabled={!(props.subItems && props.subItems.length > 1)}
          onClick={() => sortItems(true)}
        >
          a...z
        </button>
        <button
          disabled={!(props.subItems && props.subItems.length > 1)}
          onClick={() => sortItems(false)}
        >
          z...a
        </button>
      </div>

      <button
        className="removeButton"
        onClick={() => props.removeItem(props.index)}
      >
        &#10006;
      </button>

      <ul>
        {props.subItems
          ? props.subItems.map((item, index) => {
              return (
                <Item
                  key={Math.random()}
                  {...item}
                  index={index}
                  changeItems={changeItems}
                  lenght={props.subItems.length}
                  liftItem={liftItem}
                  removeItem={removeItem}
                  addSubList={addSubList}
                  removeSubList={removeSubList}
                />
              );
            })
          : null}

        {props.subItems ? (
          <li>
            <Input addItem={addItem} />{" "}
          </li>
        ) : null}
      </ul>
    </li>
  );
};

export default Item;
