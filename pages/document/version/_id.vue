<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div class="columns profile-page is-multiline">
          <div class="column is-2-desktop">
            <SideBar />
          </div>
          <div v-if="version.data" class="document-column column is-one-third">
            <div class="document-name">
              {{ version.data.name }}
            </div>
            {{ version.data.created }}
            <div class="document-size">Size: {{ version.data.size }}</div>
            <div class="document-category">
              Category: {{ version.data.category }}
            </div>
            <div class="document-owner">Owners: {{ version.data.owner }}</div>
            <div class="document-tags">
              Tags:
              <b-tag
                v-for="(tag, index) in version.data.tags"
                :key="index"
                type="is-info"
                >{{ tag }}</b-tag
              >
            </div>
          </div>
          <div class="column is-one-third">
            <img class="seal" src="/images/symbol.png" alt="Docical seal" />
          </div>
          <div v-if="version.data" class="column is-half view-file-column">
            <b-button
              class="view-file-button"
              type="is-primary"
              @click="downloadVersion(version.data._id)"
              >View file</b-button
            >
          </div>
          <div class="column is-half view-file-column">
            <b-button class="view-file-button" type="is-primary-light"
              >Compare file</b-button
            >
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Document from "@/components/open-document/Document.vue";
import Upload from "@/components/open-document/Upload.vue";
import FilesTable from "@/components/open-document/FilesTable.vue";
export default {
  middleware: "auth",
  name: "DocumentProfile",
  components: {
    NavBar,
    SideBar,
    FilesTable,
    Document,
    Upload,
  },
  data() {
    return {
      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true,
      selected: null,
      version: [],
    };
  },
  mounted() {
    this.getCollaborators()
      .then(() => {
        this.getVersion();
      })
      .catch((error) => {
        this.$nuxt.router.push("/start-screen");
      });
  },
  methods: {
    async getCollaborators() {
      const collaboratorResult = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/collaborators/${this.$nuxt.$route.params.id}`,
        {
          user_id: this.$auth.user._id,
          doc_tpe: "Version",
          email: this.$auth.user.email,
        }
      );
    },
    async getVersion() {
      this.version = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/version/${this.$nuxt.$route.params.id}`
      );
    },
    async downloadVersion(id) {
      const vm = this;
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
          vm.src = URL.createObjectURL(file);
          window.open(vm.src);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-main {
  .columns {
    padding-right: 0;
    margin-right: 0;
    padding-left: 0;
    margin-left: 0;
  }
  .profile-page {
    margin-top: 13px;

    .version-column {
      margin-top: 10px;
    }
    .document-name {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .document-size {
      font-size: 1rem;
    }
    .tag {
      margin: 0 5px;
    }
  }
  .document-column {
    div {
      margin: 10px 0;
    }
  }
  .seal {
    @media (max-width: 768px) {
      width: 40%;
    }
    @media (min-width: 769px) {
      width: 40%;
    }
  }
}
</style>
