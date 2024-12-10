<template>
  <v-container>
    <h2>Загрузка файла</h2>

    <v-file-input
      label="Выберите файл"
      v-model="file"
      @change="onFileSelect"
      outlined
      dense
    />

    <v-btn :disabled="!file || isUploading" dark color="primary" @click="uploadFile">
      Отправить
    </v-btn>

    <v-btn v-if="downloadUrl" dark color="success" @click="downloadFile">
      Скачать
    </v-btn>

    <v-snackbar v-model="snackbar.visible" :color="snackbar.color">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      downloadUrl: null,
      isUploading: false,
      snackbar: {
        visible: false,
        message: "",
        color: "success",
      },
    };
  },
  methods: {
    onFileSelect(file) {
      this.file = file;
    },
    async uploadFile() {
      if (!this.file) {
        this.showSnackbar("Выберите файл перед отправкой", "error");
        return;
      }

      this.isUploading = true;
      const formData = new FormData();
      formData.append("file", this.file);

      try {
        const response = await axios.post(
          "https://api.escuelajs.co/api/v1/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.downloadUrl = response.data.location; 
        this.showSnackbar("Файл успешно отправлен!", "success");
      } catch (error) {
        console.error(error);
        this.showSnackbar("Ошибка при отправке файла", "error");
      } finally {
        this.isUploading = false;
      }
    },
    downloadFile() {
      if (!this.downloadUrl) return;

      const link = document.createElement("a");
      link.href = this.downloadUrl;
      link.download = this.file.name || "downloaded_file";
      link.click();
    },
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
