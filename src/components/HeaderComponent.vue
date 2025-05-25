<template>
  <div class="header-flex">
    <h1>Титрование соды</h1>
    <p class="description grey-text">
      Школьник нашёл банку соды 1956 года. Помогите ему определить состав вещества методом
      титрования!
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
  justify-content: center;
  align-items: center;
  text-align: center;
}

.description {
  max-width: 600px;
}
</style>
