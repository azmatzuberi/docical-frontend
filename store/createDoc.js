export const state = () => ({
	doc: {
	  name: '',
	  category: '',
	  tags: [],
	  description: '',
	  collaborators: []
	}
  });
  
  export const mutations = {
	add(state, payload) {
	  state.doc = { ...state.doc, ...payload };
	}
  };
  
  export const getters = {
	get(state) {
	  return state.doc;
	}
  };
  