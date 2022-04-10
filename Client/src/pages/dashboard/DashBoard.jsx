import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContexts";

const DashBoard = () => {
	const authCtx = useContext(AuthContext);
	return (
		<div>
			<h1>DashBoard</h1>
		</div>
	);
};

export default DashBoard;
