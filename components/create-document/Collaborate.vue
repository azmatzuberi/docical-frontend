<template>
  <section>
    <b-field label="Emails of Collaborators">
      <b-taginput
        v-model="collaborators"
        @input="addDocStuff({ collaborators })"
        ellipsis
        icon="label"
        placeholder="Add email"
        aria-close-label="Delete this email"
        maxtags="10"
      >
      </b-taginput>
    </b-field>
  </section>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      collaborators: [],
    };
  },
  methods: {
    addDocStuff(data) {
      if (data) {
        const doc = {
          collaborators: this.collaborators,
        };
        this.$store.commit("doc/add", doc);
      }
    },
  },
};
</script>

<style>
</style>
