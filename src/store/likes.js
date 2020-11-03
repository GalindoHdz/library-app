import { UserLikesData } from '../controllers/UserLikeData';
import { UserLikeBook } from '../controllers/UserLikeBook';
import { UserRemoveBook } from '../controllers/UserRemoveBook';

export default {
    namespaced: true,
    state: {
        list: [],
    },
    getters: {
        GET_LIKES_DATA: (state) => {
            return state.list;
        },
    },
    mutations: {
        SET_LIKES_DATA: (state, list) => {
            state.list = list;
        },
        DELETE_LIKES_DATA: (state) => {
            state.list = [];
        },
    },
    actions: {
        async ACTION_LIKES_DATA({ commit }, data) {
            try {
                const response = await data.apollo.query({
                    query: UserLikesData,
                    variables: {
                        _id: this.state.user._id,
                        token: this.state.user.token,
                    },
                });

                if (!response.data.UserLikesData.status) {
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    commit(
                        'message/SET_MESSAGE_DATA',
                        {
                            ...response.data.UserLikesData,
                            show: true,
                        },
                        { root: true }
                    );
                    return;
                }

                commit('SET_LIKES_DATA', response.data.UserLikesData.likes);
                commit('loading/SET_LOADING_DATA', false, { root: true });
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserLikesData,
                        show: true,
                    },
                    { root: true }
                );
            } catch (error) {
                commit('SET_LIKES_DATA', []);
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
        async ACTION_SAVE_LIKE({ commit }, data) {
            try {
                const response = await data.apollo.mutate({
                    mutation: UserLikeBook,
                    variables: {
                        _id: this.state.user._id,
                        token: this.state.user.token,
                        key: data.key,
                        title: data.title ? data.title : 'No title',
                        author: data.author ? data.author : 'No author',
                        description: data.description
                            ? data.description
                            : 'No description',
                        year_publication: data.year_publication
                            ? data.year_publication
                            : 'No date',
                        cover: data.cover ? data.cover : 'No cover',
                    },
                });

                commit('SET_LIKES_DATA', response.data.UserLikeBook.likes);
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserLikeBook,
                        show: true,
                    },
                    { root: true }
                );
            } catch (error) {
                commit('SET_LIKES_DATA', []);
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
        async ACTION_DELETE_LIKE({ commit }, data) {
            try {
                const response = await data.apollo.mutate({
                    mutation: UserRemoveBook,
                    variables: {
                        _id: this.state.user._id,
                        token: this.state.user.token,
                        key: data.key,
                    },
                });

                if (!response.data.UserRemoveBook.status) {
                    return commit(
                        'message/SET_MESSAGE_DATA',
                        {
                            ...response.data.UserRemoveBook,
                            show: true,
                        },
                        { root: true }
                    );
                }

                commit('SET_LIKES_DATA', response.data.UserRemoveBook.likes);
                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserRemoveBook,
                        show: true,
                    },
                    { root: true }
                );
            } catch (error) {
                commit('SET_LIKES_DATA', []);
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
