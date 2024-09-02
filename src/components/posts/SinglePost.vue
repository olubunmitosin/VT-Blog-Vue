<template>
  <div class="card">
    <div class="card-body">
      <div class="single-post">
        <h2 class="p-title">{{ item.title }}</h2>
        <p class="card-text p-content mt-4">{{ excerpt(item.content, 300) }}</p>
        <div class="mt-4 d-flex justify-content-between align-content-center">
          <a class="btn btn-link" v-bind:href="'/post/' + item.id" role="button">View more...</a>
          <button class="btn btn-link" @click="editPost(item)">Edit Post <i class="fa fa-edit"></i></button>
          <button class="btn btn-link" @click="deletePost(item)">Delete <i class="fa fa-trash"></i></button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" v-bind:ref="'modelItem_' + item.id" v-bind:id="'modelItem_' + item.id" tabindex="-1"
    v-bind:aria-labelledby="'itemLabel' + item.id" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" v-bind:id="'itemLabel' + item.id">Edit {{ item.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <form @submit.prevent="updatePost">
            <div class="form-group">
              <label for="post_title">Post Title</label>
              <input id="post_title" name="title" class="form-control" v-model="editItem.title"
                placeholder="Enter post title" />
            </div>
            <div class="form-group mt-3">
              <label for="post_content">Post Content</label>
              <textarea id="post_title" name="title" rows="4" class="form-control" v-model="editItem.content"
                placeholder="Enter post content"></textarea>
            </div>

            <div class="d-flex justify-content-between align-content-center mt-4">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
export default {
  props: ['post'],
  name: "SinglePostPage",
  data() {
    return {
      item: this.post,
      editItem: {},
      modal: null
    }
  },
  methods: {
    excerpt(value, length) {
      return value.length > length ? value.substring(0, length) + " ..." : value
    },
    async deletePost(item) {
      this.$store.dispatch("deleteBlogPost", item.id);
    },
    editPost(item) {
      const modalAnchor = 'modelItem_' + item.id;
      this.editItem = Object.assign({}, item);
      this.modal = new Modal(this.$refs[modalAnchor]);
      this.modal.show();
    },
    updatePost() {
      this.$store.dispatch('updateBlogPost', this.editItem);
      this.modal.hide();
    },
  }
}
</script>
<style lang="css" scoped>
.p-title {
  min-height: 80px;
}

.p-content {
  min-height: 100px;
}
</style>