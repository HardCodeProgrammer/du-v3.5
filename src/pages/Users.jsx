import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";

function Users() {
	const data = useSelector((state) => state.root.data.users);
	document.title = "Users | Daily Updates";

	// eslint-disable-next-line
	const [action, setAction] = useState(window.sessionStorage.getItem("action"));

	const [openBar, setOpenBar] = useState(false);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

	const checked = {
		fullname: true,
		username: false,
		email: false,
		powers: false,
	};

	const filters = ["fullname", "username", "email", "powers"];

	// Meta data for Sort Dialog
	const sortMeta = [
		{
			key: "fullname",
			label: "Display Name",
		},
		{
			key: "username",
			label: "User Name",
		},
		{
			key: "email",
			label: "Email Address",
		},
		{
			key: "powers",
			label: "Type of Account",
		},
	];

	// Meta data for Search Dialog
	const searchMeta = [
		{
			key: "fullname",
			label: "Display Name",
		},
		{
			key: "username",
			label: "User Name",
		},
		{
			key: "email",
			label: "Email Address",
		},
		{
			key: "powers",
			label: "Type of Account",
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
				<h1>List of Users as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<DataTable
					data={data}
					tab_index={0}
					followups
					MoveOptions={MoveOptions}
					target_data={`users`}
					details_page="/users"
					title="USERS"
					xlFilename={`Users List ${dateFormat(new Date(), "dd-mm-yyyy")}`}
					headings={[
						"Display Name",
						"User name",
						"Type of Account",
						"Account Status",
						"Email Address",
						"Created On",
					]}
					key_order={[
						"fullname",
						"username",
						"powers",
						"status",
						"email",
						"date_created",
					]}
					searchMeta={searchMeta}
					sortMeta={sortMeta}
					checked={checked}
					filters={filters}
					defaultSortKey="fullname"
				/>
			</div>
		</div>
	);
}

export default Users;
