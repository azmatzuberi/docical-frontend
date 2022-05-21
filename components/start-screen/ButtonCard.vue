<template>
  <div class="column">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title has-text-grey">{{ title }}</p>
      </header>
      <div class="card-content">
        <div class="content has-text-centered">
          {{ numberData }}
          <b-icon :icon="icon" size="is-large" type="is-primary" />
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item">
          <span>
            <slot />
          </span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    numberData: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.card {
  .icon {
    height: 6rem;
  }
  .card-content {
    .content {
      font-size: 3rem;
    }
  }
}
</style>
