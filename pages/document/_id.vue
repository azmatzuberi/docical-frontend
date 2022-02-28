<template>
  <section>
    <NavBar page="start-screen" />
    <section class="open-docs-main">
      <div class="container">
        <div class="columns start-screen is-gapless">
          <div class="column is-2-desktop">
            <SideBar />
          </div>
          <FilesTable :documents="documents" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/start-screen/SideBar.vue'
import FilesTable from '@/components/open-document/FilesTable.vue'
export default {
  name: 'DocumentProfile',
  components: {
    NavBar,
    SideBar,
    FilesTable,
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
    }
  },
  mounted() {
    this.getDocuments()
  },
  methods: {
    async getDocuments() {
      this.documents = await this.$axios.$get(
        `${process.env.DB_HOST}/api/documents/${this.$nuxt.$route.params}`
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.open-docs-main {
}
</style>
