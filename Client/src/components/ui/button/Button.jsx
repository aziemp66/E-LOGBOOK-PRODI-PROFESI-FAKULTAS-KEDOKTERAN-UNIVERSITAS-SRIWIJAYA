import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const { children, className } = props;
  return (
    <button {...props} className={`${styles.button} ${styles[className]}`}>
      {children}
    </button>
  );
};

export default React.memo(Button);
