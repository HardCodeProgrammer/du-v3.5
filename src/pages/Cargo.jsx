import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Cargo() {
	const data = useSelector((state) => state.root.data.cargo);
	document.title = "Cargo Status | Daily Updates";
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
			user.cargo.prospects === "hide" &&
			user.cargo.fixed_by_us === "hide" &&
			user.cargo.fixed_by_others === "hide" &&
			user.cargo.general_competition === "hide"
		) {
			navigate("/forbidden");
		}

		if (user.cargo.sectors.includes("Far East / SEA / BOB")) setVal(1);
		else if (user.cargo.sectors.includes("Europe")) setVal(2);
		else if (user.cargo.sectors.includes("PG")) setVal(3);
		else if (user.cargo.sectors.includes("Africa/America")) setVal(4);
		else if (user.cargo.sectors.includes("Coastal")) setVal(5);
		else if (user.cargo.sectors.includes("Cargo Heads up")) setVal(6);
		else if (user.cargo.sectors.includes("Cargo Prospects - ex TN & AP"))
			setVal(7);
		else if (user.cargo.fixed_by_us !== "hide") setVal(8);
		else if (user.cargo.fixed_by_others !== "hide") setVal(9);
		else if (user.cargo.general_competition !== "hide") setVal(10);

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
		source: false,
		shipper: false,
		cargo_particulars: false,
		enq_date: false,
		port: false,
		npc: false,
		lay_can: false,
	};

	const filters = [
		"pic",
		"offer_bid",
		"source",
		"shipper",
		"port",
		"npc",
		"cargo_particulars",
		"lay_can",
		"enq_date",
	];

	// Meta data for Sort Dialog
	const sortMeta = [
		{
			key: "pic",
			label: "PIC",
		},
		{
			key: "source",
			label: "Source",
		},
		{
			key: "shipper",
			label: "Shipper / Charter",
		},
		{
			key: "cargo_particulars",
			label: "Cargo Particulars",
		},
		{
			key: "enq_date",
			label: "Enquiry Date",
		},
		{
			key: "port",
			label: "Load Port",
		},
		{
			key: "npc",
			label: "Disport",
		},
		{
			key: "lay_can",
			label: "Lay Can",
		},
	];

	// Meta data for Search Dialog
	const searchMeta = [
		{
			key: "pic",
			label: "PIC",
		},
		{
			key: "offer_bid",
			label: "Offer bid Due Date",
		},
		{
			key: "source",
			label: "Source",
		},
		{
			key: "shipper",
			label: "Shipper",
		},
		{
			key: "port",
			label: "Load Port",
		},
		{
			key: "npc",
			label: "Disport",
		},
		{
			key: "cargo_particulars",
			label: "Cargo Particulars",
		},
		{
			key: "lay_can",
			label: "Lay Can",
		},
		{
			key: "enq_date",
			label: "Enquiry Date",
		},
	];

	const MoveOptions = [
		{
			val: "cargo/prospects/far_east",
			label: "Cargo > Prospects - Far East / SEA / BOB",
		},
		{
			val: "cargo/prospects/europe",
			label: "Cargo > Prospects - Europe",
		},
		{
			val: "cargo/prospects/pg",
			label: "Cargo > Prospects - PG",
		},
		{
			val: "cargo/prospects/africa",
			label: "Cargo > Prospects - Africa/Americas",
		},
		{
			val: "cargo/prospects/coastal",
			label: "Cargo > Prospects - Coastal",
		},
		{
			val: "cargo/prospects/heads_up",
			label: "Cargo > Prospects - Heads Up",
		},
		{
			val: "cargo/prospects/ex_tn_ap",
			label: "Cargo > Prospects - EX TN & AP",
		},
		{
			val: "cargo/fixed_by_us",
			label: "Cargo > Fixed by us",
		},
		{
			val: "cargo/fixed_by_others",
			label: "Cargo > Offered and lost to others",
		},
		{
			val: "cargo/general_competition",
			label: "Cargo > General Competition",
		},
		{
			val: "archives/cargo/fixed_by_us",
			label: "Archives > Cargo > Fixed by us",
		},
		{
			val: "archives/cargo/fixed_by_others",
			label: "Archives > Cargo > Offered and lost to others",
		},
		{
			val: "archives/cargo/general_competition",
			label: "Archives > Cargo > General Competition",
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
				<h1>Cargo Status as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						!loading &&
							user.cargo.sectors.includes("Far East / SEA / BOB") &&
							"Prospects - Far East/SEA/BOB",
						!loading &&
							user.cargo.sectors.includes("Europe") &&
							"Prospects - Europe",
						!loading && user.cargo.sectors.includes("PG") && "Prospects - PG",
						!loading &&
							user.cargo.sectors.includes("Africa/America") &&
							"Prospects - Africa/America",
						!loading &&
							user.cargo.sectors.includes("Coastal") &&
							"Prospects - Coastal",
						!loading &&
							user.cargo.sectors.includes("Cargo Heads up") &&
							"Heads up",
						!loading &&
							user.cargo.sectors.includes("Cargo Prospects - ex TN & AP") &&
							"Prospects - EX TN & AP",
						!loading && user.cargo.fixed_by_us !== "hide" && "Fixed By Us",
						!loading &&
							user.cargo.fixed_by_others !== "hide" &&
							"Offered and Lost to others",
						!loading &&
							user.cargo.general_competition !== "hide" &&
							"General Competition",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={data.prospects.far_east}
						tab_index={0}
						MoveOptions={MoveOptions}
						target_data={`cargo/prospects/far_east`}
						details_page="/cargo/prospects/far_east"
						title="PROSPECTS - FAR EAST / SEA / BOB"
						xlFilename={`Cargo Prospects - Far east SEA BOB ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={1} value={val}>
					<DataTable
						data={data.prospects.europe}
						tab_index={1}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/europe"}
						details_page="/cargo/prospects/europe"
						title="PROSPECTS - EUROPE"
						xlFilename={`Cargo Prospects - Europe ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={2} value={val}>
					<DataTable
						data={data.prospects.pg}
						tab_index={2}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/pg"}
						xlFilename={`Cargo Prospects - PG ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/cargo/prospects/pg"
						title="PROSPECTS - PG"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={3} value={val}>
					<DataTable
						data={data.prospects.africa}
						tab_index={3}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/africa"}
						details_page="/cargo/prospects/africa"
						title="PROSPECTS - AFRICA & AMERICAS"
						xlFilename={`Cargo Prospects - Africa & Americas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={4} value={val}>
					<DataTable
						data={data.prospects.coastal}
						tab_index={4}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/coastal"}
						xlFilename={`Cargo Prospects - Coastal ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/cargo/prospects/coastal"
						title="PROSPECTS - COASTAL"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={5} value={val}>
					<DataTable
						data={data.prospects.heads_up}
						tab_index={5}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/heads_up"}
						details_page="/cargo/prospects/heads_up"
						xlFilename={`Cargo Prospects - Heads up ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="PROSPECTS - HEADS UP"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={6} value={val}>
					<DataTable
						data={data.prospects.ex_tn_ap}
						tab_index={6}
						MoveOptions={MoveOptions}
						target_data={"cargo/prospects/ex_tn_ap"}
						details_page="/cargo/prospects/ex_tn_ap"
						xlFilename={`Cargo Prospects - Ex TN & AP ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="PROSPECTS - EX TN & AP"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={7} value={val}>
					<DataTable
						data={data.fixed_by_us}
						tab_index={7}
						MoveOptions={MoveOptions}
						target_data={"cargo/fixed_by_us"}
						details_page="/cargo/fixed_by_us"
						xlFilename={`Cargo Fixed by us ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="FIXED BY US"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={8} value={val}>
					<DataTable
						data={data.fixed_by_others}
						tab_index={8}
						MoveOptions={MoveOptions}
						target_data={"cargo/fixed_by_others"}
						details_page="/cargo/fixed_by_others"
						xlFilename={`Cargo Offered and Lost to others ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="OFFERED AND LOST TO OTHERS"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={9} value={val}>
					<DataTable
						data={data.general_competition}
						tab_index={9}
						MoveOptions={MoveOptions}
						target_data={"cargo/general_competition"}
						details_page="/cargo/general_competition"
						xlFilename={`Cargo General Competition ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="GENERAL COMPETITION"
						headings={[
							"Cargo Particulars",
							"Qty",
							"Load Port",
							"Disport",
							"Lay Can",
							"Source",
							"Shpr/Chtr",
							"Enq Date",
							"Offer / Bid due date",
							"Frt Offered",
							"Followups & Remarks",
							"PIC",
						]}
						key_order={[
							"cargo_particulars",
							"quantity",
							"port",
							"npc",
							"lay_can",
							"source",
							"shipper",
							"enq_date",
							"offer_bid",
							"freight_indication",
							"followups",
							"pic",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="pic"
					/>
				</Tab>
			</div>
		</div>
	);
}

export default Cargo;
