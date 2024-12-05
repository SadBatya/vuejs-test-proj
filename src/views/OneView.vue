<template>
  <div>
    <v-btn color="primary" dark @click.stop="drawer_2 = !drawer_2"
      >Добавить пост</v-btn
    >
    <v-navigation-drawer v-model="drawer_2" temporary absolute width="500px">
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
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody class="table__inner">
          <tr
            class="table__row"
            v-for="(post, i) in info"
            :key="i"
            @click.stop="drawer = !drawer"
            @click="openNavDrawer(post.id)"
          >
            <td class="table__col">{{ post.id }}</td>
            <td class="table__col">{{ post.title }}</td>
            <td class="table__col">{{ post.body }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-navigation-drawer v-model="drawer" temporary absolute width="500px">
      <div class="post__description">
        <strong>{{ post_description.title }}</strong>
        <div class="post__description_text">{{ post_description.body }}</div>
        <v-btn color="red" class="nav__delete_btn" >Удалить пост</v-btn>
      </div>
    </v-navigation-drawer>
    <!-- {{ count }} -->
    <div class="table__buttons">
      <v-btn color="primary" dark @click.stop="drawer = !drawer">
        prev page
      </v-btn>
      <v-btn color="primary" dark @click.stop="drawer = !drawer">
        next page
      </v-btn>
    </div>
    <!-- <PostDescription /> -->
  </div>
</template>

<style lang="scss">
.navigation__inputs {
  padding: 50px;
  .navigation__btn {
    margin-top: 50px;
  }
}

.table__inner {
  .table__row {
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .table__col {
    max-width: 150px;
    padding: 5px 10px;
  }
}

.post__description{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.post__description_text{
  margin-top: 50px;
}

.table__buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
}

.nav__delete_btn {
  margin-top: 50px;
}
</style>

<script setup>
import { ref } from "vue";

const drawer = ref(null);
const drawer_2 = ref(null);
</script>

<script>
import axios from "axios";
// import PostDescriptionVue from "@/components/PostDescription.vue";

export default {
  components: {
    // PostDescriptionVue,
  },
  data() {
    return {
      postIndex: 0,
      info: null,
      drawer: null,
      drawer_2: null,
      post_id: "",
      post_title: "",
      post_body: "",
      post_description: "",
    };
  },
  watch: {
    postIndex(newPostIndex, oldPostIndex) {
      console.log("новый индекс", newPostIndex, "старый индекс", oldPostIndex);
      this.getDescriptionPost();
    },
  },
  methods: {
    async getPosts() {
      try {
        const { data } = await axios.get(
          "https://dummyjson.com/posts?limit=10"
        );
        this.info = data.posts;
      } catch (error) {
        console.log("Ошибка запроса", error);
      }
    },
    async getDescriptionPost() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/posts/${this.postIndex}`
        );
        this.post_description = data;
        console.log(data);
      } catch (error) {
        console.log("ошибка запроса описания поста", console.log(error));
      }
    },
    pushPost() {
      this.info.push({
        id: this.post_id,
        title: this.post_title,
        body: this.post_body,
      });
      this.post_id = "";
      this.post_title = "";
      this.post_body = "";
      alert("Пост успешно добавлен");
    },
    deletePost(i) {
      this.info.filter((post) => post !== post[i]);
    },
    openNavDrawer(i) {
      this.postIndex = i;
      console.log(this.postIndex);
    },
  },
  beforeMount() {
    this.getPosts();
  },
};
</script>
