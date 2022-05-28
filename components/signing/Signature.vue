<template>
  <section class="container">
    <NavBar @writePdf="writePdf()" />
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
            v-if="showSignatureImage[index] === true || run === 0"
            :id="'interact-' + index"
            v-for="(interact, index) in interacts"
            :key="index"
            :x="x[index]"
            :y="y[index]"
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
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
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
      scale: 1,
      src: "",
      pages: null,
      response: "",
      showSignaturePad: false,
      showSignatureImage: [false],
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
      x: [],
      y: [],
      sumHeight: 0,
      run: 1,
      htmlToPdfOptions: {
        margin: 0,

        filename: `hehehe.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        enableLinks: false,

        html2canvas: {
          scale: 1,
          useCORS: true,
        },

        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      signature: "signature/get",
      locations: "signature/getLocations",
    }),
    factor() {
      let result;
      if (window.innerWidth < 1271) result = 1271 / window.innerWidth;
      return result;
    },
  },
  mounted() {
    this.downloadVersion(this.version.data._id);
  },
  methods: {
    write2Pdf() {
      this.$refs.html2Pdf.generatePdf();
    },
    getMousePos(canvas, evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
      };
    },
    insertSignature(evt, i) {
      const vm = this;
      if (this.run === 1) {
        const canvas = document.getElementsByClassName("page");
        let mousePos = this.getMousePos(canvas[i], evt);
        for (let k = 0; k < this.interacts; k++) {
          if (i > 0) {
            for (let j = 0; j < i; j++) {
              vm.sumHeight += canvas[j].offsetHeight;
            }
          }
          this.x[k] = mousePos.x;
          this.y[k] = mousePos.y + vm.sumHeight;
          vm.showSignatureImage[k] = true;
          vm.sumHeight = 0;
        }
        this.run = 0;
      } else {
        this.run = 1;
        this.addSignatureComponent();
      }
    },
    addSignatureComponent() {
      const vm = this;
      this.$buefy.snackbar.open({
        indefinite: true,
        onAction: () => {
          vm.interacts++;
        },
        position: "is-top",
        message: "Would you like to add another signature?",
        cancelText: "No",
      });
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
      const canvas = document.getElementsByClassName("page");
      const firstCanvasY = canvas[0].offsetHeight;
      const firstCanvasX = canvas[0].offsetWidth;
      console.log("X", this.locations[0].x);
      console.log("Y", this.locations[0].y);
      console.log("Height", firstCanvasY);
      console.log("Width", firstCanvasX);
      const halfHeight = firstCanvasY / 2;
      const yPercent10 = 0.09 * firstCanvasY;
      const yPercent20 = 0.19 * firstCanvasY;
      const yPercent30 = 0.29 * firstCanvasY;
      const yPercent40 = 0.39 * firstCanvasY;
      const yPercent50 = 0.49 * firstCanvasY;
      const yPercent60 = 0.59 * firstCanvasY;
      const yPercent70 = 0.69 * firstCanvasY;
      const yPercent80 = 0.79 * firstCanvasY;
      const yPercent90 = 0.89 * firstCanvasY;
      let yCalculated = null;

      if (this.locations[0].y < yPercent10) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 + 54;
        console.log("10% - Y");
      } else if (
        this.locations[0].y < yPercent20 &&
        this.locations[0].y > yPercent10
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 + 54;
        console.log("20%  - Y");
      } else if (
        this.locations[0].y < yPercent30 &&
        this.locations[0].y > yPercent20
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 + 54;
        console.log("30%  - Y");
      } else if (
        this.locations[0].y < yPercent40 &&
        this.locations[0].y > yPercent30
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 + 26;
        console.log("40%  - Y");
      } else if (
        this.locations[0].y < yPercent50 &&
        this.locations[0].y > yPercent40
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 + 20;
        console.log("50%  - Y");
      } else if (
        this.locations[0].y < yPercent60 &&
        this.locations[0].y > yPercent50
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 - 10;
        console.log("60%  - Y");
      } else if (
        this.locations[0].y < yPercent70 &&
        this.locations[0].y > yPercent60
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 - 20;
        console.log("70%  - Y");
      } else if (
        this.locations[0].y < yPercent80 &&
        this.locations[0].y > yPercent70
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 - 30;
        console.log("80%  - Y");
      } else if (
        this.locations[0].y < yPercent90 &&
        this.locations[0].y > yPercent80
      ) {
        yCalculated = (firstCanvasY - this.locations[0].y) / 2.54 - 54;
        console.log("90%  - Y");
      } else if (this.locations[0].y > yPercent90) {
        console.log("100%  - Y");
      }

      const xPercent10 = 0.09 * firstCanvasX;
      const xPercent20 = 0.19 * firstCanvasX;
      const xPercent30 = 0.29 * firstCanvasX;
      const xPercent40 = 0.39 * firstCanvasX;
      const xPercent50 = 0.49 * firstCanvasX;
      const xPercent60 = 0.59 * firstCanvasX;
      const xPercent70 = 0.69 * firstCanvasX;
      const xPercent80 = 0.79 * firstCanvasX;
      const xPercent90 = 0.89 * firstCanvasX;
      let xCalculated = null;

      if (this.locations[0].x < xPercent10) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("10% - X");
      } else if (
        this.locations[0].x < xPercent20 &&
        this.locations[0].x > xPercent10
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 + 2;
        console.log("20%  - X");
      } else if (
        this.locations[0].x < xPercent30 &&
        this.locations[0].x > xPercent20
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 + 3;
        console.log("30%  - X");
      } else if (
        this.locations[0].x < xPercent40 &&
        this.locations[0].x > xPercent30
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 + 10;
        console.log("40%  - X");
      } else if (
        this.locations[0].x < xPercent50 &&
        this.locations[0].x > xPercent40
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("50%  - X");
      } else if (
        this.locations[0].x < xPercent60 &&
        this.locations[0].x > xPercent50
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("60%  - X");
      } else if (
        this.locations[0].x < xPercent70 &&
        this.locations[0].x > xPercent60
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("70%  - X");
      } else if (
        this.locations[0].x < xPercent80 &&
        this.locations[0].x > xPercent70
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("80%  - X");
      } else if (
        this.locations[0].x < xPercent90 &&
        this.locations[0].x > xPercent80
      ) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("90%  - X");
      } else if (this.locations[0].x > xPercent90) {
        xCalculated = (this.locations[0].x * 0.9) / 2.08 - 10;
        console.log("100%  - X");
      }

      console.log("YCalc", yCalculated);
      console.log("XCalc", xCalculated);
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDims = pngImage.scale(0);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      firstPage.drawImage(pngImage, {
        x: xCalculated,
        y: yCalculated,
        width: this.locations[0].w / 2.54,
        height: this.locations[0].h / 2.54,
      });

      const pdfBytes = await pdfDoc.save();
      const file = new Blob([pdfBytes], { type: "application/pdf" });
      this.src = null;
      setTimeout(() => {
        this.src = URL.createObjectURL(file);
      }, 2500);
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
