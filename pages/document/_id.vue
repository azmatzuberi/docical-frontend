<template>
  <section>
    <NavBar page="profile-page" />
    <section class="profile-main">
      <div class="container">
        <div
          class="columns profile-page is-multiline"
          :class="{ 'is-gapless': isMobile }"
        >
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
          </div>
          <div class="upload-column column is-one-third">
            <b-field label="Upload a version of this file">
              <Upload :document="document" />
            </b-field>
          </div>
          <div
            class="version-column column is-one-quarter"
            v-for="(version, index) in versions"
            :key="index"
          >
            <Document :version="version" :index="index + 1" />
          </div>
          <!-- <FilesTable :documents="documents" /> -->
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
      isMobile: null,
    };
  },
  mounted() {
    this.onResize();
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
      this.versions = await this.$axios.$get(
        `${this.$config.app.backend_URL}/api/doc_versions/${this.$nuxt.$route.params.id}`
      );
    },
    onResize() {
      this.isMobile = window.innerWidth < 769;
    },
  },
};
</script>
<style lang="scss" scoped>
.profile-main {
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
