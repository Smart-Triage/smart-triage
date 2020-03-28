<template>
  <div>
    <h1>Summary</h1>
    <div>{{ currentPatientFirstName + ' ' + currentPatientLastName }}</div>
    <div>{{ currentPatientBirthNumber }}</div>
    <div>{{ currentPatientPhoneNumber }}</div>
    <hr />
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  }
}
</script>

<style></style>
