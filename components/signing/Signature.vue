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
        <b-step-item step="1" label="Signature" :clickable="true">
          <SignaturePad />
        </b-step-item>

        <b-step-item step="2" label="Add to Document">
          <h3 class="has-text-centered" v-if="numPages > 0">
            <a :href="'#' + (numPages - 1)" v-smooth-scroll
              >Scroll down<b-icon icon="arrow-down"></b-icon
            ></a>
          </h3>
          <interact
            v-if="signature && showSignatureImage"
            draggable
            :dragOption="dragOption"
            resizable
            :resizeOption="resizeOption"
            class="resize-drag"
            :style="style"
            @dragmove="dragmove"
            @resizemove="resizemove"
          >
            <img id="signature" :src="signature" />
          </interact>
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
      </b-steps>
    </div>
  </section>
</template>

<script>
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import SignaturePad from "@/components/signing/SignaturePad.vue";
import interact from "interactjs";
import { mapGetters } from "vuex";
export default {
  name: "SignatureModal",
  components: {
    SignaturePad,
  },
  props: ["version"],
  data() {
    return {
      page: this.numPages - 1,
      numPages: null,
      heights: [],
      errors: [],
      scale: 1.38,
      src: "",
      pages: null,
      response: "",
      showSignaturePad: false,
      showSignatureImage: false,
      resizeOption: {
        edges: { left: true, right: true, bottom: true, top: true },
      },
      dragOption: {
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
      },
      // values for interact.js transformation
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      activeStep: 0,
      showSocial: false,
      isAnimated: true,
      isRounded: true,
      isStepsClickable: false,
      hasNavigation: true,
      customNavigation: false,
      isProfileSuccess: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right",
      labelPosition: "bottom",
      mobileMode: "minimalist",
    };
  },
  computed: {
    ...mapGetters({
      signature: "signature/get",
    }),
    style() {
      return {
        height: `${this.h}px`,
        width: `${this.w}px`,
        transform: `translate(${this.x}px, ${this.y}px)`,
      };
    },
  },
  watch: {
    src() {
      const vm = this;
      let mousePos = null;
      if (this.src) {
        setTimeout(() => {
          //set up the canvas and context
          const canvas = document.getElementsByClassName("page");
          //report the mouse position on click
          for (let i = 0; i < canvas.length; i++) {
            canvas[i].addEventListener(
              "click",
              async function (evt) {
                mousePos = getMousePos(canvas[i], evt);
                // alert(mousePos.x + "," + mousePos.y);
                vm.x = mousePos.x;
                let sumHeight = 0;
                if (i > 0) {
                  for (let j = 0; j < i; j++) {
                    sumHeight += canvas[j].offsetHeight;
                  }
                }
                vm.y = mousePos.y - 100 + sumHeight;
                vm.showSignatureImage = true;
                const pngImageBytes = await fetch(pngUrl).then((res) =>
                  res.arrayBuffer()
                );
              },
              false
            );
          }

          for (let i = 0; i < canvas.length; i++) {
            canvas[i].addEventListener(
              "touchstart",
              async function (e) {
                const evt =
                  typeof e.originalEvent === "undefined" ? e : e.originalEvent;
                const touch = evt.touches[0] || evt.changedTouches[0];
                const x = touch.pageX;
                const y = touch.pageY;
                // alert(x + "," + y);
                vm.x = x - 100;
                let sumHeight = 0;
                if (i > 0) {
                  for (let j = 0; j < i; j++) {
                    sumHeight += canvas[j].offsetHeight;
                  }
                }
                vm.y = y + sumHeight;
                vm.showSignatureImage = true;
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
    dragmove(event) {
      this.x += event.dx;
      this.y += event.dy;
      const elementStyle = document.getElementsByClassName("interact");
      console.log(elementStyle);

      elementStyle[0].style.position = "absolute";
    },
    resizemove(event) {
      this.w = event.rect.width;
      this.h = event.rect.height;

      this.x += event.deltaRect.left;
      this.y += event.deltaRect.top;
    },
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
.interact {
  position: absolute;
  z-index: 100;
}
</style>
<style lang="scss" scoped>
.modal-card {
  background-color: #fff;
  height: 100%;

  resize-drag {
    box-sizing: border-box;
    background: #41b883;

    /* To prevent interact.js warnings */
    user-select: none;
    -ms-touch-action: none;
    touch-action: none;
  }
}
</style>
