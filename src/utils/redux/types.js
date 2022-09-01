const InitialState = {
	data: {
		vessels: {
			pmi: {
				far_east: {
					fixed: {},
					berthed: {},
					enroute: {},
				},
				other_sectors: {
					fixed: {},
					berthed: {},
					enroute: {},
				},
			},
			ecl: {
				import: {
					fixed: {},
					berthed: {},
					enroute: {},
				},
				export: {
					fixed: {},
					berthed: {},
					enroute: {},
				},
			},
		},
		cargo: {
			prospects: {
				far_east: {},
				europe: {},
				pg: {},
				africa: {},
				coastal: {},
				heads_up: {},
				ex_tn_ap: {},
			},
			fixed_by_us: {},
			fixed_by_others: {},
			general_competition: {},
		},
		branch_follow_ups: {
			chennai: {},
			chennai_fft: {},
			krishnapatnam: {},
			vizag: {},
			kakinada: {},
			karwar: {},
			mangalore: {},
			goa: {},
		},
		ho_follow_ups: {},
		vessel_list: {
			eci: {},
			wci: {},
		},
		competitors: {
			granite: {
				far_east: {},
				europe: {},
			},
			non_granite: {
				far_east: {},
				europe: {},
			},
			other_sectors: {},
			tonnages_open: {},
			tonnages_loading: {},
		},
		users: {},
		archives: {
			vessels: {
				pmi: {
					far_east: {
						fixed: {},
						berthed: {},
						enroute: {},
					},
					other_sectors: {
						fixed: {},
						berthed: {},
						enroute: {},
					},
				},
				ecl: {
					import: {
						fixed: {},
						berthed: {},
						enroute: {},
					},
					export: {
						fixed: {},
						berthed: {},
						enroute: {},
					},
				},
			},
			cargo: {
				fixed_by_us: {},
				fixed_by_others: {},
				general_competition: {},
			},
			competitors: {
				granite: {
					far_east: {},
					europe: {},
				},
				non_granite: {
					far_east: {},
					europe: {},
				},
				other_sectors: {},
				tonnages_open: {},
				tonnages_loading: {},
			},
		},
	},

	meta: {
		session: {
			user: {},
		},
		loading: false,
		error: "",
	},
};

export { InitialState };
