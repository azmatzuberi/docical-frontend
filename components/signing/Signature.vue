<template>
  <section class="container">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add your signature to the document</p>
      </header>
      <section class="modal-card-body columns is-multiline">
        <SignatureSideBar />
        <div
          class="viewer column is-three-quarters-desktop is-full-tablet"
          v-if="src"
        >
          <pdf-viewer
            :src="src"
            v-for="i in numPages"
            :key="i"
            :id="i"
            :page="i"
            :scale.sync="scale"
            :annotation="true"
            :resize="false"
            @click="getCoordinates"
          >
            <template slot="loading"> loading content here... </template>
          </pdf-viewer>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import SignatureSideBar from "~/components/signing/SignatureSideBar.vue";
export default {
  name: "SignatureModal",
  components: {
    SignatureSideBar,
  },
  props: ["version"],
  data() {
    return {
      page: 1,
      numPages: 2,
      errors: [],
      scale: "page-width",
      src: "",
    };
  },
  watch: {
    src() {
      if (this.src) {
        setTimeout(() => {
          //set up the canvas and context
          var canvas = document.getElementsByClassName("page");
          console.log(canvas);

          //report the mouse position on click

          for (let i = 0; i < canvas.length; i++) {
            canvas[i].addEventListener(
              "click",
              function (evt) {
                var mousePos = getMousePos(canvas[i], evt);
                alert(mousePos.x + "," + mousePos.y);
              },
              false
            );
          }
          //Get Mouse Position
          function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top,
            };
          }
        }, 3000);
      }
    },
  },
  mounted() {
    this.downloadVersion(this.version.data._id);
  },
  methods: {
    getCoordinates() {
      console.log("Asd");
      var mousePos = this.getMousePos(canvas[0], evt);
      alert(mousePos.x + "," + mousePos.y);
    },
    getMousePos(canvas, evt) {
      var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    },
    async downloadVersion(id) {
      const vm = this;
      const request_config = {
        responseType: "arraybuffer",
        responseEncoding: "binary",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/doc_versions/remoteFile/${id}`,
          {
            user_id: this.$auth.user._id,
          },
          request_config
        )
        .then((response) => {
          const file = new Blob([response], { type: "application/pdf" });
          vm.src = URL.createObjectURL(file);
          // window.open(vm.src);
        });
    },
  },
};
</script>
<style lang="scss">
canvas {
  border: 1px solid grey;
}
</style>
<style lang="scss" scoped>
.modal-card {
  .panel {
    width: 10rem;
    height: 100%;
  }
}
</style>
