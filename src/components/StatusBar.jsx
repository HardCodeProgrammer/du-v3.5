import dateFormat from "dateformat";
import React from "react";

export default function StatusBar() {
	return (
		<div className="statusbar">
			<p>
				Daily Updates and Vessel Status v3.5 ©️ {dateFormat(new Date(), "yyyy")}
			</p>
			<div className="pLogo-container">
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
						</a>
					</u>{" "}
				</p>
				<img id="pLogo" src="./assets/images/pLogo.png" alt="" />
			</div>
			<p>Status: 🟢 Connected</p>
		</div>
	);
}
