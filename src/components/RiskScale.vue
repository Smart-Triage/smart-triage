<template>
  <div class="risk-scale-container">
    Riziko nákazy COVID-19
    <div class="values">{{ value }} / {{ max }}</div>
    <progress
      class="slider"
      :class="{ orange: value / max > 0.2, red: value / max > 0.5 }"
      type="range"
      min="0"
      :max="max"
      :value="value"
      disabled
    />
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Number, required: true },
    max: { type: Number, required: true }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.risk-scale-container {
  background-color: $secondary-color-light;
  color: white;
  padding: 1rem;
  width: 100%;
  border-radius: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  margin: 1rem 0 2rem;

  &::-webkit-progress-bar {
    background-color: #d3d3d3;
  }

  &::-webkit-progress-value {
    background-color: $positive-color;
  }

  &.orange {
    background-color: orange;
  }

  &.red::-webkit-progress-value {
    background-color: $negative-color;
  }
}
.values {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
