export default {
    namespaced: true,
    state: {
        status: null,
        message: null,
        typeMessage: null,
        class: null,
        show: false,
    },
    getters: {
        GET_MESSAGE_DATA: (state) => {
            return {
                status: state.status,
                message: state.message,
                typeMessage: state.typeMessage,
                class: state.class,
                show: state.show,
            };
        },
    },
    mutations: {
        SET_MESSAGE_DATA(state, message) {
            state.status = message.status;
            state.message = message.message;
            state.typeMessage = message.typeMessage;
            state.class = `message_container ${message.typeMessage}`;
            state.show = message.show;
        },
        DELETE_MESSAGE_DATA(state) {
            state.status = null;
            state.message = null;
            state.typeMessage = null;
            state.class = null;
            state.show = false;
        },
    },
    actions: {
        SHOW_MESSAGE: ({ commit }, data) => {
            commit('SET_MESSAGE_DATA', data);

            setTimeout(() => {
                commit('DELETE_MESSAGE_DATA', null);
            }, 2500);
        },
    },
};
