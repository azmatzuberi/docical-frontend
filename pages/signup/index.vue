<template>
  <section class="sign-up-page">
    <NavBar />
    <section class="container">
      <div class="sign-up-column columns is-centered">
        <SignUp />
      </div>
    </section>
  </section>
</template>

<script>
import SignUp from "@/components/signup/SignUp.vue";
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    SignUp,
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
