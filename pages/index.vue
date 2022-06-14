<template>
  <section>
    <NavBar :homepage="true" />
    <section class="main">
      <div class="container">
        <div class="columns homepage">
          <div class="column is-half-desktop">
            <h1 class="primary-headline">
              Easily prove authenticity of your documents through a verified
              history
            </h1>
            <p>
              Eliminate document forgery and verify document authenticity with
              smart document stamping to prove time, date and location of the
              uploaded document. Share document details with your organization
              or verify with third-party/guest entities.
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
      <section class="container">
        <section class="container">
          <section class="columns signature-section">
            <div class="column">
              <img
                src="/images/signature-collage.png"
                alt="Ability to sign unlimited documents"
              />
            </div>
            <div class="column">
              <h2>Get unlimited e-signatures for any document or email</h2>
              <p>Filler text</p>
            </div>
          </section>
        </section>
        <section class="columns audit-section">
          <div class="column">
            <h2>Audit trails like never before...</h2>
            <p>Filler text</p>
          </div>
          <div class="column">
            <img src="/images/audit.png" alt="Audit trails" />
          </div>
        </section>
      </section>
      <section class="container">
        <section class="columns collaboration-section">
          <div class="column">
            <img
              src="/images/collaboration.png"
              alt="Collaborate on any document iteration"
            />
          </div>
          <div class="column">
            <h2>Collaborate on any version of any document or email</h2>
            <p>Filler text</p>
          </div>
        </section>
      </section>
      <section class="container">
        <section class="columns email-section">
          <div class="column">
            <h2>Email your documents to upload on the go</h2>
            <p>Filler text</p>
          </div>
          <div class="column">
            <img
              src="/images/email.jpg"
              alt="Email option to upload and get signed"
            />
          </div>
        </section>
      </section>
      <section class="container verified-section">
        <h2 class="verfied-title has-text-centered">
          Your documents can easily be proven authentic
        </h2>
        <div class="courtroom-division">
          <img
            class="courtroom-image"
            src="/images/court.png"
            alt="Courtroom document"
          />
          <p class="courtoom-paragraph">
            Using Docical can help you prove the authenticity of your documents
            by allowing your to share a link to a version of your document that
            can be verified based on its audit trail
          </p>
        </div>
      </section>
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
    background-image: url("/images/office-documents.jpg");
  }

  h2 {
    font-size: 2rem;
  }
  .audit-section,
  .signature-section,
  .collaboration-section,
  .email-section {
    margin-top: 3rem;
  }

  .courtroom-image {
    width: 60%;
    margin: 0 auto;
  }

  .courtroom-division {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .courtroom-paragraph {
    width: 60%;
    display: block;
  }
}
</style>
