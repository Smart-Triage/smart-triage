<template>
  <div class="one-of-answer">
    <button
      v-for="option in options"
      :key="option.value"
      :class="{
        'button-active': buttonActive === option.value,
        'button-small': smallButtons
      }"
      @click="$emit('next', option.value)"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'OneChoiceComponent',
  props: {
    buttonActive: [String, Boolean, Array],
    options: Array,
    smallButtons: Boolean
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/general.scss';

button {
  font-size: 1.1em;
  background-color: $light-button-color;
  border-radius: 2em;
  border: none;
  padding: 0.8em 2em;
  margin: 0.5em;
}

.button-active {
  background-color: $primary-color;
}

button:hover {
  background-color: $dark-button-color;
}

.button-small {
  font-size: 0.8em;
  border-radius: 2em;
  border: none;
  padding: 0.5em 1.2em;
  margin: 0.5em;
}
</style>
