<template>
  <div class="App">
    <Title />
    <UploadForm />
    <ImageGrid @selected="updateSelectedImgUrl" />
    <Modal
      v-if="selectedImgUrl"
      :imgUrl="selectedImgUrl"
      @close="updateSelectedImgUrl"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import ImageGrid from "./components/ImageGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Modal from "./components/Modal";

export default {
  name: "App",
  components: { ImageGrid, Title, UploadForm, Modal },
  setup() {
    const selectedImgUrl = ref(null);

    const updateSelectedImgUrl = (url) => {
      selectedImgUrl.value = url;
      console.log(selectedImgUrl.value);
    };

    return { selectedImgUrl, updateSelectedImgUrl };
  },
};
</script>

<style></style>
