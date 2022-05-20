<template>
  <section>
    <NavBar :homepage="true" />
    <section class="main">
      <div class="container">
        <div class="columns homepage">
          <div class="column is-full">
            <h1 class="primary-headline has-text-centered">
              Choose your package. Use free for 3 documents every month
            </h1>
            <p class="has-text-centered">
              We like to keep it convenient for you. You can choose a
              pay-per-use package or subscribe monthly for better rates.
            </p>
            <div class="feature-set columns is-centered">
              <div class="column">
                <b-icon
                  icon="record-circle-outline"
                  class="has-text-centered"
                  size="is-large"
                ></b-icon>
                <p class="has-text-centered">Record all your docs</p>
              </div>
              <div class="column">
                <b-icon
                  icon="signature-freehand"
                  class="has-text-centered"
                  size="is-large"
                  s
                ></b-icon>
                <p class="has-text-centered">Unlimited E-signing of docs</p>
              </div>
              <div class="column">
                <b-icon
                  icon="account-group-outline"
                  class="has-text-centered"
                  size="is-large"
                ></b-icon>
                <p class="has-text-centered">Collaborate on all your docs</p>
              </div>
            </div>
          </div>
        </div>
        <section class="plans columns">
          <div
            class="
              column
              is-one-third-desktop
              pay-per-use
              plan
              has-text-centered
            "
          >
            <h3>Pay-per-use</h3>
            <h2>$0.85/doc</h2>
            <b-button>Get started</b-button>
            <p>3 free docs per month</p>
            <p>Unlimited E-signing</p>
            <p>File docs</p>
            <p>Emails</p>
            <p>SMS</p>
          </div>
          <div
            class="column is-one-third-desktop plan highlight has-text-centered"
            style="margin-top: -60px"
          >
            <div class="most-popular has-text-centered">MOST POPULAR</div>
            <div class="business">
              <h3>Business</h3>
              <h2>$15/month</h2>
              <b-button type="is-primary">Get started</b-button>
              <p>3 free docs per month</p>
              <p>100 docs/month</p>
              <p>Unlimited E-signing</p>
              <p>File docs</p>
              <p>Emails</p>
              <p>SMS</p>
            </div>
          </div>
          <div
            class="
              column
              is-one-third-desktop
              enterprise
              plan
              has-text-centered
            "
          >
            <h3>Enterprise</h3>
            <h2>$45/month</h2>
            <b-button>Get started</b-button>
            <p>3 free docs per month</p>
            <p>Unlimited docs</p>
            <p>Unlimited E-signing</p>
            <p>File docs</p>
            <p>Emails</p>
            <p>SMS</p>
          </div>
        </section>
      </div>
      <section class="middle-image"></section>
    </section>
  </section>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "IndexPage",
  components: {
    NavBar,
  },
};
</script>
<style lang="scss" scoped>
.main {
  .columns.homepage {
    margin-top: 4rem;
  }
  .primary-headline {
    font-size: 2rem;
    font-weight: 500;
  }

  p {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  .icon {
    width: 100%;
  }

  .plans {
    margin-top: 65px;
  }
  .plan {
    border: 1px solid lightgrey;
  }

  .highlight {
    border: 1px solid#176cde;
  }
  .most-popular {
    background-color: #e7f0fe;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
    margin-bottom: 12px;
    color: #176cde;
    padding: 0;
  }

  h3 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    color: #176cde;
  }

  .button {
    margin: 10px 0 20px 0;
  }
}
</style>
