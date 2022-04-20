<template>
  <section class="card">
    <header class="card-header">
      <p v-if="document" class="card-header-title">
        {{ document.name }}
      </p>
      <div v-if="version" class="card-header-title">
        <div>{{ index }}:</div>
        <div id="date">
          {{ new Date(version.created).toLocaleDateString("en-US") }}
        </div>
      </div>
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
            <td class="document-field">{{ document.size }}</td>
          </tr>
          <tr v-if="version">
            <td class="row-heading">Size:</td>
            <td class="document-field">{{ version.size }}</td>
          </tr>
          <tr>
            <td class="row-heading">Signees:</td>
            <td v-if="document" class="document-field">
              <span v-for="(signer, index) in document.signees" :key="index"
                >{{ signer }},&nbsp;</span
              >
            </td>
            <td v-if="version" class="document-field">
              <span v-for="(signer, index) in version.signees" :key="index"
                >{{ signer }},&nbsp;</span
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
          ><span> View </span></a
        >
      </p>
      <p v-if="version" class="card-footer-item">
        <a href="#" @click="downloadVersion(version._id)"
          ><span> View </span></a
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
    downloadDocument(id) {
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
    downloadVersion(id) {
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
}
</style>
