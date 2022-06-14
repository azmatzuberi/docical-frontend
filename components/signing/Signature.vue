<template>
  <section class="container">
    <NavBar @writePdf="writePdf()" @zoomOut="zoomOut = true" />
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
        <b-step-item id="sigPad" step="1" label="Signature" :clickable="true">
          <SignaturePad />
        </b-step-item>

        <b-step-item step="2" label="Add to Document">
          <InteractSignature
            v-if="showSignatureImage === true"
            :x="x"
            :y="y"
            :factor="factor"
          />
          <section class="modal-card-body columns is-multiline" v-if="src">
            <div
              class="viewer column is-full-desktop is-tablet is-mobile"
              v-for="i in numPages"
              :key="i"
              @click="insertSignature($event, i)"
            >
              <pdf-viewer
                :class="{ zoomOut: zoomOut }"
                class="pdf-viewer-component"
                :src="src"
                :key="i"
                :id="i"
                :page="i"
                :scale="scale"
                :annotation="true"
                :resize="true"
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
import { PDFDocument } from "pdf-lib";
import SignaturePad from "@/components/signing/SignaturePad.vue";
import InteractSignature from "@/components/signing/InteractSignature.vue";
import NavBar from "@/components/signing/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "SignatureModal",
  components: {
    SignaturePad,
    InteractSignature,
    NavBar,
  },
  props: ["version", "email"],
  data() {
    return {
      page: 1,
      numPages: null,
      heights: [],
      errors: [],
      scale: "page-width",
      src: "",
      pages: null,
      response: "",
      showSignaturePad: false,
      showSignatureImage: false,
      interacts: 1,
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
      x: 200,
      y: 200,
      sumHeight: 0,
      zoomOut: true,
    };
  },
  computed: {
    ...mapGetters({
      signature: "signature/get",
      locations: "signature/getLocations",
    }),
    factor() {
      const result =
        window.innerWidth < 1271 ? window.innerWidth / 1271 + 1 : 1;
      return result;
    },
  },
  mounted() {
    this.downloadVersion(this.version.data._id);
  },
  methods: {
    getMousePos(canvas, evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    },
    insertSignature(evt, i) {
      const vm = this;
      const canvas = document.getElementsByClassName("page");
      let mousePos = this.getMousePos(canvas[i], evt);
      for (let j = 0; j < i; j++) {
        vm.sumHeight += canvas[j].offsetHeight;
      }
      this.x = mousePos.x;
      this.y = mousePos.y + vm.sumHeight;
      vm.showSignatureImage = true;
      vm.sumHeight = 0;
      this.zoomOut = false;
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
          `${this.$config.app.backend_URL}/api/${
            this.email ? "email_versions" : "doc_versions"
          }/remoteFile/${id}`,
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
    async writePdf() {
      const url = this.src;
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      const pngUrl = this.signature;
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pngImageBytes = await fetch(pngUrl).then((res) =>
        res.arrayBuffer()
      );
      let canvasHeights = [];
      let breakPoints = [];
      let targetPage = 0;

      // Get Page elements to get heights and breakpoints
      const canvas = document.getElementsByClassName("page");
      for (let i = 0; i < canvas.length; i++) {
        canvasHeights[i] = canvas[i].offsetHeight;
        breakPoints[i] = {
          start: canvasHeights[i]++,
          end: canvasHeights[i] + 24,
        };
      }

      // Find target page through filtering and add 1 to increase the page number
      for (let j = 0; j < canvas.length; j++) {
        if (
          this.locations.y > breakPoints[j].start &&
          this.locations.y < breakPoints[j + 1].end
        ) {
          targetPage = j + 1;
        }
      }

      // Total sum height of all canvases (pages) until the target page
      let sumHeightOfPages = 0;
      for (let k = 0; k < targetPage; k++) {
        sumHeightOfPages += canvasHeights[k];
        if (breakPoints[k].start && breakPoints[k].end) sumHeightOfPages - 24;
      }

      // Get target page height and width
      // X will always be the same and Y will be relative including height of previous pages
      const canvasY = canvas[targetPage].offsetHeight;
      const canvasX = canvas[targetPage].offsetWidth;
      let yOfMouse;
      if (targetPage > 1) yOfMouse = this.locations.y - sumHeightOfPages;
      console.log("X", this.locations.x);
      console.log("Y", this.locations.y);
      console.log("Canvas Height", canvasY);
      console.log("Canvas Width", canvasX);
      console.log("Factor", this.factor);
      let xCalculated;
      let yCalculated;
      if (window.innerWidth < 901) {
        xCalculated = (this.locations.x + 55) / 1.78;
        yCalculated = yOfMouse
          ? (canvasY - yOfMouse - 60) / 1.78
          : (canvasY - this.locations.y - 60) / 1.78;
      } else if (window.innerWidth > 900) {
        xCalculated = (this.locations.x - 20) / 2.08;
        yCalculated = yOfMouse
          ? (canvasY - yOfMouse - 138) / 2.08
          : (canvasY - this.locations.y - 138) / 2.08;
      }
      console.log("XCalc", xCalculated);
      console.log("YCalc", yCalculated);
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDims =
        this.factor > 1 ? pngImage.scale(0.075) : pngImage.scale(0.075);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      console.log("PDF width", width);
      console.log("PDF height", height);
      console.log("Sig width", pngDims.width);
      console.log("Sig height", pngDims.height);
      let count = 0;
      // for (let i = 0; i < 11; i++) {
      //   firstPage.drawImage(pngImage, {
      //     x: count,
      //     y: count,
      //     width: pngDims.width,
      //     height: pngDims.height,
      //     scale: pngDims,
      //   });
      //   count = i * 100;
      // }
      firstPage.drawImage(pngImage, {
        x: xCalculated,
        y: yCalculated,
        width: pngDims.width,
        height: pngDims.height,
        scale: pngDims,
      });

      const pdfBytes = await pdfDoc.save();
      const file = new Blob([pdfBytes], { type: "application/pdf" });
      this.src = null;
      setTimeout(() => {
        this.src = URL.createObjectURL(file);
      }, 500);
    },
  },
};
</script>
<style lang="scss">
canvas {
  border: 1px solid grey;
}
.viewer canvas {
  -webkit-box-shadow: -14px -15px 15px -11px #000000;
  box-shadow: -14px -15px 15px -11px #000000;
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

  .step-navigation {
    margin-bottom: 35px;
  }

  @media (max-width: 900px) {
    .pdf-viewer-component {
      width: 900px;
    }
  }
  @media (min-width: 901px) {
    .pdf-viewer-component {
      width: 1271px;
    }
  }
  .zoomOut {
    width: auto;
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
}
</style>
