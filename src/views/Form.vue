<template>
  <form class="container" @submit="formSubmit">
    <input
      placeholder="First name"
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

    <input
      placeholder="Last name"
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

    <input
      placeholder="Birth number"
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

    <input
      placeholder="Phone number"
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

    <button type="submit" class="link">Next</button>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },
  methods: {
    ...mapActions('patients', [
      'createNewPatient',
      'clearCurrentPatient',
      'deletePatientById'
    ]),
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    formSubmit(e) {
      e.preventDefault()
      this.$router.push('/summary')
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.form-input {
  margin: 0.5rem;
  padding-left: 5px;
  height: 2.5rem;
  width: 20rem;
  outline: none;
  font: inherit;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
}
</style>
