<template>
    <div class="book_container">
        <img v-bind:src="cover" alt="cover" />
        <div>
            <p>
                <strong>Titulo: </strong>
                {{ title }}
            </p>
            <p>
                <strong>Autor: </strong>
                {{ author ? author : 'Sin autor' }}
            </p>
            <p>
                <strong>Publicacion: </strong>
                {{ year_publication }}
            </p>
            <Description
                :title="title"
                :description="description"
                @close_description="show_description"
                v-if="show"
            />
            <div>
                <button class="book_descripcion" @click="show_description">
                    <i class="fa fa-file-text" />
                </button>
                <button class="book_descripcion" @click="trash">
                    <i class="fa fa-trash" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Description from './Description';
import { mapActions } from 'vuex';

export default {
    name: 'Like',
    components: {
        Description,
    },
    props: {
        _id: String,
        title: String,
        author: String,
        description: String,
        year_publication: String,
        cover: String,
    },
    data() {
        return {
            show: false,
        };
    },
    methods: {
        ...mapActions('likes', ['ACTION_DELETE_LIKE']),

        show_description() {
            this.show = !this.show;
        },

        async trash() {
            await this.ACTION_DELETE_LIKE({
                apollo: this.$apollo,
                key: this._id,
            });
        },
    },
};
</script>
