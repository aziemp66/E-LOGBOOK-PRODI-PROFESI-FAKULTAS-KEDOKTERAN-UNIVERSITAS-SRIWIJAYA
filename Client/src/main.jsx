import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import { AuthProvider } from "./contexts/AuthContexts";

ReactDOM.render(
	<AuthProvider>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</AuthProvider>,
	document.getElementById("root")
);
