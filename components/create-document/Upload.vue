<template>
  <section class="upload-component">
    <b-field label="Upload your document">
      <b-upload v-model="dropFiles" drag-drop expanded @input="createDoc">
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
  name: "UpLoad",
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
      formData.append("documents", this.dropFiles);

      this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/createDocument`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    createDoc() {
      const formData = new FormData();
      formData.append("documents", this.dropFiles);
      formData.append("name", this.doc.name);
      formData.append("category", this.doc.category);
      formData.append("user_id", this.$auth.user._id);
      for (let i = 0; i < this.doc.tags.length; i++) {
        formData.append("tags[]", this.doc.tags[i]);
      }
      formData.append("description", this.doc.description);
      for (let i = 0; i < this.doc.collaborators.length; i++) {
        formData.append("collaborators[]", this.doc.collaborators[i]);
      }

      this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/createDocument`,
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
