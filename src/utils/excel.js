import dateFormat from "dateformat";

const convertTable = async (apiArray, fileName, cols, keys, list) => {
	const tableHeaders = `<tr> ${
		!list ? "<th>STATUS</th>" : ""
	} <th>SNO. </th>${cols
		.map((col) => `<th>${col.toUpperCase()}</th>`)
		.join("")}</tr>`;

	//now loop through all array objects to form table rows
	const tableRows = apiArray
		.map((obj, i) => [
			`<tr>
			${
				!list
					? `<td style="background-color: ${
							obj["status"] === "red"
								? "tomato;"
								: obj["status"] === "green"
								? "lightgreen;"
								: obj["status"] + ";"
					  } border: 1px solid black;"></td>`
					: ""
			}
			<td style="border: 1px solid black;">${i + 1}. </td>
         ${keys
						.map(
							(key) =>
								`<td style="border: 1px solid black;">${
									obj[key]
										? key === "arrived" ||
										  key === "berthed" ||
										  key === "etcd" ||
										  key === "offer_bid" ||
										  key === "sailed"
											? dateFormat(obj[key], "dd/mm/yy @ HH:MM") + " Hrs"
											: key === "enq_date" ||
											  key === "start_date" ||
											  key === "target_date"
											? dateFormat(obj[key], "dd/mm/yy")
											: key === "month"
											? dateFormat(obj[key], "mmm yy")
											: obj[key]
										: "-"
								}</td>`
						)
						.join("")}
      </tr>`,
		])
		.join("");

	const table = `<table>${tableHeaders}${tableRows}</table>`.trim();

	const xmlTable = createXMLTable(table, fileName);
	const downloadURL = createFileUrl(xmlTable);
	downloadFile(downloadURL, fileName);
};

const createXMLTable = (table, fileName) => {
	const xmlTable = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office xmlns:x="urn:schemas-microsoft-com:office:excel"
       xmlns="http://www.w3.org/TR/REC-html40"
        >
           <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
           <head>
              <xml>
                <x:ExcelWorkbook>
                    <x:ExcelWorksheets>
                        <x:ExcelWorksheet>
                            <x:Name>${fileName}</x:Name>
                            <x:WorksheetOptions><x:DisplayGridlines /></x:WorksheetOptions>
                        </x:ExcelWorksheet>
                    </x:ExcelWorksheets>
                </x:ExcelWorkbook>
              </xml>
           </head>
           <body>
             ${table}
           </body>
        </html> `;
	return xmlTable;
};

const createFileUrl = (xmlTable) => {
	const tableBlob = new Blob([xmlTable], {
		type: "application/vnd.ms-excel;base64,",
	});
	const downloadURL = URL.createObjectURL(tableBlob);
	return downloadURL;
};

const downloadFile = (downloadURL, fileName) => {
	const downloadLink = document.createElement("a");
	document.body.appendChild(downloadLink);
	downloadLink.download = fileName;
	downloadLink.href = downloadURL;
	downloadLink.click();
};

export default function ExportExcel(data, cols, keys, filename, list) {
	convertTable(data, filename, cols, keys, list);
}
