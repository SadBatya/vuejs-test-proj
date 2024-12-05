<template>
  <v-navigation-drawer v-model="drawer" temporary absolute width="500px">
    <div class="navigation__inputs">
      <v-text-field
        v-model="post_body"
        hide-details="auto"
        label="Post Title"
      ></v-text-field>
      <v-text-field
        v-model="post_title"
        hide-details="auto"
        label="User Text"
      ></v-text-field>
      <v-text-field
        type="number"
        v-model="post_id"
        hide-details="auto"
        label="User Id"
      ></v-text-field>
      <v-btn @click="pushPost" class="navigation__btn" color="primary" dark
        >Отправить пост</v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
const drawer = ref(null);
</script>

<script>
export default {
  data() {
    return {
      drawer: null,
      post_id: "",
      post_title: "",
      post_body: "",
    };
  },
};
</script>

<style></style>
