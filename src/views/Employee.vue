<template>
  <div class="container">
    <div v-if="scanning" class="scanner-view">
      <button @click="showEmployeeHomepage">
        <ion-icon name="arrow-back-outline" size="large"></ion-icon>
      </button>
      <QRScanner @patient="addPatient"></QRScanner>
    </div>

    <div
      v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
      class="header-info"
    >
      <h1>Triage</h1>
      <p>Welcome to the employee application for the triage of patients</p>
      <p>Tap scan next patient to begin</p>
    </div>

    <div v-if="showPatientSummary && currentPatient" class="summary-view">
      <div class="top-buttons">
        <button class="icon-button" @click="showEmployeeHomepage">
          <ion-icon name="close-outline" size="large"></ion-icon>
        </button>
      </div>
      <h1>Patient summary</h1>
      <PatientSummary :employee="true"></PatientSummary>

      <!-- <router-link
      class="link icon-button"
      to="print-barcode"
      ><ion-icon name="barcode-outline"></ion-icon><div class="button-text">Print barcode</div></router-link
    > -->
      <button
        class="btn-primary show-confirmation-btn icon-button"
        @click="viewConfirmationQR"
      >
        <ion-icon name="checkmark-outline"></ion-icon>
        <div class="button-text">Confirm pacient info</div>
      </button>
    </div>

    <div v-if="showingConfirmationQR" class="confirmation-view">
      <div class="top-buttons">
        <button @click="viewPatientSummary">
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </button>
      </div>
      <h1>Patient confirmation code</h1>
      <qrcode-vue
        class="qrcode"
        :value="confirmedPatient"
        size="300"
        level="H"
      ></qrcode-vue>
      <button class="link btn-primary" @click="showEmployeeHomepage">
        Close patient
      </button>
    </div>

    <div class="spacer"></div>

    <button
      v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
      class="btn-primary scan-next-pacient icon-button"
      @click="scan"
    >
      <ion-icon name="scan-outline"></ion-icon>
      <div class="button-text">Scan next patient</div>
    </button>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapActions, mapGetters } from 'vuex'
import QRScanner from '../components/QRSanner'
import PatientSummary from '../components/PatientSummary'

export default {
  components: {
    QRScanner,
    PatientSummary,
    QrcodeVue
  },
  data: () => ({
    scanning: false,
    showingConfirmationQR: false,
    scannedAtLeastOnce: false,
    showPatientSummary: false
  }),
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    confirmedPatient() {
      if (this.currentPatient)
        return JSON.stringify({
          ...this.currentPatient,
          confirmed: true,
          confirmation: {
            confirmedBy: 'Jan Novák',
            timestamp: new Date()
          }
        })
      return null
    }
  },
  watch: {
    $route(to) {
      // Watch for url changes, and display correct view based on URL hash value
      const viewFromhash = to.hash.substr(1).trim()
      switch (viewFromhash) {
        case 'scanning':
          this.scanning = true
          this.showingConfirmationQR = false
          this.showPatientSummary = false
          break
        case 'confirmation-qr-code':
          this.showingConfirmationQR = true
          this.scanning = false
          this.showPatientSummary = false
          break
        case 'patient-summary':
          this.showPatientSummary = true
          this.showingConfirmationQR = false
          this.scanning = false
          break
        default:
          this.showingConfirmationQR = false
          this.scanning = false
          this.showPatientSummary = false
          break
      }
    }
  },
  mounted() {
    const viewFromhash = window.location.hash.substr(1).trim()
    switch (viewFromhash) {
      case 'scanning':
        this.scanning = true
        break
      case 'confirmation-qr-code':
        this.showingConfirmationQR = true
        break
      case 'patient-summary':
        this.showPatientSummary = true
        break
      default:
        break
    }
  },
  methods: {
    ...mapActions('patients', ['updateOrAddPatient']),
    addPatient(patient) {
      this.scanning = false
      this.scannedAtLeastOnce = true
      this.updateOrAddPatient(patient)
      this.viewPatientSummary()
    },
    showEmployeeHomepage() {
      this.scanning = false
      this.showingConfirmationQR = false
      this.showPatientSummary = false
      this.$router.push('')
    },
    scan() {
      this.scanning = true
      this.$router.push('#scanning')
    },
    viewConfirmationQR() {
      this.showingConfirmationQR = true
      this.$router.push('#confirmation-qr-code')
    },
    viewPatientSummary() {
      this.showPatientSummary = true
      this.$router.push('#patient-summary')
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .spacer {
    flex-grow: 1;
  }
}

.top-buttons {
  width: 100%;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
}

.summary-view,
.confirmation-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-confirmation-btn {
  cursor: pointer;
  font-size: 1.1rem;
  background-color: $primary-color;
  color: white;
  padding: 0.8rem 1.5rem 0.8rem 1.2rem;
}

.scan-next-pacient {
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1.2rem;
  color: white;

  .button-text {
    font-size: 1rem;
  }
}
</style>
