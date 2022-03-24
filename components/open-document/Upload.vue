<template>
  <section class="upload-component">
    <b-field>
      <b-upload v-model="dropFiles" drag-drop expanded @input="uploadFiles">
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon icon="upload" size="is-large"></b-icon>
            </p>
            <p>Drop your file here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary"
      >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"
        ></button>
      </span>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "VersionUpLoad",
  props: ["document"],
  data() {
    return {
      dropFiles: [],
    };
  },
  computed: {
    ...mapGetters({
      doc: "doc/get",
    }),
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    uploadFiles() {
      const formData = new FormData();
      const documentInfo = {
        source_doc: this.document.id,
        name: this.document.name,
      };
      formData.append("documents", this.dropFiles);
      formData.append("documentInfo", documentInfo);

      this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/createVersion`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
  },
};
</script>

<style>
</style>
