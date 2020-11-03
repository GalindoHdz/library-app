import { UserVerify } from '../controllers/UserVerify';
import { UserData } from '../controllers/UserData';
import { UserLogIn } from '../controllers/UserLogin';
import { UserSignIn } from '../controllers/UserSigin';
import { UserUpdateTheme } from '../controllers/UserUpdateTheme';
import { UserUpdateData } from '../controllers/UserUpdateData';

export default {
    namespaced: true,
    state: {
        _id: null,
        token: null,
        name: null,
        last_name: null,
        email: null,
        photo: null,
        theme: false,
    },
    getters: {
        GET_USER_VERIFY: (state) => {
            return {
                _id: state._id,
                token: state.token,
            };
        },
        GET_USER_DATA: (state) => {
            return {
                name: state.name,
                last_name: state.last_name,
                email: state.email,
                photo: state.photo,
                theme: state.theme,
            };
        },
    },
    mutations: {
        SET_USER_THEME(state) {
            state.theme = !state.theme;
        },
        SET_USER_VERIFY(state, user) {
            state._id = user._id;
            state.token = user.token;
        },
        SET_USER_DATA(state, user) {
            state.name = user.name ? user.name : state.name;
            state.last_name = user.last_name ? user.last_name : state.last_name;
            state.email = user.email ? user.email : state.email;
            state.photo = user.photo ? user.photo : state.email;
            state.theme = user.theme ? user.theme : state.theme;
        },
        DELETE_USER_DATA(state) {
            state._id = null;
            state.token = null;
            state.name = null;
            state.last_name = null;
            state.email = null;
            state.photo = null;
            state.theme = false;
        },
    },
    actions: {
        async ACTION_USER_VERIFY({ state, commit }, apollo) {
            try {
                if (!state._id && !state.token) {
                    return false;
                }

                const response = await apollo.query({
                    query: UserVerify,
                    variables: {
                        _id: state._id,
                        token: state.token,
                    },
                });

                if (!response.data.UserVerify.status) {
                    commit('DELETE_USER_DATA');
                    commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                    commit('loading/DELETE_LOADING_DATA', null, { root: true });
                    commit('login/DELETE_LOGIN_DATA', null, { root: true });

                    return false;
                }

                const data = await apollo.query({
                    query: UserData,
                    variables: {
                        _id: state._id,
                        token: state.token,
                    },
                });

                if (!data.data.UserData.status) {
                    commit('DELETE_USER_DATA');
                    commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                    commit('loading/DELETE_LOADING_DATA', null, { root: true });
                    commit('login/DELETE_LOGIN_DATA', null, { root: true });

                    return false;
                }

                commit('SET_USER_DATA', data.data.UserData);
                commit('login/SET_LOGIN_DATA', true, { root: true });

                return true;
            } catch (error) {
                commit('DELETE_USER_DATA');
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                commit('loading/DELETE_LOADING_DATA', null, { root: true });
                commit('login/DELETE_LOGIN_DATA', null, { root: true });
                commit('book/DELETE_BOOK_DATA', null, { root: true });
                commit('likes/DELETE_LIKES_DATA', null, { root: true });
                commit('category/DELETE_CATEGORY_DATA', null, { root: true });

                return false;
            }
        },
        async ACTION_USER_LOGIN({ state, commit }, data) {
            try {
                commit('loading/SET_LOADING_DATA', true, { root: true });

                const response = await data.apollo.query({
                    query: UserLogIn,
                    variables: {
                        email: data.email,
                        password: data.password,
                    },
                });

                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserLogIn,
                        show: true,
                    },
                    { root: true }
                );

                setTimeout(() => {
                    commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                }, 2500);

                if (!response.data.UserLogIn.status) {
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    return false;
                }

                commit('SET_USER_VERIFY', {
                    _id: response.data.UserLogIn._id,
                    token: response.data.UserLogIn.token,
                });

                const dataUser = await data.apollo.query({
                    query: UserData,
                    variables: {
                        _id: state._id,
                        token: state.token,
                    },
                });

                if (!dataUser.data.UserData.status) {
                    commit('DELETE_USER_DATA');
                    return false;
                }

                commit('SET_USER_DATA', dataUser.data.UserData);
                commit('login/SET_LOGIN_DATA', true, { root: true });
                commit('loading/SET_LOADING_DATA', false, { root: true });

                return true;
            } catch (error) {
                commit('DELETE_USER_DATA');
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                commit('loading/DELETE_LOADING_DATA', null, { root: true });
                commit('login/DELETE_LOGIN_DATA', null, { root: true });
                commit('book/DELETE_BOOK_DATA', null, { root: true });
                commit('likes/DELETE_LIKES_DATA', null, { root: true });
                commit('category/DELETE_CATEGORY_DATA', null, { root: true });

                return false;
            }
        },
        async ACTION_USER_SIGIN({ commit }, data) {
            try {
                commit('loading/SET_LOADING_DATA', true, { root: true });

                const response = await data.apollo.mutate({
                    mutation: UserSignIn,
                    variables: {
                        name: data.name,
                        last_name: data.last_name,
                        email: data.email,
                        password: data.password,
                    },
                });

                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserSignIn,
                        show: true,
                    },
                    { root: true }
                );

                setTimeout(() => {
                    commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                }, 2500);

                if (!response.data.UserSignIn.status) {
                    commit('loading/SET_LOADING_DATA', false, { root: true });
                    return false;
                }

                commit('loading/SET_LOADING_DATA', false, { root: true });

                return true;
            } catch (error) {
                commit('DELETE_USER_DATA');
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                commit('loading/DELETE_LOADING_DATA', null, { root: true });
                commit('login/DELETE_LOGIN_DATA', null, { root: true });
                commit('book/DELETE_BOOK_DATA', null, { root: true });
                commit('likes/DELETE_LIKES_DATA', null, { root: true });
                commit('category/DELETE_CATEGORY_DATA', null, { root: true });

                return true;
            }
        },
        async ACTION_USER_THEME({ state, commit }, data) {
            try {
                await data.apollo.mutate({
                    mutation: UserUpdateTheme,
                    variables: {
                        _id: '5f98c635af7260001841f423',
                        token:
                            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Zjk4YzYzNWFmNzI2MDAwMTg0MWY0MjMiLCJpYXQiOjE2MDQwMzA1OTMsImV4cCI6MTYwNDYzNTM5M30.vJ9NcZumULaAu8A1Jbs_k9QfQ3qISe8w-4ugjia-fus',
                        value: state.theme,
                    },
                });

                commit('SET_USER_THEME');
            } catch (error) {
                console.error(error);
                commit('SET_USER_THEME');
            }
        },
        async ACTION_USER_LOGOUT({ commit }) {
            try {
                commit('DELETE_USER_DATA');
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                commit('loading/DELETE_LOADING_DATA', null, { root: true });
                commit('login/DELETE_LOGIN_DATA', null, { root: true });
                commit('book/DELETE_BOOK_DATA', null, { root: true });
                commit('likes/DELETE_LIKES_DATA', null, { root: true });
                commit('category/DELETE_CATEGORY_DATA', null, { root: true });
            } catch (error) {
                commit('DELETE_USER_DATA');
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                commit('loading/DELETE_LOADING_DATA', null, { root: true });
                commit('login/DELETE_LOGIN_DATA', null, { root: true });
                commit('book/DELETE_BOOK_DATA', null, { root: true });
                commit('likes/DELETE_LIKES_DATA', null, { root: true });
                commit('category/DELETE_CATEGORY_DATA', null, { root: true });
            }
        },
        async ACTION_USER_UPDATE_DATA({ state, commit }, data) {
            try {
                commit('loading/SET_LOADING_DATA', true, { root: true });

                const response = await data.apollo.mutate({
                    mutation: UserUpdateData,
                    variables: {
                        _id: state._id,
                        token: state.token,
                        password: data.password,
                        new_password: data.new_password,
                        name: data.name,
                        last_name: data.last_name,
                    },
                });

                commit(
                    'message/SET_MESSAGE_DATA',
                    {
                        ...response.data.UserUpdateData,
                        show: true,
                    },
                    { root: true }
                );

                setTimeout(() => {
                    commit('message/DELETE_MESSAGE_DATA', null, { root: true });
                }, 2500);

                if (response.data.UserUpdateData.status) {
                    commit('SET_USER_DATA', data);
                }

                commit('loading/SET_LOADING_DATA', false, { root: true });
            } catch (error) {
                commit('loading/SET_LOADING_DATA', false, { root: true });

                console.error(error);
            }
        },
        async ACTION_USER_UPDATE_IMAGE({ state, commit }, file) {
            const form = new FormData();
            form.append('_id', state._id);
            form.append('token', state.token);
            form.append('photo', file);

            const response = await fetch(
                'http://localhost:4000/user/updatePhoto',
                {
                    method: 'POST',
                    body: form,
                }
            );

            const data = await response.json();

            commit(
                'message/SET_MESSAGE_DATA',
                {
                    ...data,
                    show: true,
                },
                { root: true }
            );

            setTimeout(() => {
                commit('message/DELETE_MESSAGE_DATA', null, { root: true });
            }, 2500);

            if (data.status) {
                const photo = `${state._id}.${file.type.substring(6)}`;
                commit('SET_USER_DATA', { photo });
            }

            return true;
        },
    },
};
