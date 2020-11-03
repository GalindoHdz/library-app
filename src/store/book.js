import { BookSearch } from '../controllers/BookSearch';

export default {
    namespaced: true,
    state: {
        word: null,
        status: null,
        message: null,
        typeMessage: null,
        list: null,
    },
    getters: {
        GET_BOOK_WORD: (state) => {
            return state.word;
        },
        GET_BOOK_MESSAGE: (state) => {
            return {
                status: state.status,
                message: state.message,
                typeMessage: state.typeMessage,
                show: true,
            };
        },
        GET_BOOK_LIST: (state) => {
            return state.list;
        },
    },
    mutations: {
        SET_BOOK_WORD: (state, word) => {
            state.word = word;
        },
        SET_BOOK_MESSAGE: (state, message) => {
            state.status = message.status;
            state.message = message.message;
            state.typeMessage = message.typeMessage;
        },
        SET_BOOK_LIST: (state, list) => {
            state.list = list;
        },
        DELETE_BOOK_DATA: (state) => {
            state.word = null;
            state.status = null;
            state.message = null;
            state.typeMessage = null;
            state.list = null;
        },
    },
    actions: {
        async ACTION_BOOK_SEARCH({ state, commit, getters }, data) {
            try {
                commit('loading/SET_LOADING_DATA', true, { root: true });

                if (state.word === data.word) {
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    commit(
                        'message/SET_MESSAGE_DATA',
                        getters.GET_BOOK_MESSAGE,
                        { root: true }
                    );
                    return;
                }

                const response = await data.apollo.query({
                    query: BookSearch,
                    variables: {
                        word: data.word,
                    },
                });

                if (!response.data.BookSearch.status) {
                    commit('SET_BOOK_WORD', data.word);
                    commit('SET_BOOK_MESSAGE', response.data.BookSearch);
                    commit('SET_BOOK_LIST', response.data.BookSearch.Books);
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    commit(
                        'message/SET_MESSAGE_DATA',
                        {
                            ...response.data.BookSearch,
                            show: true,
                        },
                        { root: true }
                    );
                    return;
                }

                commit('SET_BOOK_WORD', data.word);
                commit('SET_BOOK_MESSAGE', response.data.BookSearch);
                commit('SET_BOOK_LIST', response.data.BookSearch.Books);
                commit('loading/SET_LOADING_DATA', false, { root: true });
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.BookSearch,
                        show: true,
                    },
                    { root: true }
                );
            } catch (error) {
                commit('DELETE_BOOK_DATA', null);
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
