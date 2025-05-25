<template>
  <div class="page-components">
    <ControlPanel />
    <HeaderComponent />
    <span>Описание данного раздела</span>
    <PowderComponent v-if="isPowder" />
    <TitrationResultsComponent v-if="isTitration" />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import PowderComponent from '@/components/PowderComponent.vue'
import TitrationResultsComponent from '@/components/TitrationResultsComponent.vue'
import ControlPanel from '@/components/ControlPanel.vue'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'

const dataStore = useDataStore()

const isPowder = computed(() => dataStore.currentStep === 'step1')
const isTitration = computed(() => dataStore.currentStep === 'step2')
</script>

<style scoped>
.page-components {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 800px) {
  .page-components {
    margin: 30px;
  }
}
</style>
