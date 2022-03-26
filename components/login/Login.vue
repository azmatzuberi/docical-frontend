<template>
  <section class="sign-up-component column is-half">
    <h1 class="has-text-centered">Your documents are waiting for you</h1>
    <b-input v-model="email" placeholder="Email address" type="email"></b-input>
    <b-input
      v-model="password"
      placeholder="Password"
      type="password"
    ></b-input>
    <hr />
    <div class="button-container">
      <b-button type="is-primary" @click="login">Login</b-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };
      this.$auth
        .loginWith("local", {
          data: userInfo,
        })
        .then((result) => {
          this.$auth.setUser(result.data.user);
          this.$nuxt.$router.push("/start-screen");
        });
    },
  },
};
</script>
<style lang="scss">
.sign-up-component {
  .input {
    height: 70px;
    margin-top: 10px;
  }
}
</style>
<style lang="scss" scoped>
.sign-up-component {
  margin-top: 3%;
  h1 {
    font-size: 1.8rem;
    margin: 0 auto;
    margin-bottom: 2.5%;
  }
  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    .button {
      font-weight: 700;
      margin: 0 auto;
      margin-top: 25px;
    }
  }
}
</style>
