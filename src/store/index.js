import { createStore } from "vuex";
import { getPosts, deletePost, createPost, updatePost } from "@/services/api";
import { useToast } from "vue-toastification";

export default createStore({
  state: {
    blogContent: [],
  },
  getters: {
    blogContent: (state) => {
      return state.blogContent;
    },
  },
  mutations: {
    // Set the blog state
    SET_BLOG(state, blogContent) {
      state.blogContent = blogContent;
    },
    // Delete blog state
    DELETE_BLOG_POST(state, id) {
      const index = state.blogContent.findIndex(post => post.id == id);
      if (index > -1) {
        state.blogContent.splice(index, 1);
      }
      if (state.blogContent.length === 0) state.blogContent = null;
    },
    // Add blog post to posts state
    ADD_POST(state, blogContent) {
      if (state.blogContent === null) state.blogContent = [];
      state.blogContent.push(blogContent);
    },
    // Update the post
    UPDATE_POST(state, newPost) {
      state.blogContent = state.blogContent.map(post => {
        if (post.id === newPost.id) {
          post.title = newPost.title;
          post.content = newPost.content;
        }
        return post;
      });
    }
  },
  actions: {
    async getBlogContent({ state, commit }) {
      // perform quick check to avoid refetch
      if (state.blogContent.length > 0) return;

      // fetch blog content to dev.to api and set state
      const httpResponse = await getPosts();
      if (httpResponse.data.status === true) {
        const blogContent = httpResponse.data.response;
        // commit mutation to set blogContent state
        commit("SET_BLOG", blogContent);
        return blogContent;
      }
    },

    async deleteBlogPost({ commit }, id) {
      const toast = useToast();
      const httpResponse = await deletePost(id);
      if (httpResponse.data.status === true) {
        toast.success(httpResponse.data.message);
        commit("DELETE_BLOG_POST", id);
      }
    },

    async addBlogPost({ commit }, post) {
      const toast = useToast();
      const httpResponse = await createPost(post);
      if (httpResponse.data.status === true) {
        toast.success(httpResponse.data.message);
        commit("ADD_POST", httpResponse.data.response);
      }
    },

    async updateBlogPost({ commit }, post) {
      const toast = useToast();
      const httpResponse = await updatePost(post);
      if (httpResponse.data.status === true) {
        toast.success(httpResponse.data.message);
        commit("UPDATE_POST", httpResponse.data.response);
      }
    },
  },
});