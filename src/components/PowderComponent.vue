<template>
  <div class="powder-block">
    <h3 class="block-name">Ввод исходных данных</h3>
    <BlockComponent>
      <div class="input-fields">
        <InputComponent v-model="powderWeight">
          Масса <template #description> Сколько соды взяли для приготовления раствора </template>
        </InputComponent>
        <InputComponent v-model="solutionVolume">
          Объем <template #description> Объём раствора соды в мерной колбе </template>
        </InputComponent>
        <InputComponent v-model="acidConcentration">
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
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'
export default {
  name: 'PowderComponent',
  components: {
    BlockComponent,
    InputComponent
  },
  setup() {
    const dataStore = useDataStore()

    const powderWeight = computed({
      get: () => dataStore.powderWeight,
      set: (val) => (dataStore.powderWeight = val)
    })
    const solutionVolume = computed({
      get: () => dataStore.solutionVolume,
      set: (val) => (dataStore.solutionVolume = val)
    })
    const acidConcentration = computed({
      get: () => dataStore.acidConcentration,
      set: (val) => (dataStore.acidConcentration = val)
    })

    return {
      powderWeight,
      solutionVolume,
      acidConcentration
    }
  }
}
</script>

<style scoped>
.input-fields {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.powder-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block-name {
  text-align: center;
  margin-bottom: 15px;
}

@media (max-width: 800px) {
  .input-fields {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
