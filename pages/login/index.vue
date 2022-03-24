<template>
  <section class="sign-up-page">
    <NavBar />
    <section class="container">
      <div class="sign-up-column columns is-centered">
        <Login />
      </div>
    </section>
  </section>
</template>

<script>
import Login from "@/components/login/Login.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    Login,
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
.sign-up-page {
  .sign-up-column {
    justify-content: center;
  }
}
</style>
