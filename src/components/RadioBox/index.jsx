import React, { useState } from "react";
import { CheckboxIcon } from "../../assets";
import styles from "./radio-box.module.css";

function RadioBox({ formik, options, name }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleInput = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      {options.map((item) => {
        return (
          <div
            key={item}
            className={`${styles["container"]} mb-3 flex items-center`}
          >
            <button
              className={`mr-2 ${selectedItem === item && styles["true"]}`}
              onClick={(e) => {
                toggleInput(item);
                e.preventDefault();
              }}
            >
              <CheckboxIcon className={`${styles["checkbox"]}`} />
            </button>
            <label htmlFor={styles[name]}>
              <input
                type="radio"
                name={name}
                value={item}
                onClick={() => toggleInput(item)}
              />
              <span className="text-white">{item}</span>
            </label>
          </div>
        );
      })}
    </>
  );
}

export { RadioBox };
