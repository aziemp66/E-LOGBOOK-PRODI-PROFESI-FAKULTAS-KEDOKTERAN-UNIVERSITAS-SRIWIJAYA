import React from "react";

const LineProgressBar = (props) => {
	const { percentage } = props;
	const containerStyles = {
		height: "10px",
		width: "100%",
		backgroundColor: "#e0e0de",
		borderRadius: 50,
	};

	const fillerStyles = {
		height: "100%",
		width: `${percentage}%`,
		backgroundColor: "#356700",
		borderRadius: "inherit",
		textAlign: "right",
	};

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}></div>
		</div>
	);
};

export default LineProgressBar;
