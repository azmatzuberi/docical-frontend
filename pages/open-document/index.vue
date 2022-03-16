<template>
  <section>
    <NavBar page="start-screen" />
    <section class="open-docs-main">
      <div class="container">
        <div class="columns is-multiline is-4 is-variable">
          <div class="column is-2-desktop">
            <SideBar />
          </div>
          <div class="column filters-and-switches">
            <b-field label="Turn on list view">
              <b-switch
                :rounded="false"
                :outlined="true"
                type="is-primary"
                :left-label="true"
                >List View</b-switch
              >
            </b-field>
            <b-field label="Search">
              <b-input placeholder="Search through docs" rounded></b-input>
            </b-field>
          </div>
          <div
            class="column is-one-quarter"
            v-for="(document, index) in paginatedItems"
            :key="index"
          >
            <Document :document="document" />
          </div>
          <b-pagination
            :total="documents.length"
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
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Document from "@/components/open-document/Document.vue";
export default {
  name: "OpenSignedDocumentsPage",
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
      isMobile: null,
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
    };
  },
  computed: {
    paginatedItems() {
      const pageNumber = this.current - 1;
      if (this.documents.length > 0) {
        return this.documents.slice(
          pageNumber * this.perPage,
          (pageNumber + 1) * this.perPage
        );
      }
      return null;
    },
  },
  mounted() {
    this.getDocuments();
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$get(
        `${this.$config.app.backend_URL}/api/documents`
      );
      this.documents.reverse();
    },
    onResize() {
      this.isMobile = window.innerWidth < 769;
    },
  },
};
</script>
<style lang="scss" scoped>
.open-docs-main {
  .columns.is-multiline {
    margin-top: 13px;
  }
  .filters-and-switches {
    margin: 10px;
  }
}
</style>
