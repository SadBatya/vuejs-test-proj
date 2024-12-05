<template>
  <form class="form__upload" >
    <input type="file" @change="sendFile($event.target.file)" />
    <v-btn color="primary" type="submit" dark>Отправить файл</v-btn>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    sendFile(file) {
      axios.post('https://api.escuelajs.co/api/v1/files/upload', {
        body: file,
      })
      .then(() => console.log('Файл успешно отправлен'))
      .catch(e => console.log('ошибка отправки файла', e))
    },
  },
};
</script>

<style>
.form__upload {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  justify-content: center;
  gap: 20px;
  margin: 0 auto;
}
</style>
