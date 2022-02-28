<template>
  <div class="column">
    <a :href="link">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title has-text-grey">{{ title }}</p>
        </header>
        <div class="card-content">
          <div class="content has-text-centered">
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
    </a>
  </div>
</template>

<script>
export default {
  name: 'ButtonCard',
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
      required: true,
    },
  },
}
</script>

<style lang="scss">
.card {
  .icon {
    height: 6rem;
  }
}
</style>
