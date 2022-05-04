<template>
  <section class="container">
    <div class="modal-card columns is-centered" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add your signature</p>
      </header>
      <b-steps
        v-model="activeStep"
        :animated="isAnimated"
        :rounded="isRounded"
        :has-navigation="hasNavigation"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        :label-position="labelPosition"
        :mobile-mode="mobileMode"
      >
        <b-step-item step="1" label="Signature" :clickable="true">
          <SignaturePad />
        </b-step-item>

        <b-step-item step="2" label="Add to Document">
          <section class="modal-card-body columns is-multiline">
            <div
              class="viewer column is-full-desktop is-tablet is-mobile"
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
              >
                <template slot="loading"> loading content here... </template>
              </pdf-viewer>
            </div>
          </section>
        </b-step-item>

        <template v-if="customNavigation" #navigation="{ previous, next }">
          <b-button
            outlined
            type="is-danger"
            icon-pack="fas"
            icon-left="backward"
            :disabled="previous.disabled"
            @click.prevent="previous.action"
          >
            Previous
          </b-button>
          <b-button
            outlined
            type="is-success"
            icon-pack="fas"
            icon-right="forward"
            :disabled="next.disabled"
            @click.prevent="next.action"
          >
            Next
          </b-button>
        </template>
      </b-steps>
    </div>
  </section>
</template>

<script>
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SignaturePad from "@/components/signing/SignaturePad.vue";
export default {
  name: "SignatureModal",
  components: {
    SignatureSideBar,
    SignaturePad,
  },
  props: ["version"],
  data() {
    return {
      page: 1,
      numPages: null,
      heights: [],
      errors: [],
      scale: 1.38,
      src: "",
      pages: null,
      response: "",
      showSignaturePad: false,
    };
  },
  watch: {
    src() {
      if (this.src) {
        setTimeout(() => {
          //set up the canvas and context
          var canvas = document.getElementsByClassName("page");

          //report the mouse position on click
          for (let i = 0; i < canvas.length; i++) {
            canvas[i].addEventListener(
              "click",
              async function (evt) {
                var mousePos = getMousePos(canvas[i], evt);
                alert(mousePos.x + "," + mousePos.y);
                const pngImageBytes = await fetch(pngUrl).then((res) =>
                  res.arrayBuffer()
                );
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
        }, 2000);
      }
    },
  },
  mounted() {
    this.downloadVersion(this.version.data._id);
  },
  methods: {
    showSignaturePadNow() {
      this.showSignaturePad = true;
    },
    async downloadVersion(id) {
      const vm = this;
      const request_config = {
        responseType: "arraybuffer",
      };
      this.$axios
        .$post(
          `${this.$config.app.backend_URL}/api/doc_versions/remoteFile/${id}`,
          {
            user_id: this.$auth.user._id,
          },
          request_config
        )
        .then(async (response) => {
          this.response = response;
          const file = new Blob([response], { type: "application/pdf" });
          vm.src = URL.createObjectURL(file);

          const pdfDoc = await PDFDocument.load(response);

          this.pages = pdfDoc.getPages();
          this.numPages = this.pages.length;
          for (let i = 0; i < this.numPages; i++) {
            const { height } = this.pages[i].getSize();
            this.heights[i] = height;
          }
        });
    },
    async modifyPdf() {
      //   const pngImageBytes = await fetch().then((res) =>
      //     res.arrayBuffer()
      //   );
    },
  },
};
</script>
<style lang="scss">
canvas {
  border: 1px solid grey;
}
.modal-close.is-large {
  background-color: black;
}
.modal-card {
  overflow-y: scroll;

  .b-steps {
    overflow-y: scroll;
    margin-top: 30px;
  }
}
.page {
  margin: 0 auto;
}
</style>
<style lang="scss" scoped>
.modal-card {
  background-color: #fff;
  height: 100%;
}
</style>
