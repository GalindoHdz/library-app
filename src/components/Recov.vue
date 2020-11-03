<template>
    <form action="sigin">
        <p>Recover</p>
        <input type="text" placeholder="email" v-model="email" />
        <button @click="recover">Recover</button>
        <div>
            <router-link to="/">Login</router-link>
            <router-link to="/Sigin">Sigin</router-link>
        </div>
    </form>
</template>

<script>
import { validDataRecover } from '../controllers/Recover';
import { mapMutations, mapActions } from 'vuex';

export default {
    name: 'Recov',
    data() {
        return {
            email: null,
        };
    },
    methods: {
        ...mapMutations('message', ['SET_MESSAGE_DATA']),
        ...mapMutations('loading', ['SET_LOADING_DATA']),
        ...mapActions('user', ['ACTION_USER_RECOV']),

        async recover(event) {
            if (event.type === 'click' || event.key === 'Enter') {
                event.preventDefault();

                const valid = validDataRecover({
                    email: this.email,
                });

                if (!valid.status) {
                    return this.SET_MESSAGE_DATA({ ...valid, show: true });
                }

                this.SET_LOADING_DATA(true);

                const response = await this.ACTION_USER_RECOVER({
                    email: this.email,
                    apollo: this.$apollo,
                });

                if (response) {
                    return this.$router.push({ name: 'Login' });
                }
            }
        },
    },
};
</script>
