<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div class="columns profile-page column">
          <div class="column is-3-desktop">
            <SideBar />
          </div>
          <div
            v-if="document.data && show"
            class="document-column column is-one-third"
          >
            <div class="document-name">
              {{ document.data.name }}
            </div>
            {{ document.data.created }}
            <div class="document-size">Size: {{ document.data.size }}</div>
            <div class="document-category">
              Category: {{ document.data.category }}
            </div>
            <div class="document-owner">Owners: {{ document.data.owner }}</div>
            <div class="document-tags">
              Tags:
              <b-tag
                v-for="(tag, index) in document.data.tags"
                :key="index"
                type="is-info"
                >{{ tag }}</b-tag
              >
            </div>
            <div v-if="versions" class="document-versions">
              Versions: {{ versions.length }}
            </div>
            <div class="document-original">
              Original:
              <a target="blank" :href="encodeURI(document.data.originalFileUrl)"
                >View</a
              >
            </div>
            <b-field v-if="!collaboratorFlag" label="Emails of Collaborators">
              <b-taginput
                v-model="collaborators"
                @input="addDocStuff({ collaborators })"
                ellipsis
                icon="label"
                placeholder="Add email"
                aria-close-label="Delete this email"
                maxtags="10"
              >
              </b-taginput>
            </b-field>
          </div>
          <div v-if="show" class="upload-column column is-one-third">
            <b-field label="Upload a version of this file">
              <Upload :document="document" @reload="getVersions" />
            </b-field>
          </div>
          <section v-if="show === false">
            <div class="column">
              <h1>You don't have access to this document</h1>
            </div>
          </section>
        </div>
        <section v-if="show" class="versions-section columns is-multiline">
          <div
            class="version-column column is-one-quarter-desktop is-half-tablet"
            v-for="(version, index) in versions"
            :key="index"
          >
            <Document
              :version="version"
              :index="(index - versions.length) * -1"
            />
          </div>
        </section>
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
      document: {},
      versions: [],
      collaboratorsInput: [],
      collaboratorFlag: true,
      show: null,
    };
  },
  computed: {
    collaborators: {
      get() {
        return this.document.data.collaborators;
      },
      set(values) {
        this.collaboratorsInput = values;
      },
    },
  },
  beforeMount() {
    this.getCollaborators();
  },
  methods: {
    async getCollaborators() {
      await this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/collaborators/${this.$nuxt.$route.params.id}`,
          {
            user_id: this.$auth.user._id,
            doc_type: "Document",
            email: this.$auth.user.email,
          }
        )
        .then((result) => {
          if (result.status === 200 && result.flag) {
            this.collaboratorFlag = true;
            this.show = true;
          }
          if (result.status === 201 && result.flag) {
            this.collaboratorFlag = false;
            this.show = true;
          }
          this.getDocument();
          this.getVersions();
        })
        .catch(() => {
          this.show = false;
        });
    },
    async getDocument() {
      this.document = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/document/${this.$nuxt.$route.params.id}`
      );
    },
    async getVersions() {
      this.versions = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/versions/${this.$nuxt.$route.params.id}`,
        {
          user_id: this.$auth.user._id,
        }
      );

      this.versions.reverse();
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
      // margin: 10px 0;
    }
  }
}
</style>
