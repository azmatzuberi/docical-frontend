<template>
  <section class="navbar-section">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img src="/images/logo.png" alt="Docical logo" />
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item href="/"> Home </b-navbar-item>
        <b-navbar-item href="/pricing"> Pricing </b-navbar-item>
        <b-navbar-item href="#"> How it works </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#"> About </b-navbar-item>
          <b-navbar-item href="#"> Contact </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a v-if="$auth.loggedIn" @click="logout" class="button is-light">
              Log out
            </a>
            <a v-if="!$auth.loggedIn" href="/login" class="button is-light">
              Log in
            </a>
            <a v-if="!$auth.loggedIn" href="/signup" class="button is-primary">
              <strong>Start now</strong>
            </a>
            <a
              v-if="$auth.loggedIn && homepage"
              href="/start-screen"
              class="button is-primary"
              ><strong>Start now</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </section>
</template>

<script>
export default {
  name: "NavBar",
  props: ["homepage"],
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$nuxt.router.push("/");
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;400;500;600;700&display=swap");
h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
div,
section {
  font-family: "Manrope", sans-serif;
}
// Navbar
.navbar-section {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);

  .button {
    height: 48px;
    width: 105px;
  }

  .button.is-primary {
    width: 127px;
  }
}
</style>
