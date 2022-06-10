<template>
  <section>
    <NavBar />
    <section class="main">
      <div class="container">
        <div class="columns columns start-screen is-multiline">
          <div class="column is-one-quarter-desktop">
            <SideBar start-screen="startScreen" />
          </div>
          <div class="column" v-if="documents">
            <a href="/open-document">
              <ButtonCard
                title="Total Number of Docs"
                icon="file"
                :numberData="documents.count"
              />
            </a>
          </div>

          <div class="column" v-if="emails">
            <a href="/open-email">
              <ButtonCard
                title="Total Number of Emails"
                icon="mail"
                :numberData="emails.count"
              />
            </a>
          </div>
          <!-- <div class="column is-one-quarter">
            <ButtonCard
              title="Total Number of SMS"
              icon="text"
              :numberData="0"
            /> -->
          <!-- </div> -->
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
      emails: [],
    };
  },
  mounted() {
    this.getDocuments();
    this.getEmails();
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/getAllDocs/${this.$auth.user._id}`,
        {
          count: true,
        }
      );
    },
    async getEmails() {
      this.emails = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/emails/${this.$auth.user._id}`,
        {
          count: true,
        }
      );
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
