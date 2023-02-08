import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import StoreReducer, {
	dbChanged,
	fetchArchives,
	fetchBranch,
	fetchCargo,
	fetchCompetitors,
	fetchHO,
	// fetchInitialData,
	fetchUsers,
	fetchVesselList,
	fetchVessels,
	// setError,
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
	devTools: true,
});

store.dispatch(startLoading());

Neon.init();

const vessels = Neon.fetch("/vessels").then((res) =>
	store.dispatch(fetchVessels(res))
);

/* const cargo =  */ Neon.fetch("/cargo").then((res) =>
	store.dispatch(fetchCargo(res))
);
/* const competitors =  */ Neon.fetch("/competitors").then((res) =>
	store.dispatch(fetchCompetitors(res))
);
const users = Neon.fetch("/users").then((res) =>
	store.dispatch(fetchUsers(res))
);
const branch = Neon.fetch("/branch_follow_ups").then((res) =>
	store.dispatch(fetchBranch(res))
);
const ho = Neon.fetch("/ho_follow_ups").then((res) =>
	store.dispatch(fetchHO(res))
);
const list =  Neon.fetch("/vessel_list").then((res) =>
	store.dispatch(fetchVesselList(res))
);
/* const archives =  */ Neon.fetch("/archives").then((res) =>
	store.dispatch(fetchArchives(res))
);

Promise.all([users, vessels, ho, list, branch]).then(() => {
	store.dispatch(stopLoading());
});

/* Neon.fetch()
	.then((res) => {
		store.dispatch(fetchInitialData(res));
		store.dispatch(stopLoading());
	})
	.catch((err) => store.dispatch(setError(err))); */

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
