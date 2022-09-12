import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import StoreReducer, {
	dbChanged,
	fetchInitialData,
	setError,
	startLoading,
	stopLoading,
} from "./utils/redux/reducers";
import Neon from "./utils/api/neon";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("app"));

const store = configureStore({
	reducer: {
		root: StoreReducer,
	},
	devTools: false,
});

store.dispatch(startLoading());

Neon.init();

Neon.fetch()
	.then((res) => {
		store.dispatch(fetchInitialData(res));
		store.dispatch(stopLoading());
	})
	.catch((err) => store.dispatch(setError(err)));

Neon.on("db_updated", (res) => {
	store.dispatch(dbChanged(res));
});

root.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<App />
			</Router>
		</React.StrictMode>
	</Provider>
);
