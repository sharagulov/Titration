<template>
  <div class="header-flex">
    <h1 class="name"><slot /></h1>
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
  gap: 10px;
}

.name {
  line-height: 1.2;
}

.description {
  max-width: 600px;
}

@media (max-width: 800px) {
  .header-flex {
    align-items: center;
    text-align: center;
  }
}
</style>
