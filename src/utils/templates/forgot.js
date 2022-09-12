// import dateFormat from "dateformat";

import dateFormat from "dateformat";

export default function ForgotTemplate(fullname, ip, reset) {
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
			color: blue;
			font-weight: bold;
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
		#reset {
			color: white;
		}
	</style>

	<body>
		<header>
			<h1>DAILY UPDATES AND VESSEL STATUS</h1>
			<h3>Please Reset your Password</h3>
		</header>
		<main>
			<p>Hello <strong>${fullname}</strong>,</p>
			 <p>We have sent you this email in response to your request to reset your password.</p>
			<span><a id="reset" href=${reset}>Reset Password</a></span>
			<br />
			<p>If that doesn't work, copy and paste the following link in your browser: </p>
			<a href=${reset}>${reset}</a>
			<br />
			<p><strong>Additional Information</strong></p>
			<hr />
			<p><strong>Ip Address v4</strong> : ${ip}</p>
			<p><strong>Date</strong> : ${dateFormat(new Date(), "dddd, dd-mmm-yyyy")}</p>
			<p><strong>Time</strong> : ${dateFormat(new Date(), "HH:MM:ss") || "-"}</p>
			<p><em>If you did not initiate this reset, please contact administrator immediately to secure your account.</em></p>
			<br />
			
			<br />
		</main>

		<footer>
			<p>
				This mail is a system generated email. Please DO NOT REPLY TO THIS MAIL. For any
				assistance click here to contact <strong><a href="mailto:help@puyvast-dailyupdates.co.in?subject=&body=">Support Team</a></strong>
			</p>
		</footer>
	</body>
</html>`;
}
