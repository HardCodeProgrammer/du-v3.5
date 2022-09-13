import dateFormat from "dateformat";

export default function CargoTemplate(data, link) {
	return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
	<head>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
			rel="stylesheet"
		/>

		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link
			href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
			rel="stylesheet"
		/>
	</head>

	<style>
		h1 {
			font-family: "Poppins";
		}

		h3,
		p {
			font-family: "Roboto";
		}

		header {
			display: flex;
			width: 60%;
			flex-direction: column;
			text-align: center;
			background-color: rgb(31, 139, 202);
			color: white;
		}

		a {
			text-decoration: none;
			color: white;
			font-family: "Poppins";
		}

		span {
			padding: 15px;
			background-color: rgb(31, 139, 202);
			border-radius: 5px;
		}

		footer {
			width: 60%;
			padding-top: 25px;
			padding-bottom: 25px;
			color: white;
			background-color: black;
			text-align: center;
		}
	</style>

	<body>
		<header>
			<h1>DAILY UPDATES AND VESSEL STATUS</h1>
			<h3>New Cargo enquiry has been added</h3>
		</header>
		<main>
			<p>
				<strong><u>CARGO DETAILS</u></strong>
			</p>
			<br />
			<p><strong>PIC</strong> : ${data.pic || "-"}</p>
			<p><strong>Enquiry Date</strong> : ${
				data.enq_date ? dateFormat(data.enq_date, "dd/mm/yy") : "-"
			}</p>
			<p><strong>Offer Bid Due Date and Time</strong> : ${
				data.offer_bid ? dateFormat(data.offer_bid, "dd/mm/yy HH:MM:ss") : "-"
			}</p>
			<p><strong>Source</strong> : ${data.source || "-"}</p>
			<p><strong>Shipper/Charterer</strong> : ${data.shipper || "-"}</p>
			<p><strong>Load Port</strong> : ${data.port || "-"}</p>
			<p><strong>Disport</strong> : ${data.npc || "-"}</p>
			<p><strong>Cargo Particulars</strong> : ${data.cargo_particulars || "-"}</p>
			<p><strong>Quantity</strong> : ${data.quantity || "-"}</p>
			<p><strong>Freight Offered</strong> : ${data.freight_indication || "-"}</p>
			<p><strong>Follow ups / Remarks</strong> : ${data.followups || "-"}</p>
			<br />
			<br />
			<span><a href=${link}>View Cargo ⇱</a></span>
			<br />
		</main>

		<footer>
			<p>
				This mail is a system generated email. Please DO NOT REPLY TO THIS MAIL.
			</p>
		</footer>
	</body>
</html>`;
}
