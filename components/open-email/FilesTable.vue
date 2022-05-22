<template>
  <section class="column table-section">
    <b-table
      :data="isEmpty ? [] : documents"
      :bordered="isBordered"
      :striped="isStriped"
      :narrowed="isNarrowed"
      :hoverable="isHoverable"
      :loading="isLoading"
      :focusable="isFocusable"
      :mobile-cards="hasMobileCards"
      :selected.sync="selected"
      @dblclick="openDocumentProfile"
    >
      <b-table-column field="name" label="Name" v-slot="props" width="280">
        {{ props.row.name }}
      </b-table-column>

      <b-table-column field="owner" label="Owner" v-slot="props" width="120">
        {{ props.row.owner }}
      </b-table-column>

      <b-table-column
        field="category"
        label="Category"
        v-slot="props"
        width="120"
      >
        {{ props.row.category }}
      </b-table-column>

      <b-table-column
        field="verions"
        label="Versions"
        v-slot="props"
        width="80"
        centered
      >
        {{ props.row.versions }}
      </b-table-column>

      <b-table-column
        field="signees"
        label="Signees"
        v-slot="props"
        width="160"
      >
        <span v-for="(signee, index) in props.row.signees" :key="index"
          >{{ signee }},&nbsp;</span
        >
      </b-table-column>

      <b-table-column field="tags" label="Tags" v-slot="props" width="150">
        <b-taglist>
          <b-tag
            v-for="(tag, index) in props.row.tags"
            :key="index"
            type="is-warning"
            >{{ tag }}</b-tag
          >
        </b-taglist>
      </b-table-column>

      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  name: 'FilesTable',
  props: ['documents'],
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
    }
  },
  methods: {
    openDocumentProfile($event) {
      this.$nuxt.$router.push('/document/' + $event.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.table-section {
  margin-top: 26px;
  box-shadow: 5px 0px 13px 3px rgb(10 10 10 / 10%);
  border-radius: 5px;

  .b-table {
    font-size: 0.8rem;
  }
}
</style>
