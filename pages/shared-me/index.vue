<template>
  <section>
    <NavBar page="start-screen" />
    <section class="open-docs-main">
      <div class="container">
        <div class="columns column is-multiline">
          <div class="column is-3-desktop">
            <SideBar />
          </div>
          <div
            v-if="this.documents.data"
            class="column is-9-desktop is-8-tablet filters-and-switches"
          >
            <b-field label="Turn on list view">
              <b-switch
                :rounded="false"
                :outlined="true"
                type="is-primary"
                :left-label="true"
                >List View</b-switch
              >
            </b-field>
            <b-field label="Search" class="search">
              <b-input placeholder="Search through docs" rounded></b-input>
            </b-field>
            <div>Total documents: {{ this.documents.data.length }}</div>
          </div>
        </div>
        <section class="columns is-multiline">
          <div
            class="
              document-list
              column
              is-4-desktop is-half-tablet is-half-mobile
            "
            v-for="(document, index) in paginatedItems"
            :key="index"
          >
            <Document class="column" :document="document" />
          </div>
        </section>
      </div>
      <section class="pagination-list columns">
        <div v-if="documents.data" class="column">
          <b-pagination
            v-if="documents.data.length > 10"
            :total="documents.data.length"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="hasInput"
            :page-input-position="inputPosition"
            :debounce-page-input="inputDebounce"
          >
          </b-pagination>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Document from "@/components/open-document/Document.vue";
export default {
  middleware: "auth",
  name: "SharedWithMeDocumentsPage",
  components: {
    NavBar,
    SideBar,
    Document,
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
      documents: [],
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
      hasInput: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      inputPosition: "",
      inputDebounce: "",
      documentVersions: [],
      emails: [],
      emailVersions: [],
    };
  },
  computed: {
    paginatedItems() {
      const pageNumber = this.current - 1;
      if (this.documents.data) {
        if (this.documents.data.length > 0) {
          return this.documents.data.slice(
            pageNumber * this.perPage,
            (pageNumber + 1) * this.perPage
          );
        }
      }
      return null;
    },
  },
  mounted() {
    this.getDocuments();
    this.getDocumentVersions();
    this.getEmails();
    this.getEmailVersions();
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/documents/getSharedWithMe/${this.$auth.user._id}`
      );
      this.documents.reverse();
    },
    async getDocumentVersions() {
      this.documents = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/doc_versions/getSharedWithMe/${this.$auth.user._id}`
      );
      this.documentVersions.reverse();
    },
    async getEmails() {
      this.documents = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/emails/getSharedWithMe/${this.$auth.user._id}`
      );
      this.emails.reverse();
    },
    async getEmailVersions() {
      this.documents = await this.$axios.$post(
        `${this.$config.app.backend_URL}/api/email_versions/getSharedWithMe/${this.$auth.user._id}`
      );
      this.emailVersions.reverse();
    },
  },
};
</script>
<style lang="scss" scoped>
.open-docs-main {
  .columns.is-multiline {
    margin-top: 13px;
  }
  @media (max-width: 820px) {
    .columns {
      padding-right: 0;
      margin-right: 0;
      padding-left: 0;
      margin-left: 0;
    }
  }
  @media (max-width: 820px) and (min-width: 745px) {
    .document-list {
      display: inline-block;
    }
  }
  @media (max-width: 744px) {
    .document-list {
      display: contents;
    }
  }
  @media (min-width: 821px) {
    .filters-and-switches {
      .search {
        width: 50%;
      }
    }
  }
}
</style>
