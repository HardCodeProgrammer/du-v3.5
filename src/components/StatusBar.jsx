import dateFormat from "dateformat";
import React from "react";

export default function StatusBar() {
	return (
		<div className="statusbar">
			<p>Version: 3.5.1</p>
			<div className="pLogo-container">
				<img id="pLogo" src="./assets/images/pLogo.png" alt="" />

				<p>
					Designed and Developed by{" "}
					<u>
						<a
							target="_blank"
							rel="noreferrer"
							id="pLink"
							href="https://www.prudent-solutions.co.in"
						>
							Prudent Solutions
						</a>{" "}
					</u>{" "}
					©️ {dateFormat(new Date(), "yyyy")}
				</p>
			</div>
			<p>Status: 🟢 Connected</p>
		</div>
	);
}
