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
          <InteractSignature
            v-if="showSignatureImage === true"
            :id="'interact-' + index"
            v-for="(interact, index) in interacts"
            :key="index"
            :x="x[index]"
            :y="y[index]"
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
import InteractSignature from "@/components/signing/InteractSignature.vue";
export default {
  name: "SignatureModal",
  components: {
    SignaturePad,
    InteractSignature,
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
    };
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
      const mousePos = this.getMousePos(canvas[i], evt);
      for (let k = 0; k < this.interacts; k++) {
        if (i > 0) {
          for (let j = 0; j < i; j++) {
            vm.sumHeight += canvas[j].offsetHeight;
          }
        }
        this.x[k] = mousePos.x;
        this.y[k] = mousePos.y + vm.sumHeight;
        vm.showSignatureImage = true;
      }
      vm.sumHeight = 0;
      this.addSignatureComponent();
    },
    addSignatureComponent() {
      const vm = this;
      this.$buefy.snackbar.open({
        indefinite: true,
        onAction: () => {
          this.interacts++;
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

  .resize-drag {
    box-sizing: border-box;
    border: 1px dotted grey;

    /* To prevent interact.js warnings */
    user-select: none;
    -ms-touch-action: none;
    touch-action: none;
  }
}
</style>
