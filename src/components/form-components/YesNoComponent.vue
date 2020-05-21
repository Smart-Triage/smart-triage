<template>
  <div>
    <button
      :class="{ 'button-active': buttonActive === false }"
      @click="$emit('next', false)"
    >
      {{ $t('NO') }}
    </button>
    <button
      :class="{ 'button-active': buttonActive === true }"
      @click="$emit('next', true)"
    >
      {{ $t('YES') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'YesNoComponent',
  props: { buttonActive: [Boolean, String, Array] }
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
</style>
