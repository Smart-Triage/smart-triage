<template>
  <form class="container">
    <input
      placeholder="First name"
      class="form-input"
      type="text"
      :value="currentPatientFirstName"
      @input="setCurrentPatientFirstName($event.target.value)"
    />

    <input
      placeholder="Last name"
      class="form-input"
      type="text"
      :value="currentPatientLastName"
      @input="setCurrentPatientLastName($event.target.value)"
    />

    <input
      placeholder="Birth number"
      class="form-input"
      type="text"
      :value="currentPatientBirthNumber"
      @input="setCurrentPatientBirthNumber($event.target.value)"
    />

    <input
      placeholder="Phone number"
      class="form-input"
      type="tel"
      :value="currentPatientPhoneNumber"
      @input="setCurrentPatientPhoneNumber($event.target.value)"
    />

    {{ currentPatientFirstName }}

    <router-link class="link" to="/summary">Next</router-link>
  </form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('patients', [
      'patients',
      'currentPatientId',
      'currentPatientFirstName',
      'currentPatientLastName',
      'currentPatientBirthNumber',
      'currentPatientPhoneNumber'
    ])
  },
  destroyed() {
    this.createNewPatient()
  },
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    ...mapMutations('patients', [
      'setCurrentPatientId',
      'setCurrentPatientFirstName',
      'setCurrentPatientLastName',
      'setCurrentPatientBirthNumber',
      'setCurrentPatientPhoneNumber'
    ])
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
