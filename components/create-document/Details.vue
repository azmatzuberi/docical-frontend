<template>
  <section class="details-section">
    <b-field class="details-header" label="Upload new document"></b-field>
    <b-field label="Document Name">
      <b-input v-model="name" @input="addDocStuff({ name })"></b-input>
    </b-field>
    <b-field label="Category">
      <b-input v-model="category" @input="addDocStuff({ category })"></b-input>
    </b-field>
    <b-field label="Add Tags">
      <b-taginput
        v-model="tags"
        @input="addDocStuff({ tags })"
        ellipsis
        icon="label"
        placeholder="Add a tag"
        aria-close-label="Delete this tag"
      >
      </b-taginput>
    </b-field>
    <b-field label="Description">
      <b-input
        v-model="description"
        @input="addDocStuff({ description })"
        type="textarea"
        id="description"
        cols="30"
        rows="5"
        maxlength="350"
      ></b-input>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      name: "",
      category: "",
      tags: [],
      description: "",
    };
  },
  methods: {
    addDocStuff(data) {
      if (data) {
        const doc = {
          name: this.name,
          description: this.description,
          category: this.category,
          tags: this.tags,
        };
        this.$store.commit("doc/add", doc);
      }
    },
  },
};
</script>

<style lang="scss"	>
.details-section {
  .details-header {
    label {
      color: #7a7a7a;
      margin-top: 13px;
    }
  }
}
</style>
