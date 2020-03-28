<template>
  <div class="container">
    <button v-if="!scan" @click="scan = true">Scan patient info</button>
    <QRScanner v-if="scan" @result="parseQRResult"></QRScanner>
    <PatientSummary v-if="patient" :patient="patient"></PatientSummary>
  </div>
</template>

<script>
import QRScanner from '../components/QRSanner'
import PatientSummary from '../components/PatientSummary'

export default {
  components: {
    QRScanner,
    PatientSummary
  },
  data: () => ({
    scan: false,
    patient: null
  }),
  methods: {
    parseQRResult(result) {
      this.scan = false

      const splitResult = result.split('-')

      this.patient = {
        firstName: splitResult[0],
        lastName: splitResult[1],
        birthNumber: splitResult[2],
        phoneNumber: splitResult[3]
      }
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
