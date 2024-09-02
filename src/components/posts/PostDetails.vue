<template>
  <div class="row">
    <div class="col-md-12">
      <div class="post-header">
        <h4>{{ postContent.title }}</h4>
      </div>
      <div class="card card-body mt-5">
        {{ postContent.content }}
      </div>

      <div class="mt-5">
        <router-link to="/posts">Go to Posts</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { getSinglePost } from "@/services/api";

export default {
  name: 'PostDetailsPage',
  setup() {
    const route = useRoute();
    const postId = ref(route.params.id);
    const postContent = ref([null]);
    let errorMessage = ref(null);

    // get post content we could put it in the blind too
    const fetchPost = async () => {
      try {
        const httpResponse = await getSinglePost(postId.value);
        if (httpResponse.data.status === true) {
          const data = httpResponse.data.response;
          postContent.value = data;
        }
      } catch (error) {
        errorMessage = error.message;
      }
    };

    // fetch data post on mounted
    onMounted(() => fetchPost());

    // watch for route change
    watch(
      () => route.params.id,
      (newId, oldId) => {
        if (newId !== oldId && newId !== undefined) {
          postId.value = newId;
          fetchPost();
        }
      }
    );

    return {
      postId,
      postContent,
      errorMessage
    };
  },
}
</script>