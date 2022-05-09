<template>
  <b-navbar>
    <template #start>
      <b-navbar-item @click="writePdf()"> Sign PDF </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div"> </b-navbar-item>
    </template>
  </b-navbar>
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
