import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    powderWeight: null,
    solutionVolume: null,
    acidConcentration: null,
    ind1_op1: null,
    ind1_op2: null,
    ind1_op3: null,
    ind1_op4: null,
    ind2_op1: null,
    ind2_op2: null,
    ind2_op3: null,
    ind2_op4: null,
    currentStep: 'step1'
  }),
  persist: true
})
