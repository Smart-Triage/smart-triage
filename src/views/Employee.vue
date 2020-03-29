<template>
  <div class="container">
    <div v-if="scanning" class="scanner-view">
      <button @click="scan(false)">
        <ion-icon name="arrow-back-outline" size="large"></ion-icon>
      </button>
      <QRScanner @patient="addPatient"></QRScanner>
    </div>

    <div
      v-if="!scanning && !showingConfirmationQR && currentPatient"
      class="summary-view"
    >
      <h1>Patient summary</h1>
      <PatientSummary></PatientSummary>

      <!-- <router-link
      class="link"
      to="print-barcode"
      >Print barcode</router-link
    > -->
    </div>

    <button
      v-if="!showingConfirmationQR && confirmedPatient && !scanning"
      class="btn-primary show-confirmation-btn"
      @click="viewConfirmationQR(true)"
    >
      Show confirmation code
    </button>
    <div v-if="showingConfirmationQR" class="confirmation-view">
      <div class="top-buttons">
        <button @click="viewConfirmationQR(false)">
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
    </div>

    <div class="spacer"></div>

    <button
      v-if="!scanning && !showingConfirmationQR"
      class="btn-primary scan-next-pacient"
      @click="scan(true)"
    >
      Scan next patient
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
    scannedAtLeastOnce: false
  }),
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    confirmedPatient() {
      return JSON.stringify({
        ...this.currentPatient,
        confirmation: {
          confirmedBy: 'HOSPITAL_EMPLOYEE_NAME',
          time: new Date()
        }
      })
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
          break
        case 'confirmation-qr-code':
          this.showingConfirmationQR = true
          this.scanning = false
          break
        default:
          this.showingConfirmationQR = false
          this.scanning = false
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
    },
    scan(val) {
      if (val) {
        this.scanning = true
        this.$router.push('#scanning')
      } else {
        this.scanning = false
        this.$router.push('')
      }
    },
    viewConfirmationQR(val) {
      if (val) {
        this.showingConfirmationQR = true
        this.$router.push('#confirmation-qr-code')
      } else {
        this.showingConfirmationQR = false
        this.$router.push('')
      }
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

.summary-view,
.confirmation-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-confirmation-btn {
  font-size: 1.1rem;
  background-color: $secondary-color;
  color: white;
  padding: 0.8rem 1.2rem;
}

.scan-next-pacient {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1.2rem;
}
</style>
