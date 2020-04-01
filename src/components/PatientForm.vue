<template>
  <form class="container" @submit="formSubmit">
    <div>
      <div class="info-box">
        <p>{{ $t('FORM.INFORMATION_IS_SAFE') }}</p>
        <p>{{ $t('FORM.NO_DATA_LEAVES_THIS_DEVICE') }}</p>
      </div>

      <label class="floating-label"> {{ $t('FIRST_NAME') }}</label>
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.firstName"
        required
        @input="setPatientValueByKey('firstName', $event.target.value)"
      />

      <label class="floating-label"> {{ $t('LAST_NAME') }}</label>
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.lastName"
        required
        @input="setPatientValueByKey('lastName', $event.target.value)"
      />

      <label class="floating-label">
        {{ $t('PERSONAL_IDENTIFICATION_NUMBER') }}</label
      >
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.birthNumber"
        required
        @input="setPatientValueByKey('birthNumber', $event.target.value)"
      />

      <label class="floating-label"> {{ $t('PHONE_NUMBER') }}</label>
      <input
        placeholder=""
        class="form-input"
        type="tel"
        :value="currentPatient.phoneNumber"
        required
        @input="setPatientValueByKey('phoneNumber', $event.target.value)"
      />
    </div>
    <button type="submit" class="link btn-primary">{{ $t('NEXT') }}</button>
  </form>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    formSubmit(e) {
      e.preventDefault()
      this.$emit('next')
    },
    setPatientValueByKey(key, value) {
      this.setCurrentPatientValueByKey({
        key,
        value: value
          .replace(/\s\s+/g, ' ') // replace multiple whitespaces with only one
          .split(' ')
          .join('')
          .trim()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.container {
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 100vw;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 2em 2em 0 0;
  max-width: 400px;
  padding: 0 0 2em 0;

  .info-box {
    margin: 0 0 1rem 0;
    color: $secondary-color;

    p {
      margin: 0;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;

    .floating-label {
      display: flex;
      align-self: flex-start;
      margin: 0.5rem 0.5rem 0 0.5rem;
      padding-left: 5px;
      font-size: 0.9em;
      font-weight: 600;
      color: $secondary-text-color;
    }

    .form-input {
      margin: 0 0.5rem 1rem 0.5rem;
      padding-left: 5px;
      height: 2rem;
      width: 20rem;
      outline: none;
      font: inherit;
      border-width: 0 0 1px 0;
      border-color: $secondary-text-color;
    }
  }
}
</style>
