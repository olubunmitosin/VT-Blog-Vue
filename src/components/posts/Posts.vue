<template>
    <div class="row">
        <div class="col-md-6 text-left">
            <h3>Actions</h3>
        </div>
        <div class="col-md-6 text-right">
            <button data-bs-toggle="collapse" ref="addPostButton" href="#collapseOne" role="button"
                aria-expanded="false" aria-controls="collapseOne" class="btn btn-primary btn-lg">Create New Post <i
                    class="fa fa-pencil"></i> </button>
        </div>
        <div class="col-md-12">
            <div class="collapse mt-3" id="collapseOne">
                <div class="card card-body">
                    <form @submit.prevent="addNewPost" class="mt-3">
                        <div class="form-group">
                            <label for="post_title">Post Title</label>
                            <input id="post_title" name="title" class="form-control" v-model="newPost.title"
                                placeholder="Enter post title" />
                        </div>
                        <div class="form-group mt-3">
                            <label for="post_content">Post Content</label>
                            <textarea id="post_title" name="title" rows="4" class="form-control"
                                v-model="newPost.content" placeholder="Enter post content"></textarea>
                        </div>

                        <button type="submit" class="btn btn-success mt-3">Create Post <i
                                class="fa fa-save"></i></button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <hr />
    <div class="row" v-if="blogContent && blogContent.length">
        <div class="col-md-4" v-for="(post, index) in blogContent" :key="index">
            <SinglePost v-bind:post="post" v-bind:key="post.id"></SinglePost>
        </div>
    </div>
    <div class="row justify-content-center align-content-center" v-else>
        <div class="col-md-10">
            <div class="empty-container">
                <h5 v-if="blogContent == null">No Blog Posts were found!</h5>
                <h5 v-else>Loading Blog Posts.....</h5>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import SinglePost from './SinglePost';

export default {
    name: 'PostsPage',
    components: {
        SinglePost
    },
    data() {
        return {
            newPost: {
                title: '',
                content: ''
            },
        };
    },
    setup() {
        const store = useStore();
        const blogContent = computed(() => store.state.blogContent);
        return {
            blogContent
        };
    },
    methods: {
        addNewPost() {
            this.$store.dispatch('addBlogPost', this.newPost)
            this.newPost = {
                title: '',
                content: ''
            }
            // close collapsible section
            this.$refs.addPostButton.click();
        }
    },
}
</script>
<style lang="css" scoped>
.empty-container {
    height: 190px;
    background-color: #f5f5f5;
}

.empty-container h5 {
    text-align: center;
    padding-top: 50px;
}

.text-right {
    text-align: right;
}
</style>