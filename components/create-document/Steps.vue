<template>
  <section>
    <b-steps
      v-if="window.width > 780"
      v-model="position"
      label-position="bottom"
      size="large"
      :clickable="true"
      vertical
    >
      <b-step-item
        step="1"
        label="Details"
        icon="text-box-outline"
        style="display: block"
        :clickable="true"
      >
        <Details />
      </b-step-item>
      <b-step-item
        step="2"
        label="Collaborate"
        icon="account-group"
        :clickable="true"
      >
        <Collaborate />
      </b-step-item>
      <b-step-item
        step="3"
        label="Upload"
        icon="cloud-upload-outline"
        :clickable="true"
        ><Upload />
      </b-step-item>
    </b-steps>
    <b-steps
      v-else
      v-model="position"
      label-position="bottom"
      size="large"
      :clickable="true"
      horizontal
    >
      <b-step-item
        step="1"
        label="Details"
        icon="text-box-outline"
        style="display: block"
        :clickable="true"
      >
        <Details />
      </b-step-item>
      <b-step-item
        step="2"
        label="Collaborate"
        icon="account-group"
        :clickable="true"
      >
        <Collaborate />
      </b-step-item>
      <b-step-item
        step="3"
        label="Upload"
        icon="cloud-upload-outline"
        :clickable="true"
        ><Upload />
      </b-step-item>
    </b-steps>
  </section>
</template>

<script>
import Upload from "@/components/create-document/Upload.vue";
import Details from "@/components/create-document/Details.vue";
import Collaborate from "@/components/create-document/Collaborate.vue";
export default {
  name: "Steps",
  components: {
    Upload,
    Details,
    Collaborate,
  },
  data() {
    return {
      position: 0,
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  computed: {
    align() {
      if (window) {
        return this.window.width > 780 ? "vertical" : "horizontal";
      }
    },
  },
  mounted() {
    if (window) {
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window) {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
      }
    },
  },
};
</script>

<style>
</style>
