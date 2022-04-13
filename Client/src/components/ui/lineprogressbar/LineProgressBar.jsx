import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

const LineProgressBar = (props) => {
	const { percentage } = props;
	return (
		<ProgressBar
			completed={percentage}
			bgColor={"#356700"}
			labelAlignment={"center"}
		/>
	);
};

export default LineProgressBar;
