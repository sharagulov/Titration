<template>
  <div class="titration-block">
    <h3 class="block-name">Ввод результатов титрования</h3>
    <div class="cards">
      <div class="card-block">
        <span class="card-name gray-text"> Индикатор 1</span>
        <BlockComponent>
          <div class="input-fields">
            <InputComponent v-model="ind1_op1">
              Опыт 1 <template #description> Индикатор 1 — Опыт 1 </template>
            </InputComponent>
            <InputComponent v-model="ind1_op2">
              Опыт 2
              <template #description> Индикатор 1 — Опыт 2 </template></InputComponent
            >
            <InputComponent v-model="ind1_op3">
              Опыт 3
              <template #description> Индикатор 1 — Опыт 3 </template></InputComponent
            >
            <InputComponent v-model="ind1_op4">
              Опыт 4
              <template #description> Индикатор 1 — Опыт 4 </template></InputComponent
            >
          </div>
        </BlockComponent>
      </div>
      <div class="card-block">
        <span class="card-name gray-text"> Индикатор 2</span>
        <BlockComponent>
          <div class="input-fields">
            <InputComponent v-model="ind2_op1">
              Опыт 1 <template #description> Индикатор 2 — Опыт 1 </template>
            </InputComponent>
            <InputComponent v-model="ind2_op2">
              Опыт 2
              <template #description> Индикатор 2 — Опыт 2 </template></InputComponent
            >
            <InputComponent v-model="ind2_op3">
              Опыт 3
              <template #description> Индикатор 2 — Опыт 3 </template></InputComponent
            >
            <InputComponent v-model="ind2_op4">
              Опыт 4
              <template #description> Индикатор 2 — Опыт 4 </template></InputComponent
            >
          </div>
        </BlockComponent>
      </div>
    </div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import BlockComponent from '@/components/BlockComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'
export default {
  name: 'TitrationComponent',
  components: {
    BlockComponent,
    InputComponent
  },
  setup() {
    const dataStore = useDataStore()

    const ind1_op1 = computed({
      get: () => dataStore.ind1_op1,
      set: (val) => (dataStore.ind1_op1 = val)
    })
    const ind1_op2 = computed({
      get: () => dataStore.ind1_op2,
      set: (val) => (dataStore.ind1_op2 = val)
    })
    const ind1_op3 = computed({
      get: () => dataStore.ind1_op3,
      set: (val) => (dataStore.ind1_op3 = val)
    })
    const ind1_op4 = computed({
      get: () => dataStore.ind1_op4,
      set: (val) => (dataStore.ind1_op4 = val)
    })

    const ind2_op1 = computed({
      get: () => dataStore.ind2_op1,
      set: (val) => (dataStore.ind2_op1 = val)
    })
    const ind2_op2 = computed({
      get: () => dataStore.ind2_op2,
      set: (val) => (dataStore.ind2_op2 = val)
    })
    const ind2_op3 = computed({
      get: () => dataStore.ind2_op3,
      set: (val) => (dataStore.ind2_op3 = val)
    })
    const ind2_op4 = computed({
      get: () => dataStore.ind2_op4,
      set: (val) => (dataStore.ind2_op4 = val)
    })

    return {
      ind1_op1,
      ind1_op2,
      ind1_op3,
      ind1_op4,
      ind2_op1,
      ind2_op2,
      ind2_op3,
      ind2_op4
    }
  }
}
</script>

<style scoped>
.input-fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.titration-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.card-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card-name {
  margin-left: 2px;
}

.block-name {
  text-align: center;
  margin-bottom: 15px;
}

@media (max-width: 800px) {
  .input-fields {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
