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
  props: ["document", "email", "docType"],
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
    success() {
      this.$buefy.toast.open({
        message: "Document uploaded!",
        type: "is-success",
      });
    },
    danger() {
      this.$buefy.toast.open({
        duration: 5000,
        message: "Could not upload document",
        type: "is-danger",
      });
    },
    uploadFiles() {
      const formData = new FormData();
      formData.append("documents", this.dropFiles);
      formData.append("name", this.document.data.name);
      formData.append(
        `${this.email ? "source_email" : "source_doc"}`,
        this.document.data._id
      );
      formData.append("user_id", this.$auth.user._id);
      formData.append("first_name", this.$auth.user.first_name);
      formData.append("last_name", this.$auth.user.last_name);
      formData.append("company", this.$auth.user.company);
      formData.append("docType", this.email ? "Email_Version" : "Version");
      formData.append("description", this.doc.description);
      for (let i = 0; i < this.doc.collaborators.length; i++) {
        formData.append("collaborators[]", this.doc.collaborators[i]);
      }

      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/documents/createDocument`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.$emit("reload", true);
          }
          this.success();
        })
        .catch(() => {
          this.danger();
        });
      this.dropFiles = null;
    },
  },
};
</script>

<style>
</style>
