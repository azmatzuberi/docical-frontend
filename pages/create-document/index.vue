<template>
  <section>
    <NavBar page="start-screen" />
    <section class="create-docs-main">
      <div class="container">
        <div class="columns column">
          <div class="column is-3-desktop is-4-tablet">
            <SideBar />
          </div>
          <div class="column is-half-desktop">
            <Steps />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/start-screen/SideBar.vue";
import Steps from "@/components/create-document/Steps.vue";
export default {
  name: "CreateDocumentPage",
  components: {
    NavBar,
    SideBar,
    Steps,
  },
};
</script>

<style lang="scss">
.create-docs-main {
  .columns.is-multiline {
    margin-top: 13px;
  }

  @media (max-width: 820px) {
    .columns {
      padding-right: 0;
      margin-right: 0;
      padding-left: 0;
      margin-left: 0;
    }
  }
}
</style>
