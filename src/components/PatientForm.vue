<template>
  <form class="container" @submit="formSubmit">
    <div>
      <label class="floating-label">First name</label>
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.firstName"
        required
        @input="
          setCurrentPatientValueByKey({
            key: 'firstName',
            value: $event.target.value
          })
        "
      />

      <label class="floating-label">Last name</label>
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.lastName"
        required
        @input="
          setCurrentPatientValueByKey({
            key: 'lastName',
            value: $event.target.value
          })
        "
      />

      <label class="floating-label">Birth number</label>
      <input
        placeholder=""
        class="form-input"
        type="text"
        :value="currentPatient.birthNumber"
        required
        @input="
          setCurrentPatientValueByKey({
            key: 'birthNumber',
            value: $event.target.value
          })
        "
      />

      <label class="floating-label">Phone number</label>
      <input
        placeholder=""
        class="form-input"
        type="tel"
        :value="currentPatient.phoneNumber"
        required
        @input="
          setCurrentPatientValueByKey({
            key: 'phoneNumber',
            value: $event.target.value
          })
        "
      />
    </div>
    <button type="submit" class="link btn-primary">Next</button>
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
