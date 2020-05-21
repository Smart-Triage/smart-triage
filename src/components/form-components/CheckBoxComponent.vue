<template>
  <div class="checkbox-answer">
    <div
      v-for="option in options"
      :key="currentPatient + option.value"
      class="checkbox-wrapper"
    >
      <input
        :id="option.value"
        v-model="checkedSteps.find(op => op.value === option.value).isChecked"
        :value="option.value"
        type="checkbox"
        class="hideCheckbox"
      />
      <label :for="option.value">{{ option.text }}</label>
    </div>

    <button @click="$emit('next', checkedSteps)">{{ $t('NEXT') }}</button>
  </div>
</template>

<script>
export default {
  name: 'CheckBoxComponent',
  props: {
    checkedSteps: [String, Boolean, Array],
    currentPatient: Object,
    options: Array
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/general.scss';

.checkbox-answer {
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
}

.checkbox-answer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 1em;
    margin: 0.5rem 0;
    background: white;
    border-radius: 10rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    label {
      margin-left: 0.5rem;
    }
  }
}
</style>
