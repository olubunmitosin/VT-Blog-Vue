<template>
  <NavBar/>
  <router-view/>
</template>

<script>
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
import NavBar from "./components/NavBar";

export default {
  name: 'App',
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch("getBlogContent");
    });
  },
  components: {
    NavBar
  }
}
</script>
