export const state = () => ({
	signatureImage: ''
});

export const mutations = {
	add(state, payload) {
		state.signatureImage = payload;
	}
};

export const getters = {
	get(state) {
		return state.signatureImage;
	}
};
