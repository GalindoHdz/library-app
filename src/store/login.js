export default {
    namespaced: true,
    state: {
        status: false,
    },
    getters: {
        GET_LOGIN_DATA: (state) => {
            return state.status;
        },
    },
    mutations: {
        SET_LOGIN_DATA(state, login) {
            state.status = login;
        },
        DELETE_LOGIN_DATA(state) {
            state.status = false;
        },
    },
};
