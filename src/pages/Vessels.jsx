import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Vessels() {
	const data = useSelector((state) => state.root.data.vessels);
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
			user.vessels.pmi.fareast === "hide" &&
			user.vessels.pmi.other_sectors === "hide" &&
			user.vessels.ecl.import === "hide" &&
			user.vessels.ecl.export === "hide"
		) {
			navigate("/forbidden");
		}

		if (user.vessels.pmi.fareast !== "hide") {
			setVal(1);
		} else if (user.vessels.pmi.other_sectors !== "hide") {
			setVal(2);
		} else if (user.vessels.ecl.import !== "hide") {
			setVal(3);
		} else if (user.vessels.ecl.export !== "hide") {
			setVal(4);
		}

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
			key: "pic",
			label: "PIC",
		},
		{
			key: "name",
			label: "Vessel Name",
		},
		{
			key: "arrived",
			label: "ETA / Arrived ",
		},
		{
			key: "berthed",
			label: "ETB / Berthed",
		},
		{
			key: "etcd",
			label: "ETCD",
		},
		{
			key: "cargo",
			label: "Cargo Details",
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
			label: "Current Port",
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
			val: "vessels/pmi/far_east/fixed",
			label: "Vessel Status > PMI Far East > Fixed",
		},
		{
			val: "vessels/pmi/far_east/berthed",
			label: "Vessel Status > PMI Far East > Berthed",
		},
		{
			val: "vessels/pmi/far_east/enroute",
			label: "Vessel Status > PMI Far East > Enroute",
		},
		{
			val: "vessels/pmi/other_sectors/fixed",
			label: "Vessel Status > PMI Other Sectors > Fixed",
		},
		{
			val: "vessels/pmi/other_sectors/berthed",
			label: "Vessel Status > PMI Other Sectors > Berthed",
		},
		{
			val: "vessels/pmi/other_sectors/enroute",
			label: "Vessel Status > PMI Other Sectors > Enroute",
		},
		{
			val: "vessels/ecl/import/fixed",
			label: "Vessel Status > ECL Import > Fixed",
		},
		{
			val: "vessels/ecl/import/berthed",
			label: "Vessel Status > ECL Import > Berthed",
		},
		{
			val: "vessels/ecl/import/enroute",
			label: "Vessel Status > ECL Import > Enroute",
		},
		{
			val: "vessels/ecl/export/fixed",
			label: "Vessel Status > ECL Export > Fixed",
		},
		{
			val: "vessels/ecl/export/berthed",
			label: "Vessel Status > ECL Export > Berthed",
		},
		{
			val: "vessels/ecl/export/enroute",
			label: "Vessel Status > ECL Export > Enroute",
		},

		{
			val: "archives/vessels/pmi/far_east/fixed",
			label: "Archvies > Vessel Status > PMI Far East > Fixed",
		},
		{
			val: "archives/vessels/pmi/far_east/berthed",
			label: "Archvies > Vessel Status > PMI Far East > Berthed",
		},
		{
			val: "archives/vessels/pmi/far_east/enroute",
			label: "Archvies > Vessel Status > PMI Far East > Enroute",
		},
		{
			val: "archives/vessels/pmi/other_sectors/fixed",
			label: "Archvies > Vessel Status > PMI Other Sectors > Fixed",
		},
		{
			val: "archives/vessels/pmi/other_sectors/berthed",
			label: "Archvies > Vessel Status > PMI Other Sectors > Berthed",
		},
		{
			val: "archives/vessels/pmi/other_sectors/enroute",
			label: "Archvies > Vessel Status > PMI Other Sectors > Enroute",
		},
		{
			val: "archives/vessels/ecl/import/fixed",
			label: "Archvies > Vessel Status > ECL Import > Fixed",
		},
		{
			val: "archives/vessels/ecl/import/berthed",
			label: "Archvies > Vessel Status > ECL Import > Berthed",
		},
		{
			val: "archives/vessels/ecl/import/enroute",
			label: "Archvies > Vessel Status > ECL Import > Enroute",
		},
		{
			val: "archives/vessels/ecl/export/fixed",
			label: "Archvies > Vessel Status > ECL Export > Fixed",
		},
		{
			val: "archives/vessels/ecl/export/berthed",
			label: "Archvies > Vessel Status > ECL Export > Berthed",
		},
		{
			val: "archives/vessels/ecl/export/enroute",
			label: "Archvies > Vessel Status > ECL Export > Enroute",
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
				<h1>Vessel Status as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						!loading && user.vessels.pmi.fareast !== "hide" && "PMI Far East",
						!loading &&
							user.vessels.pmi.other_sectors !== "hide" &&
							"PMI Other Sectors",
						!loading && user.vessels.ecl.import !== "hide" && "ECL Import",
						!loading && user.vessels.ecl.export !== "hide" && "ECL Export",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={data.pmi.far_east.fixed}
						tab_index={0}
						MoveOptions={MoveOptions}
						target_data={`vessels/pmi/far_east/fixed`}
						details_page="/vessel-status/pmi/far_east/fixed"
						title="VESSELS UNDER NEGOTIATION / FIXED"
						xlFilename={`Vessel status - PMI Far East - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"ETA",
							"ETB",
							"Cargo Details",
							"Total Qty",
							"Pre arr SOP",
							"Pre arr SAP",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.pmi.far_east.berthed}
						tab_index={0}
						MoveOptions={MoveOptions}
						target_data={"vessels/pmi/far_east/berthed"}
						details_page="/vessel-status/pmi/far_east/berthed"
						xlFilename={`Vessel status - PMI Far East - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="VESSELS AT BERTH IN INDIA AND ENROUTE TO NPC"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC",
							"Arrived",
							"Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.pmi.far_east.enroute}
						tab_index={0}
						MoveOptions={MoveOptions}
						target_data={"vessels/pmi/far_east/enroute"}
						details_page="/vessel-status/pmi/far_east/enroute"
						xlFilename={`Vessel status - PMI Far East - Enroute overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						title="VESSELS ENROUTE TO OVERSEAS OR DISCHARGING AT DISPORTS"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC / Redely",
							"ETA/Arrived",
							"ETB/Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Post Voyage Follow ups",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
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
						data={data.pmi.other_sectors.fixed}
						tab_index={1}
						MoveOptions={MoveOptions}
						target_data={"vessels/pmi/other_sectors/fixed"}
						xlFilename={`Vessel status - PMI Other Sectors - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/pmi/other_sectors/fixed"
						title="VESSELS UNDER NEGOTIATION / FIXED"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"ETA",
							"ETB",
							"Cargo Details",
							"Total Qty",
							"Pre arr SOP",
							"Pre arr SAP",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.pmi.other_sectors.berthed}
						tab_index={1}
						MoveOptions={MoveOptions}
						target_data={"vessels/pmi/other_sectors/berthed"}
						xlFilename={`Vessel status - PMI Other Sectors - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/pmi/other_sectors/berthed"
						title="VESSELS AT BERTH IN INDIA AND ENROUTE TO NPC"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC",
							"Arrived",
							"Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.pmi.other_sectors.enroute}
						tab_index={1}
						MoveOptions={MoveOptions}
						xlFilename={`Vessel status - PMI Other Sectors - enroute overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						target_data={"vessels/pmi/other_sectors/enroute"}
						details_page="/vessel-status/pmi/other_sectors/enroute"
						title="VESSELS ENROUTE TO OVERSEAS OR DISCHARGING AT DISPORTS"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC / Redely",
							"ETA/Arrived",
							"ETB/Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Post Voyage Follow ups",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
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
						data={data.ecl.import.fixed}
						tab_index={2}
						MoveOptions={MoveOptions}
						target_data={"vessels/ecl/import/fixed"}
						xlFilename={`Vessel status - ECL Import - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/ecl/import/fixed"
						title="VESSELS UNDER NEGOTIATION / FIXED"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"ETA",
							"ETB",
							"Cargo Details",
							"Total Qty",
							"Pre arr SOP",
							"Pre arr SAP",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.ecl.import.berthed}
						tab_index={2}
						MoveOptions={MoveOptions}
						xlFilename={`Vessel status - ECL Import - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						target_data={"vessels/ecl/import/berthed"}
						details_page="/vessel-status/ecl/import/berthed"
						title="VESSELS AT BERTH IN INDIA AND ENROUTE TO NPC"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC",
							"Arrived",
							"Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.ecl.import.enroute}
						tab_index={2}
						MoveOptions={MoveOptions}
						target_data={"vessels/ecl/import/enroute"}
						xlFilename={`Vessel status - ECL Import - Enroute Overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/ecl/import/enroute"
						title="VESSELS ENROUTE TO OVERSEAS OR DISCHARGING AT DISPORTS"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"NPC / Redely",
							"ETA/Arrived",
							"ETB/Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Post Voyage Follow ups",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
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
						data={data.ecl.export.fixed}
						tab_index={3}
						MoveOptions={MoveOptions}
						target_data={"vessels/ecl/export/fixed"}
						xlFilename={`Vessel status - ECL Export - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/ecl/export/fixed"
						title="VESSELS UNDER NEGOTIATION / FIXED"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"ETA",
							"ETB",
							"Cargo Details",
							"Total Qty",
							"Pre arr SOP",
							"Pre arr SAP",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.ecl.export.berthed}
						tab_index={3}
						MoveOptions={MoveOptions}
						target_data={"vessels/ecl/export/berthed"}
						xlFilename={`Vessel status - ECL Export - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/ecl/export/berthed"
						title="VESSELS AT BERTH IN INDIA AND ENROUTE TO NPC"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"Arrived",
							"Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Follow ups/Remarks",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
						]}
						searchMeta={searchMeta}
						sortMeta={sortMeta}
						checked={checked}
						filters={filters}
						defaultSortKey="name"
					/>

					<DataTable
						data={data.ecl.export.enroute}
						tab_index={3}
						MoveOptions={MoveOptions}
						target_data={"vessels/ecl/export/enroute"}
						xlFilename={`Vessel status - ECL Export - Enroute Overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/vessel-status/ecl/export/enroute"
						title="VESSELS ENROUTE TO OVERSEAS OR DISCHARGING AT DISPORTS"
						headings={[
							"PIC",
							"Vessel Name",
							"Curr Port",
							"Arr Port",
							"ETA/Arrived",
							"ETB/Berthed",
							"Cargo Details",
							"Total Qty",
							"Completed",
							"Balance",
							"ETCD",
							"Post Voyage Follow ups",
						]}
						key_order={[
							"pic",
							"name",
							"port",
							"npc",
							"arrived",
							"berthed",
							"cargo",
							"total_qty",
							"completed",
							"balance",
							"etcd",
							"followups",
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

export default Vessels;
