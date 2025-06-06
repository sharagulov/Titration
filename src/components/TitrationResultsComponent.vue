<template>
  <div class="titration-block">
    <HeaderComponent
      >Ввод результатов титрования
      <template #desc>
        Теперь вносим показания бюретки. Для надёжности каждой порции раствора вы титровали
        четырежды двумя разными индикаторами.
      </template>
    </HeaderComponent>
    <VerticalLine />
    <div class="block">
      <h3>Программа самостоятельно:</h3>
      <p>• Усреднит каждую четвёрку значений</p>
      <p>• Определит, какой индикатор фиксирует первую стадию, а какой — полную нейтрализацию</p>
      <p>• Подставит средние объёмы в расчёты</p>
    </div>
    <VerticalLine />
    <div class="cards">
      <div class="card-block">
        <span class="card-name gray-text">«Индикатор 1» (фенолфталеин)</span>
        <BlockComponent>
          <div class="input-fields">
            <InputComponent v-model="ind1_op1" placeholder="7">
              Опыт 1 <template #description> Индикатор 1 — Опыт 1 </template>
            </InputComponent>
            <InputComponent v-model="ind1_op2" placeholder="6.5">
              Опыт 2
              <template #description> Индикатор 1 — Опыт 2 </template></InputComponent
            >
            <InputComponent v-model="ind1_op3" placeholder="6.4">
              Опыт 3
              <template #description> Индикатор 1 — Опыт 3 </template></InputComponent
            >
            <InputComponent v-model="ind1_op4" placeholder="6.45">
              Опыт 4
              <template #description> Индикатор 1 — Опыт 4 </template></InputComponent
            >
          </div>
        </BlockComponent>
      </div>
      <VerticalLine />
      <div class="card-block">
        <span class="card-name gray-text">«Индикатор 2» (метилоранж)</span>
        <BlockComponent>
          <div class="input-fields">
            <InputComponent v-model="ind2_op1" placeholder="14">
              Опыт 1 <template #description> Индикатор 2 — Опыт 1 </template>
            </InputComponent>
            <InputComponent v-model="ind2_op2" placeholder="13">
              Опыт 2
              <template #description> Индикатор 2 — Опыт 2 </template></InputComponent
            >
            <InputComponent v-model="ind2_op3" placeholder="12.8">
              Опыт 3
              <template #description> Индикатор 2 — Опыт 3 </template></InputComponent
            >
            <InputComponent v-model="ind2_op4" placeholder="12.8">
              Опыт 4
              <template #description> Индикатор 2 — Опыт 4 </template></InputComponent
            >
          </div>
        </BlockComponent>
      </div>
      <VerticalLine />
      <p class="block">
        Если ввели все восемь чисел корректно, нажмите «Продолжить» — и на следующей странице
        увидите полный разбор с формулами, пояснениями и итоговой структурой кристаллогидрата.
      </p>
    </div>
  </div>
</template>

<script>
import BlockComponent from '@/components/BlockComponent.vue'
import VerticalLine from '@/components/VerticalLine.vue'
import InputComponent from '@/components/InputComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'
export default {
  name: 'TitrationComponent',
  components: {
    BlockComponent,
    InputComponent,
    HeaderComponent,
    VerticalLine
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
  },
  mounted() {
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
.titration-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
}

.card-block {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  align-items: start;
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
  margin-bottom: 15px;
}

.block {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

@media (max-width: 800px) {
  .input-fields {
    display: flex;
    flex-direction: column;
  }

  .titration-block,
  .cards {
    align-items: center;
  }

  .block {
    text-align: center;
  }

  .card-block {
    align-items: center;
  }
}
</style>
