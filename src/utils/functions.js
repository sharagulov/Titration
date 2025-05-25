export function getAverage(values) {
  const nums = values.filter((v) => v !== null && !isNaN(v))
  if (nums.length === 0) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

export function calculateMolesHCl(volume_ml, concentration_n) {
  return (volume_ml / 1000) * concentration_n // моль HCl
}

export function calculateMolesSoda(molesHCl, stage = 2) {
  // На 1 моль Na2CO3 нужно:
  // - 1 моль HCl при первой стадии (до NaHCO3)
  // - 2 моль HCl при полной нейтрализации
  return molesHCl / stage
}

export function calculateFullSodaMassInSolution(
  molesSodaInSample,
  solutionVolume_ml,
  sampleVolume_ml
) {
  return molesSodaInSample * (solutionVolume_ml / sampleVolume_ml)
}

export function determineHydrateFormula(totalMass_g, totalMolesNa2CO3) {
  const molarMass_Na2CO3 = 105.99
  const molarMass_H2O = 18.015
  const waterMass = totalMass_g - totalMolesNa2CO3 * molarMass_Na2CO3
  const moles_H2O = waterMass / molarMass_H2O
  const n = moles_H2O / totalMolesNa2CO3
  return Math.round(n)
}

export function guessIndicator(volume1, volume2) {
  const ratio = volume2 / volume1
  if (ratio > 1.7 && ratio < 2.3) {
    return {
      indicator1: 'Фенолфталеин',
      indicator2: 'Метилоранж',
      explanation:
        'Фенолфталеин реагирует на первую стадию (до NaHCO₃), метилоранж — на полную нейтрализацию.'
    }
  }
  return {
    indicator1: 'Неизвестен',
    indicator2: 'Неизвестен',
    explanation: 'Разница в объёмах не соответствует классическим стадиям титрования.'
  }
}
