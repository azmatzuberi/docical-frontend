<template>
  <section class="card" v-if="email">
    <div class="card-image">
      <pdf-viewer
        :src="'data:image/png;base64,' + email.thumbnail"
        :page="1"
        :annotation="true"
        :resize="true"
      >
        <template slot="loading"> loading content here... </template>
      </pdf-viewer>
    </div>
    <header class="card-header bottom">
      <div class="email-index">{{ index }}.</div>
      <div class="card-header-title">{{ email.name }}</div>
    </header>
    <div class="card-content">
      <table class="card-table">
        <tbody>
          <tr>
            <td class="row-heading">ID:</td>
            <td class="email-field">
              <b-button class="copy-button" @click="copyId(email._id)"
                ><b-icon icon="content-copy" size="is-small"></b-icon></b-button
              >&nbsp;{{ email._id }}
            </td>
          </tr>
          <tr>
            <td class="row-heading">Date Processed:</td>
            <td class="email-field">
              {{ new Date(email.created).toLocaleTimeString("en-US") }}
              -
              {{ new Date(email.created).toLocaleDateString("en-US") }}
            </td>
          </tr>
          <tr>
            <td class="row-heading">Versions:</td>
            <td class="document-field">{{ email.versions }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer class="card-footer">
      <p v-if="emailVersion" class="card-footer-item">
        <a :href="'/email/version/' + email._id"><span> Version Page </span></a>
      </p>
      <p v-else class="card-footer-item">
        <a :href="'/email/' + email._id"><span> Versions </span></a>
      </p>
      <p class="card-footer-item" v-if="!emailVersion">
        <a href="#" @click="downloadEmail(email._id)"
          ><span> View Email </span></a
        >
      </p>
    </footer>
  </section>
</template>

<script>
export default {
  name: "Email",
  props: ["email", "index", "length", "emailVersion"],
  data() {
    return {
      src: "",
      version: "",
    };
  },
  methods: {
    copyId(id) {
      navigator.clipboard.writeText(id);
      this.success();
    },
    success() {
      this.$buefy.toast.open({
        message: "ID copied",
        type: "is-success",
      });
    },
    async downloadEmail(id) {
      const request_config = {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/${
            this.emailVersion ? "email_versions" : "email"
          }/remoteFile/${id}`,
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
    async downloadEmail(id) {
      const request_config = {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/${
            this.emailVersion ? "email_versions" : "emails"
          }/remoteFile/${id}`,
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

  @media (max-width: 600px) {
    .card-header.mobile-screen {
      display: block;
    }
    .card-header.top.desktop {
      display: none;
    }
  }

  @media (min-width: 601px) {
    .card-header.mobile-screen {
      display: none;
    }
    .card-header.top.desktop {
      display: block;
    }
  }

  .top {
    margin-bottom: 5px;
  }

  .bottom {
    margin-top: 5px;
  }
  .card-table {
    width: 100%;
    tr {
      border-bottom: 0.5px solid grey;
      td {
        padding: 5px 0;
        vertical-align: middle;
      }
    }
    .row-heading {
      font-size: 0.8rem;
    }
    .email-field {
      text-align: right;
    }
    tr:last-child {
      border: none;
    }
    .copy-button {
      vertical-align: middle;
    }
  }
  .index-number {
    color: lightgrey;
  }
  .email-index {
    padding: 0.5rem 1rem;
    color: grey;
  }
  .card-image {
    width: 250px;
    margin: 0 auto;
    border: 1px solid grey;
    padding-bottom: 1px;
  }
  .card-header.date {
    align-items: center;
    padding-left: 15px;
  }
  .card-content {
    margin-top: 5px;

    @media (max-width: 1215px) {
      font-size: 14px;
    }
  }
  canvas {
    border-right: 1px solid black;
  }
}
</style>
