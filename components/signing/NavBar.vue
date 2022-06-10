<template>
  <section>
    <b-button @click="writePdf">Sign PDF</b-button>
    <b-button @click="zoomOut">Zoom out</b-button>
  </section>
</template>

<script>
export default {
  name: "SignatureNavBar",
  methods: {
    writePdf() {
      this.$emit("writePdf", true);
    },
    zoomOut() {
      this.$emit("zoomOut", true);
    },
  },
};
</script>

<style>
</style>
