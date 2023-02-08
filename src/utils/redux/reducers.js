import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

export const StoreReducer = createSlice({
	name: "root",
	initialState: InitialState,
	reducers: {
		startLoading: (state) => {
			state.meta.loading = true;
		},
		stopLoading: (state) => {
			state.meta.loading = false;
		},
		fetchInitialData: (state, action) => {
			state.data = action.payload;
		},
		setError: (state, action) => {
			state.meta.error = action.payload;
		},
		dbChanged: (state, action) => {
			const data = action.payload;
			state.data = data;
		},
		addData: (state, action) => {
			const path = action.payload.path.split("/");
			const last = path.pop();
			path.reduce((p, c) => {
				return p[c];
			}, state.data)[last] = action.payload.data;
		},
		editData: (state, action) => {
			const path = action.payload.path.split("/");
			const last = path.pop();
			path.reduce((p, c) => {
				return p[c];
			}, state.data)[last] = action.payload.data;
		},
		deleteData: (state, action) => {
			const path = action.payload.path.split("/");
			const last = path.pop();
			delete path.reduce((p, c) => {
				return p[c];
			}, state.data)[last];
		},
		moveData: (state, action) => {
			const origin = action.payload.origin.split("/");
			const o_last = origin.pop();
			const dest = action.payload.dest.split("/");
			const d_last = dest.pop();

			dest.reduce((p, c) => {
				return p[c];
			}, state.data)[d_last] = action.payload.data;

			delete origin.reduce((p, c) => {
				return p[c];
			}, state.data)[o_last];
		},
		fetchVessels: (state, action) => {
			state.data.vessels = action.payload;
		},
		fetchCargo: (state, action) => {
			state.data.cargo = action.payload;
		},
		fetchCompetitors: (state, action) => {
			state.data.competitors = action.payload;
		},
		fetchBranch: (state, action) => {
			state.data.branch_follow_ups = action.payload;
		},
		fetchHO: (state, action) => {
			state.data.ho_follow_ups = action.payload;
		},
		fetchArchives: (state, action) => {
			state.data.archives = action.payload;
		},
		fetchVesselList: (state, action) => {
			state.data.vessel_list = action.payload;
		},
		fetchUsers: (state, action) => {
			state.data.users = action.payload;
		},
	},
});

export const {
	startLoading,
	stopLoading,
	fetchInitialData,
	dbChanged,
	addData,
	editData,
	deleteData,
	moveData,
	setError,
	
	fetchArchives,
	fetchBranch,
	fetchCargo,
	fetchCompetitors,
	fetchHO,
	fetchVessels,
	fetchVesselList,
	fetchUsers,
} = StoreReducer.actions;

export default StoreReducer.reducer;
