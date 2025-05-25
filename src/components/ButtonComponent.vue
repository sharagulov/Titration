<template>
  <div class="button-block" :class="{ blink: blink }" :style="{ background: color }">
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'ButtonComponent',
  components: {},
  props: {
    color: {
      type: String,
      default: 'var(--gray)'
    },
    blink: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.button-block {
  padding: 10px 20px;
  border-radius: 10px;
  user-select: none;
  cursor: pointer;
  background: var(--gray);
  transition: background 0.3s;
}

.button-block:hover {
  background: var(--powergray) !important;
}

.blink {
  animation: blink 1s ease-in-out infinite;
}

@keyframes blink {
  0% {
    background: var(--gray);
  }
  50% {
    background: var(--powergray) !important;
  }
  100% {
    background: var(--gray);
  }
}

@media (max-width: 800px) {
  .button-block {
    box-shadow: 1px 0px 20px -6px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 1px 0px 20px -6px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 0px 20px -6px rgba(0, 0, 0, 0.75);
  }
}
</style>
