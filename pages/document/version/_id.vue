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
      document: {},
      versions: [],
    };
  },
  mounted() {
    this.getCollaborators()
      .then(() => {
        this.getDocument();
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
    async getDocument() {
      this.document = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/version/${this.$nuxt.$route.params.id}`
      );
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
