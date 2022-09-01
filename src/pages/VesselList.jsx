import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function VesselList() {
	const data = useSelector((state) => state.root.data.vessel_list);
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

		if (user.vessel_list.eci === "hide" && user.vessel_list.wci === "hide") {
			navigate("/forbidden");
		}

		if (user.vessel_list.eci !== "hide") setVal(1);
		else setVal(2);

		//eslint-disable-next-line
	}, [loading]);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

	const [val, setVal] = useState(Number(query.get("val")) + 1 || 1);

	const checked = {
		vessel: true,
		month: false,
		open_area: false,
		open_dates: false,
		dwt: false,
		source: false,
	};

	const filters = ["vessel", "month", "open_area", "open_dates", "source"];

	// Meta data for Sort Dialog
	const sortMeta = [
		{
			key: "vessel",
			label: "Vessel Name",
		},
		{
			key: "month",
			label: "Month",
		},
		{
			key: "open_area",
			label: "Open Area",
		},
		{
			key: "open_dates",
			label: "Open Dates",
		},
		{
			key: "dwt",
			label: "DWT",
		},
		{
			key: "source",
			label: "Source",
		},
	];

	// Meta data for Search Dialog
	const searchMeta = [
		{
			key: "vessel",
			label: "Vessel Name",
		},
		{
			key: "month",
			label: "Month",
		},
		{
			key: "open_area",
			label: "Open Area",
		},
		{
			key: "open_dates",
			label: "Open Dates",
		},
		{
			key: "source",
			label: "Source",
		},
	];

	const MoveOptions = [
		{
			val: "vessel_list/eci",
			label: "Vessel List > ECI",
		},
		{
			val: "vessel_list/wci",
			label: "Vessel List > WCI",
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
				<h1>List of Vessels as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						!loading && user.vessel_list.eci !== "hide" && "ECI",
						!loading && user.vessel_list.wci !== "hide" && "WCI",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={data.eci}
						tab_index={0}
						list
						MoveOptions={MoveOptions}
						target_data={`vessel_list/eci`}
						details_page="/vessel_list/eci"
						title="ECI"
						xlFilename={`Vessel List - ECI ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Month",
							"Vessel Name",
							"Open Area",
							"Open Dates",
							"DWT",
							"Built",
							"LOA",
							"Beam",
							"Draft",
							"Gear",
							"Source",
							"Remarks",
						]}
						key_order={[
							"month",
							"vessel",
							"open_area",
							"open_dates",
							"dwt",
							"built",
							"loa",
							"beam",
							"draft",
							"gear",
							"source",
							"remark",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="dwt"
					/>
				</Tab>

				<Tab index={1} value={val}>
					<DataTable
						data={data.wci}
						tab_index={1}
						list
						MoveOptions={MoveOptions}
						target_data={`vessel_list/wci`}
						details_page="/vessel_list/wci"
						title="WCI"
						xlFilename={`Vessel List - WCI ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Month",
							"Vessel Name",
							"Open Area",
							"Open Dates",
							"DWT",
							"Built",
							"LOA",
							"Beam",
							"Draft",
							"Gear",
							"Source",
							"Remarks",
						]}
						key_order={[
							"month",
							"vessel",
							"open_area",
							"open_dates",
							"dwt",
							"built",
							"loa",
							"beam",
							"draft",
							"gear",
							"source",
							"remark",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="dwt"
					/>
				</Tab>
			</div>
		</div>
	);
}

export default VesselList;
