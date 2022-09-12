import { Tab, useQuery } from "../components/components";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TabPanel, DataTable } from "../components/components";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import { Alert, AlertTitle, Slide, Snackbar } from "@mui/material";

function Archives() {
	const vessel_data = useSelector((state) => state.root.data.archives.vessels);
	const cargo_data = useSelector((state) => state.root.data.archives.cargo);
	const competitors_data = useSelector(
		(state) => state.root.data.archives.competitors
	);
	document.title = "Archives | Daily Updates";

	// eslint-disable-next-line
	const [action, setAction] = useState(window.sessionStorage.getItem("action"));
	const query = useQuery();

	const [openBar, setOpenBar] = useState(false);

	useEffect(() => {
		if (action === null) return;
		setOpenBar(true);

		window.sessionStorage.removeItem("action");
	}, [action]);

	const [val, setVal] = useState(Number(query.get("val")) + 1 || 1);

	const VesselChecked = {
		pic: false,
		name: true,
		port: false,
		npc: false,
		cargo: false,
	};

	const VesselFilters = ["pic", "name", "port", "npc", "cargo"];

	// Meta data for Sort Dialog
	const VesselSortMeta = [
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
	const VesselSearchMeta = [
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

	const VesselMoveOptions = [
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

	const CargoChecked = {
		pic: true,
		source: false,
		shipper: false,
		cargo_particulars: false,
		enq_date: false,
		port: false,
		npc: false,
		lay_can: false,
	};

	const CargoFilters = [
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
	const CargoSortMeta = [
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
	const CargoSearchMeta = [
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

	const CargoMoveOptions = [
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

	const CompChecked = {
		pic: false,
		name: true,
		port: false,
		npc: false,
		cargo: false,
	};

	const CompFilters = ["pic", "name", "port", "npc", "cargo"];

	// Meta data for Sort Dialog
	const CompSortMeta = [
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
	const CompSearchMeta = [
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

	const CompMoveOptions = [
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
				<h1>Archives as on {dateFormat(new Date(), "dd/mm/yy")}</h1>
			</div>

			<div className="main-contents">
				<TabPanel
					tab_list={[
						"PMI Far East",
						"PMI Other Sectors",
						"ECL Import",
						"ECL Export",
						"Cargo Fixed By Us",
						"Cargo Offered & Lost to Others",
						"Cargo General Competition",
						"Competitors Vessels - Granite",
						"Competitors Vessels - Non Granite",
						"Competitors Vessels - Other Sectors",
						"Competitors Vessels - Tonnages Open",
						"Competitors Vessels - Tonnages Loading",
					]}
					index={val}
					onChange={(i) => setVal(i + 1)}
				/>

				<Tab index={0} value={val}>
					<DataTable
						data={vessel_data.pmi.far_east.fixed}
						tab_index={0}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={`archives/vessels/pmi/far_east/fixed`}
						details_page="/archives/vessel-status/pmi/far_east/fixed"
						title="VESSELS UNDER NEGOTIATION / FIXED"
						xlFilename={`Archives Vessel status - PMI Far East - Fixed ${dateFormat(
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.pmi.far_east.berthed}
						tab_index={0}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/pmi/far_east/berthed"}
						details_page="/archives/vessel-status/pmi/far_east/berthed"
						xlFilename={`Archives Vessel status - PMI Far East - at Berth ${dateFormat(
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.pmi.far_east.enroute}
						tab_index={0}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/pmi/far_east/enroute"}
						details_page="/archives/vessel-status/pmi/far_east/enroute"
						xlFilename={`Archives Vessel status - PMI Far East - Enroute overseas ${dateFormat(
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={1} value={val}>
					<DataTable
						data={vessel_data.pmi.other_sectors.fixed}
						tab_index={1}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/pmi/other_sectors/fixed"}
						xlFilename={`Archives Vessel status - PMI Other Sectors - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/pmi/other_sectors/fixed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.pmi.other_sectors.berthed}
						tab_index={1}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/pmi/other_sectors/berthed"}
						xlFilename={`Archives Vessel status - PMI Other Sectors - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/pmi/other_sectors/berthed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.pmi.other_sectors.enroute}
						tab_index={1}
						archives
						MoveOptions={VesselMoveOptions}
						xlFilename={`Archives Vessel status - PMI Other Sectors - enroute overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						target_data={"archives/vessels/pmi/other_sectors/enroute"}
						details_page="/archives/vessel-status/pmi/other_sectors/enroute"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={2} value={val}>
					<DataTable
						data={vessel_data.ecl.import.fixed}
						tab_index={2}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/ecl/import/fixed"}
						xlFilename={`Archives Vessel status - ECL Import - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/ecl/import/fixed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.ecl.import.berthed}
						tab_index={2}
						archives
						MoveOptions={VesselMoveOptions}
						xlFilename={`Archives Vessel status - ECL Import - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						target_data={"archives/vessels/ecl/import/berthed"}
						details_page="/archives/vessel-status/ecl/import/berthed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.ecl.import.enroute}
						tab_index={2}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/ecl/import/enroute"}
						xlFilename={`Archives Vessel status - ECL Import - Enroute Overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/ecl/import/enroute"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={3} value={val}>
					<DataTable
						data={vessel_data.ecl.export.fixed}
						tab_index={3}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/ecl/export/fixed"}
						xlFilename={`Archives Vessel status - ECL Export - Fixed ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/ecl/export/fixed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.ecl.export.berthed}
						tab_index={3}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/ecl/export/berthed"}
						xlFilename={`Archives Vessel status - ECL Export - at Berth ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/ecl/export/berthed"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={vessel_data.ecl.export.enroute}
						tab_index={3}
						archives
						MoveOptions={VesselMoveOptions}
						target_data={"archives/vessels/vessels/ecl/export/enroute"}
						xlFilename={`Archives Vessel status - ECL Export - Enroute Overseas ${dateFormat(
							new Date(),
							"dd-mm-yyyy"
						)}`}
						details_page="/archives/vessel-status/ecl/export/enroute"
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
						searchMeta={VesselSearchMeta}
						sortMeta={VesselSortMeta}
						checked={VesselChecked}
						filters={VesselFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={4} value={val}>
					<DataTable
						data={cargo_data.fixed_by_us}
						tab_index={4}
						archives
						MoveOptions={CargoMoveOptions}
						target_data={"archives/cargo/fixed_by_us"}
						details_page="/archives/cargo/fixed_by_us"
						xlFilename={`Archives Cargo Fixed by us ${dateFormat(
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
						searchMeta={CargoSearchMeta}
						sortMeta={CargoSortMeta}
						checked={CargoChecked}
						filters={CargoFilters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={5} value={val}>
					<DataTable
						data={cargo_data.fixed_by_others}
						tab_index={5}
						archives
						MoveOptions={CargoMoveOptions}
						target_data={"archives/cargo/fixed_by_others"}
						details_page="/archives/cargo/fixed_by_others"
						xlFilename={`Archives Cargo Offered and Lost to others ${dateFormat(
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
						searchMeta={CargoSearchMeta}
						sortMeta={CargoSortMeta}
						checked={CargoChecked}
						filters={CargoFilters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={6} value={val}>
					<DataTable
						data={cargo_data.general_competition}
						tab_index={6}
						archives
						MoveOptions={CargoMoveOptions}
						target_data={"archives/cargo/general_competition"}
						details_page="/archives/cargo/general_competition"
						xlFilename={`Archives Cargo General Competition ${dateFormat(
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
						searchMeta={CargoSearchMeta}
						sortMeta={CargoSortMeta}
						checked={CargoChecked}
						filters={CargoFilters}
						defaultSortKey="pic"
					/>
				</Tab>

				<Tab index={7} value={val}>
					<DataTable
						data={competitors_data.granite.far_east}
						tab_index={7}
						half
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/granite/far_east`}
						details_page="/archives/competitors/granite/far_east"
						title="FAR EAST"
						xlFilename={`Archives Competitors Vessels - Granite Far East ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={competitors_data.granite.europe}
						tab_index={7}
						half
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/granite/europe`}
						details_page="/archives/competitors/granite/europe"
						title="EUROPE"
						xlFilename={`Archives Competitors Vessels - Granite Europe ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={8} value={val}>
					<DataTable
						data={competitors_data.non_granite.far_east}
						tab_index={8}
						half
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/non_granite/far_east`}
						details_page="/archives/competitors/non_granite/far_east"
						title="FAR EAST"
						xlFilename={`Archives Competitors Vessels - Non Granite Far East ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>

					<DataTable
						data={competitors_data.non_granite.europe}
						tab_index={8}
						half
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/non_granite/europe`}
						details_page="/archives/competitors/non_granite/europe"
						title="EUROPE"
						xlFilename={`Archives Competitors Vessels - Non Granite Europe ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={9} value={val}>
					<DataTable
						data={competitors_data.other_sectors}
						tab_index={9}
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/other_sectors`}
						details_page="/archives/competitors/other_sectors"
						title="OTHER SECTORS"
						xlFilename={`Archives Competitors Vessels - Other Sectors ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={10} value={val}>
					<DataTable
						data={competitors_data.tonnages_open}
						tab_index={10}
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/tonnages_open`}
						details_page="/archives/competitors/tonnages_open"
						title="TONNAGES OPEN"
						xlFilename={`Archives Competitors Vessels - Non Granite Tonnages Open ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>
				</Tab>

				<Tab index={11} value={val}>
					<DataTable
						data={competitors_data.tonnages_loading}
						tab_index={11}
						list
						archives
						MoveOptions={CompMoveOptions}
						target_data={`archives/competitors/tonnages_loading`}
						details_page="/archives/competitors/tonnages_loading"
						title="TONNAGES LOADING"
						xlFilename={`Archives Competitors Vessels - Tonnages Loading ${dateFormat(
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
						searchMeta={CompSearchMeta}
						sortMeta={CompSortMeta}
						checked={CompChecked}
						filters={CompFilters}
						defaultSortKey="name"
					/>
				</Tab>
			</div>
		</div>
	);
}

export default Archives;
