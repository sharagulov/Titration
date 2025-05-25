<template>
  <div class="main-block" :class="{ slim: variant === 'slim' }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlockComponent',
  props: {
    variant: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.main-block {
  background-color: #222222;
  border-radius: 15px;
  padding: 20px;
  width: fit-content;
}

.slim {
  padding: 10px;
}

@media (max-width: 800px) {
  .main-block {
  }
}
</style>
