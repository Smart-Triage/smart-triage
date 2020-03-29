<template>
  <div class="container">
    <div v-if="scanning">
      <button @click="scanning = false">Back</button>
      <QRScanner @patient="addPatient"></QRScanner>
    </div>

    <PatientSummary v-if="!scanning && currentPatient"></PatientSummary>

    <router-link
      v-if="!scanning && currentPatient"
      class="link"
      to="print-barcode"
      >Print barcode</router-link
    >

    <button v-if="!scanning" @click="scanning = true">Scan next patient</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QRScanner from '../components/QRSanner'
import PatientSummary from '../components/PatientSummary'

export default {
  components: {
    QRScanner,
    PatientSummary
  },
  data: () => ({
    scanning: false,
    scannedAtLeastOnce: false
  }),
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  },
  methods: {
    ...mapActions('patients', ['updateOrAddPatient']),
    addPatient(patient) {
      this.scanning = false
      this.scannedAtLeastOnce = true
      this.updateOrAddPatient(patient)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
