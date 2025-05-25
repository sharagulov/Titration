<template>
  <div class="page-components">
    <HeaderComponent />
    <span>Описание данного раздела</span>
    <PowderComponent />
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue'
import PowderComponent from './components/PowderComponent.vue'
export default {
  name: 'App',
  components: {
    HeaderComponent,
    PowderComponent
  }
}
</script>

<style scoped>
.page-components {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 800px) {
  .page-components {
    margin: 30px;
  }
}
</style>
