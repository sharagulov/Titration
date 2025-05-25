<template>
  <div class="input-wrapper">
    <label class="input-label">
      <slot />
    </label>
    <input type="text" class="input-field" />
    <span class="description">
      <Icon class="info" icon="material-symbols-light:info-outline" width="24" height="24" />
      <slot name="description" />
    </span>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
export default {
  name: 'InputComponent',
  components: { Icon }
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
