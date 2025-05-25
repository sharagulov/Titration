<template>
  <div class="powder-block">
    <BlockComponent>
      <div class="input-fields">
        <InputComponent>
          Масса <template #description> Сколько соды взяли для приготовления раствора </template>
        </InputComponent>
        <InputComponent>
          Объем <template #description> Объём раствора соды в мерной колбе </template>
        </InputComponent>
        <InputComponent>
          Концентрация
          <template #description> Концентрация соляной кислоты в растворе </template>
        </InputComponent>
      </div>
    </BlockComponent>
  </div>
</template>

<script>
import BlockComponent from '@/components/BlockComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
export default {
  components: {
    BlockComponent,
    InputComponent
  }
}
</script>

<style scoped>
.input-fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

@media (max-width: 800px) {
  .input-fields {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
