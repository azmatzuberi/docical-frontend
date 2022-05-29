<template>
  <b-button @click="writePdf">Sign PDF</b-button>
</template>

<script>
export default {
  name: "SignatureNavBar",
  methods: {
    writePdf() {
      this.$emit("writePdf", true);
    },
  },
};
</script>

<style>
</style>
