<template>
  <div class="control-panel">
    <div class="contol-buttons">
      <transition name="fade">
        <ButtonComponent v-if="haveBackwardStep" :blink="false" @click="prevStep"
          >Назад</ButtonComponent
        >
      </transition>
      <transition name="opacity">
        <VerticalSplitter v-if="haveForwardStep && haveBackwardStep" />
      </transition>
      <transition name="fade">
        <ButtonComponent v-if="fullDataStore && haveForwardStep" :blink="false" @click="nextStep"
          >Продолжить</ButtonComponent
        >
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import VerticalSplitter from '@/components/VerticalSplitter.vue'

const dataStore = useDataStore()

const fullDataStore = computed(() => {
  return dataStore.acidConcentration && dataStore.solutionVolume && dataStore.powderWeight
})

const haveBackwardStep = computed(() => dataStore.currentStep !== 'step0')
const haveForwardStep = computed(() => dataStore.currentStep !== 'step4')

function nextStep() {
  switch (dataStore.currentStep) {
    case 'step0':
      dataStore.currentStep = 'step1'
      break
    case 'step1':
      dataStore.currentStep = 'step2'
      break
    case 'step2':
      dataStore.currentStep = 'step3'
      break
    case 'step3':
      dataStore.currentStep = 'step4'
      break
  }
}

function prevStep() {
  switch (dataStore.currentStep) {
    case 'step1':
      dataStore.currentStep = 'step0'
      break
    case 'step2':
      dataStore.currentStep = 'step1'
      break
    case 'step3':
      dataStore.currentStep = 'step2'
      break
    case 'step4':
      dataStore.currentStep = 'step3'
      break
  }
}
</script>

<style scoped>
.control-panel {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.contol-buttons {
  display: flex;
  align-items: center;
  gap: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(70px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.3s;
}
.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
.opacity-enter-to,
.opacity-leave-from {
  opacity: 1;
}
</style>
