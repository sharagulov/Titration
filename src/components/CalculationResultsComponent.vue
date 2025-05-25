<template>
  <div class="calculation-block">
    <h3 class="block-name">Ввод исходных данных</h3>
    <BlockComponent>
      <div class="output-fields"></div>
    </BlockComponent>
  </div>
</template>

<script setup>
import BlockComponent from '@/components/BlockComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import { getAverage } from '@/utils/functions'
import { computed } from 'vue'

const dataStore = useDataStore()
const averageFirst = computed(() => [
  { label: 'Значение 1', value: dataStore.ind1_op1 },
  { label: 'Значение 2', value: dataStore.ind1_op2 },
  { label: 'Значение 3', value: dataStore.ind1_op3 },
  { label: 'Значение 4', value: dataStore.ind1_op4 },
  {
    label: 'Резальтат',
    value: getAverage(
      dataStore.ind1_op1,
      dataStore.ind1_op2,
      dataStore.ind1_op3,
      dataStore.ind1_op4
    )
  }
])
</script>

<style scoped>
.output-fields {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.calculation-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block-name {
  text-align: center;
  margin-bottom: 15px;
}

@media (max-width: 800px) {
  .output-fields {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
