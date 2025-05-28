<template>
  <div class="control-wrapper">
    <div class="control-panel">
      <div class="contol-buttons">
        <transition name="fade">
          <ButtonComponent v-if="haveBackwardStep" :blink="false" @click="prevStep"
            >Назад</ButtonComponent
          >
        </transition>
        <transition name="opacity">
          <VerticalSplitter v-if="haveBackwardStep && canNext" />
        </transition>
        <transition name="fade">
          <ButtonComponent v-if="canNext" :blink="false" @click="nextStep"
            >Продолжить</ButtonComponent
          >
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import VerticalSplitter from '@/components/VerticalSplitter.vue'

const dataStore = useDataStore()

const fullfirstDataStore = computed(() => {
  return !!(dataStore.acidConcentration && dataStore.solutionVolume && dataStore.powderWeight)
})

const fullSecondDataStore = computed(() => {
  return !!(
    dataStore.ind1_op1 &&
    dataStore.ind1_op2 &&
    dataStore.ind1_op3 &&
    dataStore.ind1_op4 &&
    dataStore.ind2_op1 &&
    dataStore.ind2_op2 &&
    dataStore.ind2_op3 &&
    dataStore.ind2_op4
  )
})

const canNext = computed(() => {
  switch (dataStore.currentStep) {
    case 'step0':
      return true
    case 'step1':
      return fullfirstDataStore.value
    case 'step2':
      return fullSecondDataStore.value
    case 'step3':
      return false
  }
  return false
})

const haveBackwardStep = computed(() => dataStore.currentStep !== 'step0')

function nextStep() {
  console.log()
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
  }
}
</script>

<style scoped>
.control-wrapper {
  position: fixed;
  background: var(--glassgray);
  bottom: 0dvh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  width: 100%;
  max-width: 500px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: clamp(10px, 5dvw, 50px) clamp(10px, 5dvw, 50px) 0px 0px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(20px);
}

.control-panel {
  position: relative;
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
