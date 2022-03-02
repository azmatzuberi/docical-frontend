<template>
  <section>
    <b-field label="Emails of Collaborators">
      <b-taginput
        v-model="emails"
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
      emails: [],
    };
  },
};
</script>

<style>
</style>
