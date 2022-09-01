import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Competitors() {
	const data = useSelector((state) => state.root.data.competitors);
	// eslint-disable-next-line
	const [action, setAction] = useState(window.sessionStorage.getItem("action"));

	const id = window.sessionStorage.getItem("user");
	const user = useSelector((state) => state.root.data.users[id]);
	const loading = useSelector((state) => state.root.meta.loading);
	const navigate = useNavigate();

	const query = useQuery();

	const [openBar, setOpenBar] = useState(false);

	useEffect(() => {
		if (loading) return;
		if (query.get("val")) return;

		if (
			user.competitors.granite === "hide" &&
			user.competitors.non_granite === "hide" &&
			user.competitors.other_sectors === "hide" &&
			user.competitors.tonnages_open === "hide" &&
			user.competitors.tonnages_loading === "hide"
		) {
			navigate("/forbidden");
		}

		if (user.competitors.granite !== "hide") setVal(1);
		else if (user.competitors.non_granite !== "hide") setVal(2);
		else if (user.competitors.other_sectors !== "hide") setVal(3);
		else if (user.competitors.tonnages_open !== "hide") setVal(4);
		else if (user.competitors.tonnages_loading !== "hide") setVal(5);

		//eslint-disable-next-line
	}, [loading]);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

	const [val, setVal] = useState(Number(query.get("val")) + 1 || 1);

	const checked = {
		pic: false,
		name: true,
		port: false,
		npc: false,
		cargo: false,
	};

	const filters = ["pic", "name", "port", "npc", "cargo"];

	// Meta data for Sort Dialog
	const sortMeta = [
		{
			key: "name",
			label: "Vessel",
		},
		{
			key: "arrived",
			label: "Arrived On",
		},
		{
			key: "berthed",
			label: "Berthed On",
		},
		{
			key: "sailed",
			label: "Sailed On",
		},
		{
			key: "dwt",
			label: "DWT",
		},
	];

	// Meta data for Search Dialog
	const searchMeta = [
		{
			key: "pic",
			label: "PIC",
		},
		{
			key: "name",
			label: "Vessel Name",
		},
		{
			key: "port",
			label: "Load Port",
		},
		{
			key: "npc",
			label: "Arrving Port",
		},
		{
			key: "cargo",
			label: "Cargo Details",
		},
	];

	const MoveOptions = [
		{
			val: "competitors/granite/far_east",
			label: "Competitors Vessels > Granite Far East",
		},
		{
			val: "competitors/granite/europe",
			label: "Competitors Vessels > Granite Europe",
		},
		{
			val: "competitors/non_granite/far_east",
			label: "Competitors Vessels > Non Granite Far East",
		},
		{
			val: "competitors/non_granite/europe",
			label: "Competitors Vessels > Non Granite Europe",
		},
		{
			val: "competitors/other_sectors",
			label: "Competitors Vessels > Other Sectors",
		},
		{
			val: "competitors/tonnages_open",
			label: "Competitors Vessels > Non Granite Tonnages Open",
		},
		{
			val: "competitors/tonnages_loading",
			label: "Competitors Vessels > Tonnages Loading",
		},

		{
			val: "archives/competitors/granite/far_east",
			label: "Archvies > Competitors Vessels > Granite > Far East",
		},
		{
			val: "archives/competitors/granite/europe",
			label: "Archvies > Competitors Vessels > Granite > Europe",
		},
		{
			val: "archives/competitors/non_granite/far_east",
			label: "Archvies > Competitors Vessels > Non Granite > Far East",
		},
		{
			val: "archives/competitors/non_granite/europe",
			label: "Archvies > Competitors Vessels > Non Granite > Europe",
		},
		{
			val: "archives/competitors/other_sectors",
			label: "Archvies > Competitors Vessels > Other Sectors",
		},
		{
			val: "archives/competitors/tonnages_open",
			label: "Archvies > Competitors Vessels > Non Granite Tonnages Open",
		},
		{
			val: "archives/competitors/tonnages_loading",
			label: "Archvies > Competitors Vessels > Tonnages Loading",
		},
	];

	return (
		<div className="container main-page">
			<Snackbar
				open={openBar}
				autoHideDuration={6000}
				onClose={() => setOpenBar(false)}
				TransitionComponent={Slide}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
			>
				<Alert severity="success" onClose={() => setOpenBar(false)}>
					<AlertTitle>Success</AlertTitle>
					{action}
				</Alert>
			</Snackbar>
			<Navbar />
			<div className="main-header">
				<h1>Competitors Vessels as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						!loading &&
							user.competitors.granite !== "hide" &&
							"Granite Vessels - Far East / Europe",
						!loading &&
							user.competitors.non_granite !== "hide" &&
							"Non Granite Vessels - Far East / Europe",
						!loading &&
							user.competitors.other_sectors !== "hide" &&
							"Vessels Other Sectors",
						!loading &&
							user.competitors.tonnages_open !== "hide" &&
							"Non Granite - Tonnages Open",
						!loading &&
							user.competitors.tonnages_loading !== "hide" &&
							"Tonnages Loading",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={data.granite.far_east}
						tab_index={0}
						half
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/granite/far_east`}
						details_page="/competitors/granite/far_east"
						title="FAR EAST"
						xlFilename={`Competitors Vessels - Granite Far East ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.granite.europe}
						tab_index={0}
						half
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/granite/europe`}
						details_page="/competitors/granite/europe"
						title="EUROPE"
						xlFilename={`Competitors Vessels - Granite Europe ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={1} value={val}>
					<DataTable
						data={data.non_granite.far_east}
						tab_index={1}
						half
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/non_granite/far_east`}
						details_page="/competitors/non_granite/far_east"
						title="FAR EAST"
						xlFilename={`Competitors Vessels - Non Granite Far East ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.non_granite.europe}
						tab_index={1}
						half
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/non_granite/europe`}
						details_page="/competitors/non_granite/europe"
						title="EUROPE"
						xlFilename={`Competitors Vessels - Non Granite Europe ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={2} value={val}>
					<DataTable
						data={data.other_sectors}
						tab_index={2}
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/other_sectors`}
						details_page="/competitors/other_sectors"
						title="OTHER SECTORS"
						xlFilename={`Competitors Vessels - Other Sectors ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={3} value={val}>
					<DataTable
						data={data.tonnages_open}
						tab_index={3}
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/tonnages_open`}
						details_page="/competitors/tonnages_open"
						title="TONNAGES OPEN"
						xlFilename={`Competitors Vessels - Non Granite Tonnages Open ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={4} value={val}>
					<DataTable
						data={data.tonnages_loading}
						tab_index={4}
						list
						MoveOptions={MoveOptions}
						target_data={`competitors/tonnages_loading`}
						details_page="/competitors/tonnages_loading"
						title="TONNAGES LOADING"
						xlFilename={`Competitors Vessels - Tonnages Loading ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Vessel Name",
							"Line",
							"DWT",
							"Load Port",
							"Arrived on",
							"Berthed on",
							"Sailed on",
							"Disport",
							"Qty Loaded",
							"Remarks",
						]}
						key_order={[
							"name",
							"line",
							"dwt",
							"port",
							"arrived",
							"berthed",
							"sailed",
							"npc",
							"total_qty",
							"remarks",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>
				</Tab>
			</div>
		</div>
	);
}

export default Competitors;
