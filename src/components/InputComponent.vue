<template>
  <div class="input-wrapper">
    <label class="input-label">
      <slot />
    </label>

    <!-- оставляем type="text", чтобы не получать браузерные стрелочки -->
    <input :value="displayValue" type="text" class="input-field" @input="onInput" />

    <span v-if="$slots.description" class="description">
      <Icon class="info" icon="material-symbols-light:info-outline" width="24" height="24" />
      <slot name="description" />
    </span>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'

export default {
  name: 'InputComponent',
  components: { Icon },

  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  computed: {
    displayValue() {
      return this.modelValue
    }
  },

  methods: {
    onInput(e) {
      const raw = e.target.value.trim()

      if (!raw) {
        this.$emit('update:modelValue', '')
        return
      }

      const normalized = raw.replace(',', '.')
      const isNumeric =
        /^[-+]?\d*(\.\d*)?$/.test(normalized) && normalized !== '.' && normalized !== '-'

      this.$emit('update:modelValue', isNumeric ? normalized : '')
    }
  }
}
</script>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 200px;
}

.input-label {
  color: white;
  margin-left: 2px;
  margin-bottom: 1px;
}

.input-field {
  font-size: 16px;
  background: var(--powergray);
  color: white;
  border-radius: 5px;
  padding: 7px 10px;
  outline: none;
  box-shadow: none;
  border: 1px var(--powergray) solid;
  transition: border 0.3s;
}

.input-field:focus {
  border: 1px var(--textgray) solid;
}

.description {
  color: var(--textgray);
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  padding-top: 10px;
  transition: color 0.3s;
  user-select: none;
  max-width: 90%;

  &:hover {
    color: white;
  }
}

.info {
  flex-shrink: 0;
}

@media (max-width: 800px) {
  .input-wrapper {
    width: 100%;
  }
}
</style>
