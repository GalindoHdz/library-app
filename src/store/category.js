import { BookForSubjects } from '../controllers/BookForSubjects';

export default {
    namespaced: true,
    state: {
        option: null,
        status: null,
        message: null,
        typeMessage: null,
        list: [],
    },
    getters: {
        GET_CATEGORY_DATA: (state) => {
            return {
                option: state.option,
                list: state.list,
            };
        },
        GET_CATEGORY_OPTION: (state) => {
            return state.option;
        },
        GET_CATEGORY_LIST: (state) => {
            return state.list;
        },
        GET_CATEGORY_MESSAGE: (state) => {
            return {
                status: state.status,
                message: state.message,
                typeMessage: state.typeMessage,
                show: true,
            };
        },
    },
    mutations: {
        SET_CATEGORY_DATA: (state, data) => {
            state.option = data.option;
            state.list = data.list;
        },
        SET_CATEGORY_MESSAGE: (state, message) => {
            state.status = message.status;
            state.message = message.message;
            state.typeMessage = message.typeMessage;
        },
        DELETE_CATEGORY_DATA: (state) => {
            state.option = null;
            state.list = [];
        },
    },
    actions: {
        async ACTION_CATEGORY_SEARCH({ state, commit, getters }, data) {
            try {
                if (state.option === data.category) {
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    commit(
                        'message/SET_MESSAGE_DATA',
                        getters.GET_CATEGORY_MESSAGE,
                        { root: true }
                    );
                    return;
                }

                const response = await data.apollo.query({
                    query: BookForSubjects,
                    variables: {
                        subject: data.category,
                    },
                });

                if (!response.data.BookForSubjects.status) {
                    commit('SET_CATEGORY_DATA', {
                        option: data.category,
                        list: response.data.BookForSubjects.Books,
                    });
                    commit(
                        'SET_CATEGORY_MESSAGE',
                        response.data.BookForSubjects
                    );
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    commit(
                        'message/SET_MESSAGE_DATA',
                        {
                            ...response.data.BookForSubjects,
                            show: true,
                        },
                        { root: true }
                    );
                    return;
                }

                commit('SET_CATEGORY_DATA', {
                    option: data.category,
                    list: response.data.BookForSubjects.Books,
                });
                commit('SET_CATEGORY_MESSAGE', response.data.BookForSubjects);
                commit('loading/SET_LOADING_DATA', false, { root: true });
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.BookForSubjects,
                        show: true,
                    },
                    { root: true }
                );
            } catch (error) {
                commit('DELETE_CATEGORY_DATA', null);
                commit('loading/SET_LOADING_DATA', false, { root: true });
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        status: false,
                        message: 'App error',
                        typeMessage: 'danger',
                        show: true,
                    },
                    { root: true }
                );
            }
        },
    },
};
