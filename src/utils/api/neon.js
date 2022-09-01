const { default: axios } = require("axios");

const REQ_URL = process.env.REACT_APP_REQ_URL;
const MAIL_URL = process.env.REACT_APP_MAIL_URL;
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
const DB_ID = process.env.REACT_APP_DB_ID;
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;
const AUTH_SECRET = process.env.REACT_APP_AUTH_SECRET;

let socket = new WebSocket(SOCKET_URL);

const BASE_URL = `${REQ_URL}/${DB_ID}/${AUTH_TOKEN}`;

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Auth-Secret": AUTH_SECRET,
	},
	timeout: 20000,
});

const Neon = {
	fetch: function (url) {
		return api.get(url || "").then((res) => res.data);
	},

	init: function () {
		socket.onopen = () => {
			socket.send(JSON.stringify({ event: "register", payload: DB_ID }));
		};
	},

	on: function (event, callback) {
		socket.onmessage = (d) => {
			const data = JSON.parse(d.data);

			if (event === data.event) {
				callback(data.payload);
			}
		};
	},

	put: function (path, data) {
		return api.put(path, JSON.stringify(data)).then((res) => res.data);
	},

	delete: function (path) {
		return api.delete(path).then((res) => res.data);
	},

	mail: function (
		from,
		to = [],
		password,
		subject,
		body,
		host = "us2.smtp.mailhostbox.com"
	) {
		return axios
			.post(`${MAIL_URL}`, {
				from: from,
				to: [...to],
				password: password,
				subject: subject,
				body: body,
				host: host,
			})
			.then((res) => res.data);
	},
};

export default Neon;
