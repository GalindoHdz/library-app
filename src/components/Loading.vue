<template>
    <div class="loading_container" v-if="this.GET_LOADING_DATA">
        <i class="fa fa-spinner" aria-hidden="true" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Loading',
    computed: {
        ...mapGetters('loading', ['GET_LOADING_DATA']),
    },
};
</script>
