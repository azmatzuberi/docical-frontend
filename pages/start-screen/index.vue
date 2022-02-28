<template>
  <section>
    <NavBar />
    <section class="main">
      <div class="container">
        <div class="columns start-screen">
          <div class="column is-one-quarter-desktop">
            <SideBar start-screen="startScreen" />
          </div>
          <div class="column">
            <ButtonCard
              title="Create Document"
              icon="folder-plus-outline"
              link="/create-document"
            />
          </div>
          <div class="column">
            <ButtonCard
              title="View Secured Documents"
              icon="folder-open-outline"
              link="/open-document"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/start-screen/SideBar.vue'
import ButtonCard from '@/components/start-screen/ButtonCard.vue'
export default {
  name: 'StartPage',
  components: {
    NavBar,
    SideBar,
    ButtonCard,
  },
}
</script>
<style lang="scss" scoped>
.main {
  .columns.homepage {
    margin-top: 4rem;
  }
  .primary-headline {
    font-size: 4rem;
    font-weight: 400;
  }

  p {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  .start-now-button {
    font-size: 16px;
    height: 48px;
    width: 130px;
    font-weight: 700;
    margin-bottom: 60px;
  }

  .middle-image {
    width: 100%;
    height: 500px;
    background-image: url('/images/office-documents.jpg');
  }
}
</style>
