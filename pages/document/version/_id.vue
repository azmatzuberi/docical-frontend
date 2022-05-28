<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div class="columns profile-page is-multiline">
          <div class="column is-3-desktop is-4-tablet">
            <SideBar />
          </div>
          <div
            v-if="version && show"
            class="document-column column is-one-third"
          >
            <div class="document-name">
              {{ version.data.name }}
            </div>
            <div class="document-date-time">
              {{ new Date(version.data.created).toLocaleDateString("en-US") }}
              -
              {{ new Date(version.data.created).toLocaleTimeString("en-US") }}
            </div>
            <div class="document-size">Size: {{ version.data.size }}</div>
            <div class="document-category">
              Category: {{ version.data.category }}
            </div>
            <div class="document-owner">
              Owner: {{ version.data.first_name }} {{ version.data.last_name }}
            </div>
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
          <div
            class="
              column
              is-one-third-desktop is-two-fifths-mobile is-one-third-tablet
            "
          >
            <img
              class="seal"
              src="https://storage.googleapis.com/docical-images/Symbol.png"
              alt="Docical seal"
            />
          </div>
          <div
            v-if="version && show"
            class="column is-one-third-desktop view-file-column"
          >
            <b-button
              class="view-file-button"
              type="is-primary"
              @click="downloadVersion(version.data._id)"
              >View file</b-button
            >
          </div>
          <div v-if="show" class="column is-one-third view-file-column">
            <b-button class="view-file-button" type="is-primary is-light"
              >Compare file</b-button
            >
          </div>
          <div v-if="show" class="column is-one-third view-file-column">
            <b-button class="view-file-button" focused @click="openModal"
              ><b-icon icon="signature-freehand"></b-icon>&nbsp;&nbsp;&nbsp;
              Sign document</b-button
            >
          </div>
          <section
            class="column is-one-third-desktop is-half-tablet"
            v-if="!collaboratorFlag && show"
          >
            <Collaborate :version="version" :page="false" />
          </section>
          <div v-if="show === false" class="column">
            <h1>You don't have access to this document</h1>
          </div>
        </div>
        <Comments />
      </div>
    </section>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      full-screen
      :can-cancel="true"
    >
      <Signature :version="version" />
    </b-modal>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Document from "@/components/open-document/Document.vue";
import Upload from "@/components/open-document/Upload.vue";
import FilesTable from "@/components/open-document/FilesTable.vue";
import Collaborate from "@/components/create-document/Collaborate.vue";
import Signature from "@/components/signing/Signature.vue";
import Comments from "@/components/version/Comments.vue";
export default {
  middleware: "auth",
  name: "VersionProfile",
  components: {
    NavBar,
    SideBar,
    FilesTable,
    Document,
    Upload,
    Collaborate,
    Signature,
    Comments,
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
      collaborators: [],
      collaboratorFlag: null,
      show: null,
      src: "",
      isComponentModalActive: false,
    };
  },
  computed: {
    formattedZoom() {
      return Number.parseInt(this.scale * 100);
    },
  },
  mounted() {
    const vm = this;
    this.getCollaborators()
      .then(() => {
        this.getVersion();
      })
      .catch((error) => {
        vm.show = false;
      });
  },
  methods: {
    addDocStuff(data) {
      if (data) {
        const doc = {
          collaborators: this.collaborators,
        };
        this.$store.commit("doc/add", doc);
      }
    },
    async getCollaborators() {
      const vm = this;
      const collaboratorResult = await this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/collaborators/${this.$nuxt.$route.params.id}`,
          {
            user_id: this.$auth.user._id,
            doc_type: "Version",
            email: this.$auth.user.email,
          }
        )
        .then(() => {
          vm.collaboratorsFlag = true;
        })
        .catch(() => {
          vm.collaboratorsFlag = false;
        });
    },
    async getVersion() {
      const vm = this;
      await this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/doc_versions/version/${this.$nuxt.$route.params.id}`,
          {
            user_id: this.$auth.user._id,
          }
        )
        .then((result) => {
          vm.version = result;
          vm.show = true;
        })
        .catch(() => {
          vm.show = false;
        });
    },
    openModal() {
      this.isComponentModalActive = true;
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
        .then(async (response) => {
          const file = new Blob([response], { type: "application/pdf" });
          vm.src = URL.createObjectURL(file);
          window.open(vm.src);
        });
    },
  },
};
</script>
<style lang="scss"	>
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
