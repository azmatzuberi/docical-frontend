<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div class="columns profile-page column">
          <div class="column is-2-desktop">
            <SideBar />
          </div>
          <div v-if="document.data" class="document-column column is-one-third">
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
                >File</a
              >
            </div>
          </div>
          <div class="upload-column column is-one-third">
            <b-field label="Upload a version of this file">
              <Upload :document="document" @reload="getVersions" />
            </b-field>
          </div>
        </div>
        <section class="versions-section columns is-multiline">
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
    };
  },
  mounted() {
    this.getDocument();
    this.getVersions();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
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
    margin: 10px;

    div {
      margin: 10px 0;
    }
  }
}
</style>
