import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContexts";

const RequireAuth = (props) => {
	const navigate = useNavigate();
	const authCtx = useContext(AuthContext);
	useEffect(() => {
		if (!authCtx.isAuth) {
			navigate("/");
		}
	}, []);
	return props.children;
};

export default RequireAuth;
