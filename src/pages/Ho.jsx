import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HO() {
	const data = useSelector((state) => state.root.data.ho_follow_ups);
	document.title = "HO Follow ups | Daily Updates";

	// eslint-disable-next-line
	const [action, setAction] = useState(window.sessionStorage.getItem("action"));

	const id = window.sessionStorage.getItem("user");
	const user = useSelector((state) => state.root.data.users[id]);
	const loading = useSelector((state) => state.root.meta.loading);
	const navigate = useNavigate();

	const [openBar, setOpenBar] = useState(false);

	useEffect(() => {
		if (loading) return;

		if (user.ho_follow_ups === "hide") {
			navigate("/forbidden");
		}

		//eslint-disable-next-line
	}, [loading]);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

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
					Head Office Tasks / Follow ups / Status as on{" "}
					{dateFormat(new Date(), "dd/mm/yy")}
				</h1>
			</div>

			<div className="main-contents">
				<DataTable
					data={data}
					tab_index={0}
					followups
					MoveOptions={MoveOptions}
					target_data={`ho_follow_ups`}
					details_page="/ho_follow_ups"
					title="HO FOLLOW UPS"
					xlFilename={`HO Follow ups ${dateFormat(new Date(), "dd-mm-yyyy")}`}
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
			</div>
		</div>
	);
}

export default HO;
