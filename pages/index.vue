<template>
  <section>
    <NavBar :homepage="true" />
    <section class="main">
      <div class="container">
        <div class="columns homepage is-gapless">
          <div class="column is-half-desktop">
            <h1 class="primary-headline">
              Sign, collaboarate and prove authenticity of your documents and
              emails easily
            </h1>
            <p>
              Eliminate document forgery and verify document authenticity with
              smart document stamping to prove time, date and location of the
              uploaded document. Share document details with your organization
              or send your documents for verification by others.
            </p>
            <a href="/start-screen"
              ><b-button class="start-now-button" type="is-primary"
                >Start now</b-button
              ></a
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
          <section class="columns signature-section is-gapless">
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
        <section class="columns audit-section is-gapless">
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
        <section class="columns collaboration-section is-gapless">
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
        <section class="columns email-section is-gapless">
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
          <p class="courtroom-paragraph has-text-centered">
            Using Docical can help you prove the authenticity of your documents
            by allowing your to share a link to a version of your document that
            can be verified based on its audit trail
          </p>
        </div>
      </section>
      <section class="screenshots">
        <section class="container">
          <h2 class="creative-title has-text-centered">
            Creative ways to manage your documents and emails
          </h2>
          <div class="columns is-gapless">
            <div class="iphone column is-one-third">
              <img
                class="iphone-image"
                src="/images/docical-homepage-screen.png"
                alt="Docical phone screenshot"
              />
            </div>
            <div class="macbook column">
              <img
                class="macbook-image"
                src="/images/macbook-screenshot.png"
                alt="MacBook screenshot"
              />
            </div>
            <div class="upload-description column">
              <ul>
                <li>You can use the easy file uploader, or</li>
                <li>Email your documents in and</li>
                <li>
                  Create a record of your email and anyone who emails you with
                  Docical cc'd
                </li>
              </ul>
            </div>
          </div>
        </section>
      </section>
      <section class="multi-display-section">
        <section class="container">
          <div class="multi-display-division columns is-centered is-gapless">
            <div class="column">
              <img
                class="upload-image"
                src="/images/upload-button.png"
                alt="Upload files button"
              />
              <p class="stamp-paragraph has-text-centered">
                Using Docical can help you prove the authenticity of your
                documents by allowing your to share a link to a version of your
                document that can be verified based on its audit trail
              </p>
            </div>
            <div class="column">
              <img
                class="stamp-image"
                src="/images/Symbol.png"
                alt="Courtroom document"
              />
              <p class="courtroom-paragraph has-text-centered">
                Using Docical can help you prove the authenticity of your
                documents by allowing your to share a link to a version of your
                document that can be verified based on its audit trail
              </p>
            </div>
            <div class="column">
              <img
                class="check-image"
                src="/images/check.png"
                alt="Email check"
              />
              <p class="check-paragraph has-text-centered">
                Using Docical can help you prove the authenticity of your
                documents by allowing your to share a link to a version of your
                document that can be verified based on its audit trail
              </p>
            </div>
          </div>
        </section>
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
    margin: 0 auto;
  }

  .iphone {
    height: 400px;
    display: flex;
    justify-content: center;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  .macbook {
    height: 400px;
    display: flex;

    img {
      height: 100%;
      object-fit: contain;
    }
  }

  .screenshots {
    margin-top: 5%;
    background-color: lightgrey;
  }

  .creative-title {
    padding-top: 3rem;
  }

  .upload-description {
    display: flex;
    align-items: center;

    li {
      margin: 20px 0;
    }
  }

  .multi-display-section {
    margin-top: 5rem;

    .column {
      display: flex;
      flex-direction: column;
    }

    img {
      display: flex;
      width: 40%;
      margin: 0 auto;
    }

    p {
      width: 100%;
    }
  }
}
</style>
