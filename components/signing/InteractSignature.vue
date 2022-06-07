<template>
  <interact
    :draggable="draggable"
    :dragOption="dragOption"
    :resizeOption="resizeOption"
    class="resize-drag"
    :style="style"
    @dragmove="dragmove"
    @resizemove="resizemove"
    :gesturable="gesturable"
  >
    <img class="signature" :src="signature" />
  </interact>
</template>

<script>
import interact from "interactjs";
import { mapGetters } from "vuex";
export default {
  name: "InteractSignature",
  props: ["x", "y", "factor"],
  data() {
    return {
      resizeOption: {
        edges: { left: false, right: false, bottom: false, top: false },
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
      w: 200 * (this.factor > 1 ? this.factor - 1 : 1),
      h: 200 * (this.factor > 1 ? this.factor - 1 : 1),
      xComp: this.x ? this.x : 0,
      yComp: this.y ? this.y : 0,
      draggable: true,
      gesturable: true,
    };
  },
  computed: {
    ...mapGetters({
      signature: "signature/get",
    }),
    style() {
      const locations = {
        x: this.xComp,
        y: this.yComp,
        h: this.h,
        w: this.w,
      };
      this.$store.commit("signature/addLocations", locations);
      return {
        height: `${this.h}px`,
        width: `${this.w}px`,
        transform: `translate(${this.x === this.x ? this.xComp : this.x}px, ${
          this.y === this.y ? this.yComp : this.y
        }px)`,
      };
    },
  },
  methods: {
    dragmove(event) {
      this.xComp += event.dx;
      this.yComp += event.dy;
    },
    resizemove(event) {
      this.w = event.rect.width;
      this.h = event.rect.height;

      this.xComp += event.deltaRect.left;
      this.yComp += event.deltaRect.top;
    },
  },
};
</script>

<style scoped lang="scss">
.resize-drag {
  .signature {
    box-sizing: border-box;
    border: 1px dotted grey;
  }

  /* To prevent interact.js warnings */
  user-select: none;
  -ms-touch-action: none;
  touch-action: none;
}
</style>
