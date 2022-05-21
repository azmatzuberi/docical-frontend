<template>
  <section>
    <NavBar />
    <section class="main">
      <div class="container">
        <div class="columns columns start-screen is-multiline">
          <div class="column is-one-quarter-desktop">
            <SideBar start-screen="startScreen" />
          </div>
          <div class="column">
            <ButtonCard
              title="Total Number of Docs"
              icon="document-outline"
              :number-data="documents.length"
            />
          </div>
          <div class="column">
            <ButtonCard
              title="Total Number of Versions"
              icon="documents"
              :number-data="versions"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import ButtonCard from "@/components/start-screen/ButtonCard.vue";
import Steps from "@/components/create-document/Steps.vue";
export default {
  middleware: "auth",
  name: "StartPage",
  components: {
    NavBar,
    SideBar,
    ButtonCard,
    Steps,
  },
  data() {
    return {
      documents: [],
      versions: 0,
    };
  },
  mounted() {
    this.getDocuments().then(() => this.getVersions());
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$get(
        `${this.$config.app.backend_URL}/api/documents/${this.$auth.user._id}`
      );
    },
    async getVersions() {
      let versionsDoc = {};
      for (versionsDoc in this.documents) {
        const versionsList = await this.$axios.$post(
          `${this.$config.app.backend_URL}/api/doc_versions/versions/${this.documents[versionsDoc]._id}`,
          {
            user_id: this.$auth.user._id,
          }
        );
        this.versions += versionsList.length;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  .columns.homepage {
    margin-top: 4rem;
  }

  .columns {
    padding-right: 0;
    margin-right: 0;
    padding-left: 0;
    margin-left: 0;
  }

  .primary-headline {
    font-size: 4rem;
    font-weight: 400;
  }

  p {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  .start-now-button {
    font-size: 16px;
    height: 48px;
    width: 130px;
    font-weight: 700;
    margin-bottom: 60px;
  }

  .middle-image {
    width: 100%;
    height: 500px;
    background-image: url("/images/office-documents.jpg");
  }
}
</style>
