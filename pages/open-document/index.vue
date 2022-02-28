<template>
  <section>
    <NavBar page="start-screen" />
    <section class="open-docs-main">
      <div class="container">
        <div
          class="columns is-multiline is-4 is-variable"
          :class="{ 'is-gapless': isMobile }"
        >
          <div class="column is-2-desktop">
            <SideBar />
          </div>
          <div
            class="column is-one-quarter"
            v-for="(document, index) in documents"
            :key="index"
          >
            <Document :document="document" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/start-screen/SideBar.vue'
import Document from '@/components/open-document/Document.vue'
export default {
  name: 'OpenSignedDocumentsPage',
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
    }
  },
  mounted() {
    this.getDocuments()
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$get(
        `${process.env.BACKEND_URL}/api/documents`
      )
    },
    onResize() {
      this.isMobile = window.innerWidth < 769
    },
  },
}
</script>
<style lang="scss" scoped>
.open-docs-main {
  .columns.is-multiline {
    margin-top: 13px;
  }
}
</style>
