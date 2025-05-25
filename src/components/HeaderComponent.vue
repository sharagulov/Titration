<template>
  <div class="header-flex">
    <h1><slot /></h1>
    <p class="description gray-text">
      <slot name="desc" />
    </p>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>

<style scoped>
.header-flex {
  display: flex;
  flex-direction: column;
}

.description {
  max-width: 600px;
}
</style>
