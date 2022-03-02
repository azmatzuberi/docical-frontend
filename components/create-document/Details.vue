<template>
  <section>
    <b-field label="Document Name">
      <b-input v-model="name"></b-input>
    </b-field>
    <b-field label="Category">
      <b-input v-model="category"></b-input>
    </b-field>
    <b-field label="Add Tags">
      <b-taginput
        v-model="tags"
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
};
</script>

<style>
</style>
