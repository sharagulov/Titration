<template>
  <div class="calculation-block">
    <template v-for="(step, idx) in steps" :key="'step-' + idx">
      <!-- Анимированный текст -->
      <transition-group
        v-if="step.type === 'text' && currentStep >= idx"
        name="fade-word"
        tag="p"
        class="step-block"
      >
        <!-- rich → v-html, plain → {{ }} -->
        <span
          v-for="(word, i) in step.wordsShown.value"
          v-if="step.rich"
          :key="`rich-${i}`"
          v-html="word"
        />
        <span v-for="(word, i) in step.wordsShown.value" v-else :key="`plain-${i}`">
          {{ word }}
        </span>
      </transition-group>

      <!-- Блоки -->
      <transition name="fade-block">
        <!-- без обёртки -->
        <template v-if="step.type === 'block' && currentStep >= idx && step.noBlockWrapper">
          <component
            :is="step.component"
            v-if="step.component"
            v-bind="step.props"
            class="step-block"
          />
          <div v-else-if="step.rich" class="step-block" v-html="step.content" />
          <div v-else class="step-block">{{ step.content }}</div>
        </template>

        <!-- c BlockComponent -->
        <BlockComponent
          v-else-if="step.type === 'block' && currentStep >= idx"
          class="next-block step-block"
        >
          <component :is="step.component" v-if="step.component" v-bind="step.props" />
          <div v-else-if="step.rich" v-html="step.content" />
          <template v-else>{{ step.content }}</template>
        </BlockComponent>
      </transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import BlockComponent from '@/components/BlockComponent.vue'
import VerticalLine from '@/components/VerticalLine.vue'
import {
  calculateFullSodaMassInSolution,
  calculateMolesHCl,
  calculateMolesSoda,
  determineHydrateFormula,
  guessIndicator
} from '@/utils/functions'

/* ------------------------------------------------------------------ */
/* -------------------------  Шаги (steps)  ------------------------- */
/* ------------------------------------------------------------------ */

const steps = [
  {
    type: 'block',
    rich: true,
    content: '<h1>• Считаем средний объём',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Считаем <strong>средний</strong> объём раствора кислоты, израсходованный на титрование каждой порции с разными индикаторами'
  },
  {
    type: 'text',
    rich: true,
    text: 'Индикатор 1: <strong>{ind1_op1} мл, <strong>{ind1_op2} мл, <strong>{ind1_op3} мл, <strong>{ind1_op4} мл'
  },
  {
    type: 'text',
    rich: true,
    text: 'Индикатор 2: <strong>{ind2_op1} мл, <strong>{ind2_op2} мл, <strong>{ind2_op3} мл, <strong>{ind2_op4} мл'
  },
  {
    type: 'block',
    rich: true,
    content: '<h2>Средний объём: <br>',
    noBlockWrapper: true
  },
  {
    type: 'block',
    rich: true,
    content: '<h3>Индикатор 1: <strong>{avg1}</strong> мл, Индикатор 2: <strong>{avg2}</strong> мл'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },
  {
    type: 'block',
    rich: true,
    content: '<h1>• Определение количества вещества',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Определяем количество <strong>молей</strong> соды в анализируемом растворе:'
  },
  {
    type: 'text',
    rich: true,
    text: 'Средний объём HCl: <strong>{avg1}</strong> мл (индикатор 1) и <strong>{avg2}</strong> мл (индикатор 2)'
  },
  {
    type: 'text',
    rich: true,
    text: 'Концентрация HCl: <strong>{acidConcentration}</strong> н (моль/л)'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },

  // --- Начинаем расчет молей HCl ---
  {
    type: 'block',
    rich: true,
    content: '<h1>• Расчёт количества молей HCl</h1>',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Для индикатора 1: количество молей HCl рассчитываем по формуле: (Средний объём / 1000) × концентрация'
  },
  {
    type: 'block',
    rich: true,
    content:
      '<h3>nHCl (Индикатор 1) = ({avg1} мл / 1000) × {acidConcentration} н = <strong>{nHCl1}</strong> моль'
  },
  {
    type: 'text',
    rich: true,
    text: 'Для индикатора 2 аналогично: '
  },
  {
    type: 'block',
    rich: true,
    content:
      '<h3>nHCl (Индикатор 2) = ({avg2} мл / 1000) × {acidConcentration} н = <strong>{nHCl2}</strong> моль'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },

  // --- Расчёт молей соды ---
  {
    type: 'block',
    rich: true,
    content: '<h1>• Расчёт количества молей соды (Na₂CO₃)</h1>',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Для индикатора 1 считается, что на 1 моль Na₂CO₃ приходится 1 моль HCl (первая стадия):'
  },
  {
    type: 'block',
    rich: true,
    content: '<h3>nNa₂CO₃ (Индикатор 1) = nHCl / 1 = <strong>{nSoda1}</strong> моль'
  },
  {
    type: 'text',
    rich: true,
    text: 'Для индикатора 2 — полная нейтрализация, 2 моля HCl на 1 моль Na₂CO₃:'
  },
  {
    type: 'block',
    rich: true,
    content: '<h3>nNa₂CO₃ (Индикатор 2) = nHCl / 2 = <strong>{nSoda2}</strong> моль'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },

  // --- Расчёт массы соды в растворе ---
  {
    type: 'block',
    rich: true,
    content: '<h1>• Расчёт массы соды в растворе</h1>',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Учитывая объём раствора <strong>{solutionVolume} мл и объём пробы 10 мл, масса соды рассчитывается как:'
  },
  {
    type: 'block',
    rich: true,
    content:
      '<h3>Масса соды в растворе = nNa₂CO₃ (Индикатор 1) × (<strong>{solutionVolume}  мл / 10 мл) = <strong>{nSodaFull}</strong> моль'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },

  // --- Определение формулы кристаллогидрата ---
  {
    type: 'block',
    rich: true,
    content: '<h1>• Определение формулы кристаллогидрата</h1>',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Исходя из общей массы образца и количества моль Na₂CO₃ рассчитываем количество молекул воды n в Na₂CO₃·nH₂O:'
  },
  {
    type: 'block',
    rich: true,
    content: '<h3>Значение n = <strong>{hydrate_n}</strong>'
  },
  { type: 'block', component: VerticalLine, noBlockWrapper: true },

  // --- Индикация и объяснение ---
  {
    type: 'block',
    rich: true,
    content: '<h1>• Определение индикаторов</h1>',
    noBlockWrapper: true
  },
  {
    type: 'text',
    rich: true,
    text: 'Сравниваем объёмы титрования для разных индикаторов, чтобы понять, на какую стадию реагирует каждый из них:'
  },
  {
    type: 'block',
    rich: true,
    content:
      '<h3>Индикатор 1: <strong>{ind1Name}</strong><br>Индикатор 2: <strong>{ind2Name}</strong><br>{indExplain}'
  }
]

/* ------------------------------------------------------------------ */
/* -------------------  Вспомогательные функции  -------------------- */
/* ------------------------------------------------------------------ */

function toNumberSafe(val) {
  if (val === null || val === undefined) return 0
  if (typeof val === 'number') return val
  const clean = String(val).trim().replace(',', '.')
  return clean === '' ? 0 : Number(clean) || 0
}

function fmt(val) {
  if (val === null || val === undefined) return '—'

  const num = Number(val)
  if (isNaN(num)) return val // на случай строк типа «Na₂CO₃»

  // a) большие числа ≥ 1 → 2 знака
  if (Math.abs(num) >= 1) {
    return stripZeros(num.toFixed(2)) // 7.00 → 7  | 13.10 → 13.1
  }

  // b) от 0.01 до 1 → 4 знака
  if (Math.abs(num) >= 0.01) {
    return stripZeros(num.toFixed(4)) // 0.1234
  }

  // c) меньше 0.01 → 6 знаков, чтобы 0.00132 не потерялось
  return stripZeros(num.toFixed(6)) // 0.000660 → 0.00066
}

function stripZeros(str) {
  return str.replace(/\.?0+$/, '') // убираем .00 или лишние нули справа
}

function interpolate(str, data) {
  return str.replace(/{([\w\d_]+)}/g, (_, key) => fmt(data[key]))
}

function getAverage(...vals) {
  const nums = vals
    .flat()
    .map(toNumberSafe)
    .filter((v) => v)
  return nums.length ? (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2) : 0
}

/* ------------------------------------------------------------------ */
/* ------------------  Реактивные вычисления  ----------------------- */
/* ------------------------------------------------------------------ */

const store = useDataStore()

const dataMap = computed(() => {
  /* исходные объёмы */
  const ind1 = [
    toNumberSafe(store.ind1_op1),
    toNumberSafe(store.ind1_op2),
    toNumberSafe(store.ind1_op3),
    toNumberSafe(store.ind1_op4)
  ]
  const ind2 = [
    toNumberSafe(store.ind2_op1),
    toNumberSafe(store.ind2_op2),
    toNumberSafe(store.ind2_op3),
    toNumberSafe(store.ind2_op4)
  ]

  const acidConc = toNumberSafe(store.acidConcentration)
  const avg1 = getAverage(ind1)
  const avg2 = getAverage(ind2)

  const nHCl1 = calculateMolesHCl(avg1, acidConc)
  const nHCl2 = calculateMolesHCl(avg2, acidConc)

  const nSoda1 = calculateMolesSoda(nHCl1, 1)
  const nSoda2 = calculateMolesSoda(nHCl2, 2)

  const nSodaFull = calculateFullSodaMassInSolution(
    nSoda1,
    toNumberSafe(store.solutionVolume) || 100,
    10
  )

  const hydrate_n = determineHydrateFormula(toNumberSafe(store.powderWeight), nSodaFull)

  const { indicator1, indicator2, explanation } = guessIndicator(avg1, avg2)

  return {
    ind1_op1: ind1[0],
    ind1_op2: ind1[1],
    ind1_op3: ind1[2],
    ind1_op4: ind1[3],
    ind2_op1: ind2[0],
    ind2_op2: ind2[1],
    ind2_op3: ind2[2],
    ind2_op4: ind2[3],
    acidConcentration: acidConc,
    avg1,
    avg2,
    nHCl1,
    nHCl2,
    nSoda1,
    nSoda2,
    nSodaFull,
    solutionVolume: toNumberSafe(store.solutionVolume),
    hydrate_n,
    ind1Name: indicator1,
    ind2Name: indicator2,
    indExplain: explanation
  }
})

onMounted(() => {
  window.scrollTo(0, 0)
})

/* ------------------------------------------------------------------ */
/* --------------  Подготовка step-ов (подстановка)  ---------------- */
/* ------------------------------------------------------------------ */

steps.forEach((step) => {
  if (step.rich) {
    if (step.type === 'text') {
      const prepared = interpolate(step.text, dataMap.value)
      step.words = prepared.split(/(\s+)/).filter((w) => w.trim() || w === ' ')
      step.wordsShown = ref([])
    }
    if (step.type === 'block') {
      step.content = interpolate(step.content, dataMap.value)
    }
  } else if (step.type === 'text') {
    step.words = step.text.split(' ')
    step.wordsShown = ref([])
  }
})

/* ------------------------------------------------------------------ */
/* ----------------  Логика анимации (как было)  -------------------- */
/* ------------------------------------------------------------------ */

const currentStep = ref(0)

function nextWords(step, done) {
  step.wordsShown.value = []
  let i = 0
  const ticker = () => {
    if (i < step.words.length) {
      step.wordsShown.value.push(step.words[i++])
      setTimeout(ticker, 50)
    } else {
      done && done()
    }
  }
  ticker()
}

function animateStep(idx) {
  if (idx >= steps.length) return
  const step = steps[idx]
  if (step.type === 'text') {
    nextWords(step, () => {
      currentStep.value++
      animateStep(idx + 1)
    })
  } else {
    setTimeout(() => {
      currentStep.value++
      animateStep(idx + 1)
    }, 500)
  }
}

animateStep(0)
</script>

<style scoped>
.calculation-block {
  margin-bottom: 200px;
}
.word {
  display: inline-block;
  margin-right: 0.3em;
}
.step-block {
  margin-bottom: 24px;
}
.fade-word-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-word-enter-active {
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-word-enter-to {
  opacity: 1;
  transform: none;
}
.fade-block-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-block-enter-active {
  transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-block-enter-to {
  opacity: 1;
  transform: none;
}
</style>
