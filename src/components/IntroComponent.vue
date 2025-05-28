<template>
  <div class="intro-block">
    <HeaderComponent
      >Титрование соды
      <template #desc>
        Школьник нашёл банку соды 1956 года. Помогите ему определить состав вещества методом
        титрования!
      </template>
    </HeaderComponent>
    <div class="block">
      <h3>Что будем делать?</h3>
      <p>Проверим состав найденной «кристаллической соды» методом кислотно-основного титрования</p>
    </div>
    <VerticalLine />
    <div class="block">
      <h3>Шаги работы:</h3>
      <p>• Ввести исходные данные опыта</p>
      <p>• Записать объёмы HCl, ушедшие на титрование двумя индикаторами</p>
      <p>• Получить автоматический расчёт формулы кристаллогидрата и пояснение результата</p>
    </div>
    <VerticalLine />
    <h3>Жми «Продолжить» и мы начнем!</h3>
  </div>
</template>

<script setup>
import VerticalLine from '@/components/VerticalLine.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.intro-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.block {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

@media (max-width: 800px) {
  .intro-block {
    align-items: center;
  }

  .block {
    text-align: center;
  }
}
</style>
