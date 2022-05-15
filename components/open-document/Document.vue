<template>
  <section class="card">
    <header class="card-header" v-if="version && index % 2 === 0">
      <div class="card-header-title">
        <div class="date">
          {{ new Date(version.created).toLocaleTimeString("en-US") }}
          -
          {{ new Date(version.created).toLocaleDateString("en-US") }}
        </div>
        <div class="index-number">{{ index }}. Version</div>
      </div>
    </header>
    <div class="card-image">
      <pdf-viewer
        v-if="document"
        :src="'data:image/png;base64,' + document.thumbnail"
        :page="1"
        :annotation="true"
        :resize="true"
      >
        <template slot="loading"> loading content here... </template>
      </pdf-viewer>
      <pdf-viewer
        v-if="version"
        :src="'data:image/png;base64,' + version.thumbnail"
        :page="1"
        :annotation="true"
        :resize="true"
      >
        <template slot="loading"> loading content here... </template>
      </pdf-viewer>
    </div>
    <header class="card-header" v-if="document">
      <div class="document-index">{{ index }}.</div>
      <div class="card-header-title">{{ document.name }}</div>
    </header>
    <div class="card-content">
      <table class="card-table">
        <tbody>
          <tr v-if="document">
            <td class="row-heading">Owner:</td>
            <td class="document-field">
              <span v-if="$auth.user._id === document.user_id">You</span>
            </td>
          </tr>
          <tr v-else>
            <td class="row-heading">Owner:</td>
            <td class="document-field">
              <span v-if="$auth.user._id === version.user_id">You</span>
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Category:</td>
            <td class="document-field">
              {{ document.category }}
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Size:</td>
            <td class="document-field">
              <span v-if="document.size > 999"
                >{{ Math.round(document.size).toFixed(2) / 1000 }}KB</span
              >
              <span v-else-if="document.size > 999999"
                >{{ Math.round(document.size).toFixed(2) / 10000 }}MB</span
              >
              <span v-else
                >{{ Math.round(document.size).toFixed(2) / 100000 }}B</span
              >
            </td>
          </tr>
          <tr v-if="version">
            <td class="row-heading">Size:</td>
            <td class="document-field">
              <span v-if="version.size > 999"
                >{{ Math.round(version.size).toFixed(2) / 1000 }}KB</span
              >
              <span v-else-if="version.size > 999999"
                >{{ Math.round(version.size).toFixed(2) / 10000 }}MB</span
              >
              <span v-else
                >{{ Math.round(version.size).toFixed(2) / 100000 }}B</span
              >
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Tags:</td>
            <td class="document-field">
              <b-taglist>
                <b-tag
                  v-for="(tag, index) in document.tags"
                  :key="index"
                  type="is-info"
                  >{{ tag }}</b-tag
                >
              </b-taglist>
            </td>
          </tr>
          <tr v-else>
            <td class="row-heading">Tags:</td>
            <td class="document-field">
              <b-taglist>
                <b-tag
                  v-for="(tag, index) in version.tags"
                  :key="index"
                  type="is-info"
                  >{{ tag }}</b-tag
                >
              </b-taglist>
            </td>
          </tr>
          <tr v-if="document">
            <td class="row-heading">Versions:</td>
            <td class="document-field">{{ document.versions }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="card-footer">
      <p v-if="document" class="card-footer-item">
        <a :href="'/document/' + document._id"><span> Versions </span></a>
      </p>
      <p v-if="document" class="card-footer-item">
        <a href="#" @click="downloadDocument(document._id)"
          ><span> View Doc </span></a
        >
      </p>
      <p v-if="version" class="card-footer-item">
        <a :href="'/document/version/' + version._id"
          ><span> Version page </span></a
        >
      </p>
    </footer>
  </section>
</template>

<script>
export default {
  name: "DocuMent",
  props: ["document", "version", "index"],
  data() {
    return {
      src: "",
    };
  },
  methods: {
    async downloadDocument(id) {
      const request_config = {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/documents/remoteFile/${id}`,
          {
            user_id: this.$auth.user._id,
          },
          request_config
        )
        .then((response) => {
          const file = new Blob([response], { type: "application/pdf" });
          this.src = URL.createObjectURL(file);
          window.open(this.src);
        });
    },
    async downloadVersion(id) {
      const request_config = {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/doc_versions/remoteFile/${id}`,
          {
            user_id: this.$auth.user._id,
          },
          request_config
        )
        .then((response) => {
          const file = new Blob([response], { type: "application/pdf" });
          this.src = URL.createObjectURL(file);
          window.open(this.src);
        });
    },
  },
};
</script>

<style lang="scss">
.card {
  .image {
    width: 100px;
    margin: 0 auto;
  }
  .card-header {
    height: 2.5rem;

    .card-header-title {
      justify-content: space-between;
    }
  }
  .card-table {
    width: 100%;
    tr {
      border-bottom: 0.5px solid grey;
      td {
        padding: 5px 0;
      }
    }
    .row-heading {
      font-size: 0.8rem;
    }
    .document-field {
      text-align: right;
    }
    tr:last-child {
      border: none;
    }

    .tags {
      flex-direction: row-reverse;
      margin-bottom: 1px;
      .tag {
        margin: 3px;
      }
    }
  }
  .index-number {
    color: lightgrey;
  }
  .document-index {
    padding: 0.5rem 1rem;
    color: grey;
  }
  .card-image {
    width: 250px;
    margin: 0 auto;
  }
  .pdfViewer {
    border: 1px solid grey;
  }
}
</style>
