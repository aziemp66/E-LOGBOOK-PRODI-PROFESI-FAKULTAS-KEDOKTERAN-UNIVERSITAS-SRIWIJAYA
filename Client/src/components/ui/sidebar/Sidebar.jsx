import React, { useState } from "react";
import NavList from "./NavList";

import hamburgerIcon from "../../../assets/icons/hamburger.svg";

const Sidebar = () => {
	const [showNav, setShowNav] = useState(false);
	const showNavHandler = () => {
		setShowNav((prevState) => !prevState);
	};
	return (
		<>
			{showNav ? (
				<NavList onClose={showNavHandler} />
			) : (
				<img
					onClick={showNavHandler}
					src={hamburgerIcon}
					alt="Hamburger"
				/>
			)}
		</>
	);
};

export default Sidebar;
