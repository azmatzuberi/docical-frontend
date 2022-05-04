<template>
  <section
    class="signature-pad column is-half-desktop is-half-tablet is-full-mobile"
  >
    <div id="app">
      <VueSignaturePad
        width="500px"
        height="500px"
        style="margin: 0 auto"
        ref="signaturePad"
      />
      <div class="signature-pad-buttons">
        <b-button @click="save">Save</b-button>
        <b-button @click="undo">Undo</b-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SignaturePad",
  props: ["version"],
  data() {
    return {};
  },
  mounted() {
    // const canvas = document.querySelector("canvas");
    // const signaturePad = new SignaturePad(canvas);
    // signaturePad.toDataURL();
  },
  methods: {
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      // console.log(data);
      this.$store.commit("signature/add", data);
    },
    undo() {
      this.$refs.signaturePad.undoSignature();
    },
  },
};
</script>
<style lang="scss">
.signature-pad {
  margin: 0 auto;
  .app {
    div {
      margin: 0 auto;
    }
  }
  .signature-pad-buttons {
    display: flex;
    justify-content: center;
  }
}
</style>
