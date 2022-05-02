<template>
  <section class="container">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add your signature to the document</p>
      </header>
      <section class="modal-card-body columns is-multiline">
        <SignatureSideBar />
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
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
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
      numPages: null,
      heights: [],
      errors: [],
      scale: 1.38,
      src: "",
      pages: null,
      response: "",
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
        }, 2000);
      }
    },
  },
  mounted() {
    this.downloadVersion(this.version.data._id);
  },
  methods: {
    getCoordinates() {
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
      //   const existingPdfBytes = await fetch(url).then((res) =>
      //     res.arrayBuffer()
      //   );
      //   const pdfDoc = await PDFDocument.load(existingPdfBytes);
      // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      //   console.log("Respone", this.response);
      //   const pdfDoc = await PDFDocument.load(this.response);
      //   this.pages = pdfDoc.getPages();
      //   this.numPages = this.pages.length;
      //   for (let i = 0; i < this.numPages; i++) {
      //     const { height } = this.pages[i].getSize();
      //     this.heights[i] = height;
      //     console.log("asdad");
      //   }
      //   this.numPages[0].drawText("This text was added with JavaScript!", {
      //     x: 5,
      //     y: height / 2 + 300,
      //     size: 50,
      //     font: helveticaFont,
      //     color: rgb(0.95, 0.1, 0.1),
      //     rotate: degrees(-45),
      //   });
      //   const pdfBytes = await pdfDoc.save();
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
