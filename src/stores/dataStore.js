import { defineStore } from 'pinia'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    powderWeight: '',
    solutionVolume: '',
    acidConcentration: '',
    ind1_op1: '',
    ind1_op2: '',
    ind1_op3: '',
    ind1_op4: '',
    ind2_op1: '',
    ind2_op2: '',
    ind2_op3: '',
    ind2_op4: '',
    currentStep: 'step1'
  }),
  persist: true
})
