export default {
    namespaced: true,
    state: {
        status: false,
    },
    getters: {
        GET_LOADING_DATA: (state) => {
            return state.status;
        },
    },
    mutations: {
        SET_LOADING_DATA(state, loading) {
            state.status = loading;
        },
        DELETE_LOADING_DATA(state) {
            state.status = false;
        },
    },
};
