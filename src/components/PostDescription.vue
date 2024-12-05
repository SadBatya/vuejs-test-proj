<template>
  <v-navigation-drawer v-model="drawer" temporary absolute width="500px">
    <div>{{ post.title }}</div>
    <div>{{ post.body }}</div>
    <v-btn color="red" class="nav__delete_btn">Удалить пост</v-btn>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";

export default {
  // props: ["drawer"],
  data() {
    return {
      post: null,
    };
  },
  methods: {
    async getDescriptionPost() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      this.post = data;
    },
  },
};
</script>

<style></style>
