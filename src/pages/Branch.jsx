import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Branch() {
	const data = useSelector((state) => state.root.data.branch_follow_ups);
	document.title = "Branch Follow ups | Daily Updates";

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

		if (user.branch_follow_ups === "hide") {
			navigate("/forbidden");
		}

		if (user.branches.includes("Chennai")) setVal(1);
		else if (user.branches.includes("Chennai FFT")) setVal(2);
		else if (
			user.branches.includes("Krishnapatnam") ||
			user.branches.includes("Krishnapatnam / Ongole")
		)
			setVal(3);
		else if (
			user.branches.includes("Vizag / Kakinada / Gangavaram") ||
			user.branches.includes("Vizag")
		)
			setVal(4);
		else if (
			user.branches.includes("Karwar / Goa / Bannikoppa") ||
			user.branches.includes("Karwar")
		)
			setVal(5);
		else if (user.branches.includes("Mangalore")) setVal(6);

		//eslint-disable-next-line
	}, [loading]);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

	const [val, setVal] = useState(Number(query.get("val")) + 1 || 1);

	const checked = {
		pic: true,
		task: false,
		start_date: false,
		target_date: false,
	};

	const filters = ["pic", "task", "start_date", "target_date"];

	// Meta data for Sort Dialog
	const sortMeta = [
		{
			key: "pic",
			label: "PIC",
		},
		{
			key: "task",
			label: "Task",
		},
		{
			key: "start_date",
			label: "Start Date",
		},
		{
			key: "target_date",
			label: "Target Date",
		},
	];

	// Meta data for Search Dialog
	const searchMeta = [
		{
			key: "pic",
			label: "PIC",
		},
		{
			key: "task",
			label: "Task",
		},
		{
			key: "start_date",
			label: "Start Date",
		},
		{
			key: "target_date",
			label: "Target Date",
		},
	];

	const MoveOptions = [];

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
				<h1>
					Branch Tasks / Follow ups / Status as on{" "}
					{dateFormat(new Date(), "dd/mm/yy")}
				</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						!loading && user.branches.includes("Chennai") && "Chennai",
						!loading && user.branches.includes("Chennai FFT") && "Chennai FFT",
						!loading &&
							(user.branches.includes("Krishnapatnam") ||
								user.branches.includes("Krishnapatnam / Ongole")) &&
							"Krishnapatnam / Ongole",
						!loading &&
							(user.branches.includes("Vizag / Kakinada / Gangavaram") ||
								user.branches.includes("Vizag")) &&
							"Vizag / Kakinada / Gangavaram",
						!loading &&
							(user.branches.includes("Karwar / Goa / Bannikoppa") ||
								user.branches.includes("Karwar")) &&
							"Karwar / Goa / Bannikoppa",
						!loading && user.branches.includes("Mangalore") && "Mangalore",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={data.chennai}
						tab_index={0}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/chennai`}
						details_page="/branch_follow_ups/chennai"
						title="CHENNAI"
						xlFilename={`Branch Follow ups - Chennai ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>

				<Tab index={1} value={val}>
					<DataTable
						data={data.chennai_fft}
						tab_index={1}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/chennai_fft`}
						details_page="/branch_follow_ups/chennai_fft"
						title="CHENNAI FFT"
						xlFilename={`Branch Follow ups - Chennai FFT ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>

				<Tab index={2} value={val}>
					<DataTable
						data={data.krishnapatnam}
						tab_index={2}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/krishnapatnam`}
						details_page="/branch_follow_ups/krishnapatnam"
						title="KRISHNAPATNAM | ONGOLE"
						xlFilename={`Branch Follow ups - Krishnapatnam_Ongole ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>

				<Tab index={3} value={val}>
					<DataTable
						data={data.vizag}
						tab_index={3}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/vizag`}
						details_page="/branch_follow_ups/vizag"
						title="VIZAG | KAKINADA | GANGAVARAM"
						xlFilename={`Branch Follow ups - Vizag_Kakinada_Gangavaram ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>

				<Tab index={4} value={val}>
					<DataTable
						data={data.karwar}
						tab_index={4}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/karwar`}
						details_page="/branch_follow_ups/karwar"
						title="KARWAR | GOA | BANNIKOPPA"
						xlFilename={`Branch Follow ups - Karwar_Goa_Bannikoppa ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>

				<Tab index={5} value={val}>
					<DataTable
						data={data.mangalore}
						tab_index={5}
						followups
						MoveOptions={MoveOptions}
						target_data={`branch_follow_ups/mangalore`}
						details_page="/branch_follow_ups/mangalore"
						title="MANGALORE"
						xlFilename={`Branch Follow ups - Mangalore ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Task",
							"Start Date",
							"Target Date",
							"Status Updates / Comments / Next Follow ups",
							"Last Updated",
						]}
						key_order={[
							"pic",
							"task",
							"start_date",
							"target_date",
							"comments",
							"last_updated",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="start_date"
					/>
				</Tab>
			</div>
		</div>
	);
}

export default Branch;
