<template>
  <div class="powder-block">
    <HeaderComponent
      >Ввод исходных данных
      <template #desc>
        Заполните три поля. После заполнения нажмите «Продолжить» для перехода к вводу результатов
        титрования.
      </template>
    </HeaderComponent>
    <VerticalLine />
    <p>Перед тем как работать с бюреткой, лабораторный журнал должен знать три числа:</p>
    <VerticalLine />
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
    <VerticalLine />
    <p>
      <strong>Совет:</strong> вводите числа через точку (6.5), чтобы расчёт прошёл без ошибок. После
      заполнения всех трёх полей кнопка «Продолжить» станет активной.
    </p>
  </div>
</template>

<script>
import VerticalLine from '@/components/VerticalLine.vue'
import BlockComponent from '@/components/BlockComponent.vue'
import InputComponent from '@/components/InputComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
export default {
  name: 'PowderComponent',
  components: {
    BlockComponent,
    InputComponent,
    HeaderComponent,
    VerticalLine
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
  gap: 20px;
}

.block-name {
  margin-bottom: 15px;
}

@media (max-width: 800px) {
  .input-fields {
    flex-direction: column;
  }
}
</style>
