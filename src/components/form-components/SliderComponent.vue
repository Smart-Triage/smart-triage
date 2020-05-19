<template>
  <div class="slider-answer-slider">
    <div class="slider-value">{{ temperatureValue }}</div>
    <input
      v-model="temperatureValue"
      type="range"
      min="36"
      max="42"
      step="0.1"
      class="slider"
    />
    <button @click="$emit('next', temperatureValue)">{{ $t('NEXT') }}</button>
  </div>
</template>

<script>
export default {
  name: 'SliderComponent',
  data: () => {
    return {
      temperatureValue: 36.5
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/general.scss';

.slider-answer-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  .slider-value {
    font-size: 1.2rem;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    margin: 1rem 0 2rem;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: $primary-color;
    cursor: pointer;
  }
}
</style>
