<template>
  <div class="main-block">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlockComponent'
}
</script>

<style scoped>
.main-block {
  background-color: #222222;
  border-radius: 15px;
  padding: 20px;
}

@media (max-width: 800px) {
  .main-block {
  }
}
</style>
