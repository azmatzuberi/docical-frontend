<template>
  <section class="sign-up-component column is-half">
    <h1 class="has-text-centered">
      A big step for your document, a giant leap for your credibility
    </h1>
    <b-input
      v-model="first_name"
      placeholder="First name"
      type="text"
    ></b-input>
    <b-input v-model="last_name" placeholder="Last name" type="text"></b-input>
    <b-input
      v-model="company_name"
      placeholder="Company name (optional)"
      type="text"
    ></b-input>
    <b-input v-model="email" placeholder="Email address" type="email"></b-input>
    <b-input
      v-model="password"
      placeholder="Password"
      type="password"
    ></b-input>
    <hr />
    <div class="button-container">
      <b-button type="is-primary">Sign Up</b-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      company_name: "",
      email: "",
      password: "",
    };
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
    width: 60%;
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
