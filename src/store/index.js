// Modulos
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user';
import message from './message';
import loading from './loading';
import login from './login';
import book from './book';
import likes from './likes';
import category from './category';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        user,
        message,
        loading,
        login,
        book,
        likes,
        category,
    },
    plugins: [createPersistedState()],
});
