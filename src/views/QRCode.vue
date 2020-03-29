<template>
  <div class="container">
    <h1>Show this to the hospital personnel</h1>
    {{ currentPatient.firstName + ' ' + currentPatient.lastName }}
    <PatientQRCode :patient="currentPatient"></PatientQRCode>

    <router-link class="link" to="/summary">Close</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PatientQRCode from '../components/PatientQRCode'

export default {
  components: {
    PatientQRCode
  },
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  }
}
</script>

<style></style>
