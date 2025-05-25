<template>
  <div class="page-components">
    <ControlPanel />
    <HeaderComponent v-if="isIntro" />
    <PowderComponent v-if="isPowder" />
    <TitrationResultsComponent v-if="isTitration" />
    <CalculationResultsComponent v-if="isResults" />
    <IntroComponent v-if="isIntro"></IntroComponent>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import PowderComponent from '@/components/PowderComponent.vue'
import TitrationResultsComponent from '@/components/TitrationResultsComponent.vue'
import CalculationResultsComponent from '@/components/CalculationResultsComponent.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'
import IntroComponent from './components/IntroComponent.vue'

const dataStore = useDataStore()

const isIntro = computed(() => dataStore.currentStep === 'step0')
const isPowder = computed(() => dataStore.currentStep === 'step1')
const isTitration = computed(() => dataStore.currentStep === 'step2')
const isResults = computed(() => dataStore.currentStep === 'step3')
</script>

<style scoped>
.page-components {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 800px;
  margin: 30px;
}

@media (min-width: 800px) {
  .page-components {
  }
}
</style>
