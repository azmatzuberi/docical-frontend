export const state = () => ({
	signatureImage: '',
	locations: []
});

export const mutations = {
	add(state, payload) {
		state.signatureImage = payload;
	},
	addLocations(state, payload) {
		console.log(payload)
		state.locations[payload.id] = payload;
	}
};

export const getters = {
	get(state) {
		return state.signatureImage;
	},
	getLocations(state) {
		return state.locations;
	}
};
