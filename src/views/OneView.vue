<template>
  <div>
    <v-btn color="primary" dark @click.stop="drawer_2 = !drawer_2"
      >Добавить пост</v-btn
    >
    <v-navigation-drawer v-model="drawer" temporary absolute width="500px">
      <div class="post__description">
        <strong>{{ post_description.title }}</strong>
        <div class="post__description_text">{{ post_description.body }}</div>
        <v-btn
          color="red"
          class="nav__delete_btn"
          @click="deletePost(post_description.title)"
          >Удалить пост</v-btn
        >
      </div>
    </v-navigation-drawer>
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
            <th>
              <v-btn class="table__edit_btn" @click="editTextPost(post.id)"
                >Редактировать</v-btn
              >
            </th>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="table__buttons">
      <v-btn color="primary" dark @click.stop="drawer = !drawer">
        prev page
      </v-btn>
      <v-btn color="primary" dark @click.stop="drawer = !drawer">
        next page
      </v-btn>
    </div>
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

.post__description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.post__description_text {
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
  z-index: 10;
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
          "https://dummyjson.com/posts?limit=5"
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
    async setNewTextPost() {
      try {
        await axios.patch(`https://dummyjson.com/posts/1`, {
          body: "Новый текст",
        });
      } catch (e) {
        console.log("Не удалось изменить пост", e);
      }
    },
    pushPost() {
      this.info.push({
        id: crypto.randomUUID(),
        title: this.post_title,
        body: this.post_body,
      });
      this.post_id = "";
      this.post_title = "";
      this.post_body = "";
      alert("Пост успешно добавлен");
    },
    deletePost(text) {
      let filteredList = this.info.filter((post) => post.title !== text);
      this.info = filteredList;
      console.log(text);
      alert("пост удален");
    },
    openNavDrawer(i) {
      this.postIndex = i;
      console.log(this.postIndex);
    },
    editTextPost(id) {
      const findedPost = this.info.find((post) => post.id === id);
      const userNewText = prompt("Введите новый текст для поста");

      if (!userNewText.length) {
        alert("Поле не должно быть пустым");
        return;
      }

      this.setNewTextPost(id);

      findedPost.body = userNewText;
    },
  },
  beforeMount() {
    this.getPosts();
  },
};
</script>
