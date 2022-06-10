<template>
  <section>
    <NavBar :homepage="true" />
    <section class="main">
      <div class="container">
        <div class="columns homepage">
          <div class="column is-full">
            <h1 class="primary-headline has-text-centered">
              It's nice to get free things, isn't it? Our free plan is for you
            </h1>
            <p class="has-text-centered">
              We like to keep it convenient for you. You can upload up to 1000
              documents/emails/versions absolutely free.
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
        <section class="plans columns is-centered">
          <div
            class="
              column
              is-one-third-desktop
              pay-per-use
              plan
              has-text-centered
            "
          >
            <h2>Free</h2>
            <b-button>Get started</b-button>
            <p>1000 doc/email uploads</p>
            <p>Unlimited E-signing</p>
            <p>Document files</p>
            <p>Emails</p>
          </div>
          <!-- <div
            class="column is-one-third-desktop plan highlight has-text-centered"
            style="margin-top: -60px"
          >
            <div class="most-popular has-text-centered column">
              MOST POPULAR
            </div>
            <div class="business">
              <h3>Business</h3>
              <h2>$15/month</h2>
              <span class="usd">USD</span>
              <b-button type="is-primary">Get started</b-button>
              <p>50,000 doc/email uploads</p>
              <p>Unlimited E-signing</p>
              <p>Document files</p>
              <p>Emails</p>
            </div>
          </div>
          <div
            class="
              column
              is-one-third-desktop
              enterprise
              plan
              has-text-centered
              is-medium
            "
          >
            <h3>Enterprise</h3>
            <h2>$45/month</h2>
            <span class="usd">USD</span>
            <b-button>Get started</b-button>
            <p>1 million doc/email uploads</p>
            <p>$0.85/upload after 1 million uploads</p>
            <p>Unlimited E-signing</p>
            <p>Document files</p>
            <p>Emails</p>
          </div> -->
        </section>
        <b-carousel
          class="carousel-block column"
          :autoplay="false"
          :arrow="arrow"
          :repeat="arrowBoth"
          :arrow-hover="arrowHover"
        >
          <b-carousel-item>
            <section class="hero">
              <div
                class="
                  column
                  is-one-third-desktop
                  pay-per-use
                  plan
                  has-text-centered
                  hero-body
                  is-medium
                "
              >
                <h2>Free</h2>
                <b-button>Get started</b-button>
                <p>1000 doc/email uploads</p>
                <p>Unlimited E-signing</p>
                <p>Document files</p>
                <p>Emails</p>
              </div>
            </section>
          </b-carousel-item>
          <!-- <b-carousel-item>
            <section class="hero">
              <div
                class="
                  column
                  is-one-third-desktop
                  plan
                  highlight
                  has-text-centered
                  hero--body
                  is-medium
                "
              >
                <div class="most-popular has-text-centered">MOST POPULAR</div>
                <div class="business">
                  <h3>Business</h3>
                  <h2>$15/month</h2>
                  <span class="usd">USD</span>
                  <b-button type="is-primary">Get started</b-button>
                  <p>3 free docs per month</p>
                  <p>100 docs/month</p>
                  <p>Unlimited E-signing</p>
                  <p>Document files</p>
                  <p>Emails</p>
                  <p>SMS</p>
                </div>
              </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero">
              <div
                class="
                  column
                  is-one-third-desktop
                  enterprise
                  plan
                  has-text-centered
                  hero-body
                "
              >
                <h3>Enterprise</h3>
                <h2>$45/month</h2>
                <span class="usd">USD</span>
                <b-button>Get started</b-button>
                <p>1 million doc/email uploads</p>
                <p>Unlimited E-signing</p>
                <p>Document files</p>
                <p>Emails</p>
              </div>
            </section>
          </b-carousel-item> -->
        </b-carousel>
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
  data() {
    return {
      arrow: true,
      arrowBoth: true,
      arrowHover: false,
    };
  },
};
</script>
<style lang="scss">
.carousel-indicator {
  width: 94% !important;
}
</style>
<style lang="scss" scoped>
.main {
  .columns.homepage {
    margin-top: 4rem;
    margin-right: 0;
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
    display: inline-block;
  }

  span.usd {
    font-size: 0.7rem;
    font-weight: 700;
  }

  .button {
    display: block;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    .highlight,
    .plan,
    .plans,
    .feature-set {
      padding: 0;
      width: 100%;
      margin: 0;
    }

    .column.is-full {
      padding-right: 0;
    }

    .plans {
      display: none;
    }
  }

  @media (min-width: 768px) {
    .carousel {
      display: none;
    }

    .plans {
      width: 100%;
      padding: 0;
      margin: 65px 0;
    }
  }
}
</style>
