import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
	const { children, onClick, className, type } = props;
	return (
		<button
			onClick={onClick}
			type={type}
			className={`${styles.button} ${styles[className]}`}
		>
			{children}
		</button>
	);
};

export default React.memo(Button);
