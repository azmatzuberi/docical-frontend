<template>
  <section>
    <NavBar />
    <section class="main">
      <div class="container">
        <div class="columns homepage">
          <div class="column is-half-desktop">
            <h1 class="primary-headline">
              Easily prove authenticity of your documents through a certified
              history
            </h1>
            <p>
              Eliminate document forgery and verify document authenticity with
              smart document certification for any type of document or email.
              Elminate signature forgery with timestamps and document records.
            </p>
            <b-button class="start-now-button" type="is-primary"
              >Start now</b-button
            >
          </div>
          <div class="column is-half-desktop">
            <img src="/images/hero.png" alt="Hero verified document" />
          </div>
        </div>
      </div>
      <section class="middle-image"></section>
    </section>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'IndexPage',
  components: {
    NavBar,
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
