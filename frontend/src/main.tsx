import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Signup from "./Pages/HomePage/SignupPage";
import HomePage from "./Pages/HomePage/HomePage";
import Signin from "./Pages/HomePage/SigninPage";
import ErrorPage from "./Pages/HomePage/ErrorPage";
import NavBar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<NavBar />
				<HomePage />
			</>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/signin",
		element: <Signin />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
