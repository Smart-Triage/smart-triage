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
      <h1>{{ appTitle }}</h1>
      <p>{{ $t('EMPLOYEE.WELCOME') }}</p>

      <img src="@/assets/img/hand-holding-phone-scanning-qr-code.png" alt="" />

      <p>{{ $t('EMPLOYEE.TAP_SCAN_TO_BEGIN') }}</p>
    </div>

    <div v-if="showPatientSummary && currentPatient" class="summary-view">
      <div class="top-buttons">
        <button class="icon-button" @click="showEmployeeHomepage">
          <ion-icon name="close-outline" size="large"></ion-icon>
        </button>
      </div>
      <h1>{{ $t('EMPLOYEE.PATIENT_SUMMARY') }}</h1>

      <PatientSummary :employee="true"></PatientSummary>
    </div>

    <!-- <router-link
      class="link icon-button"
      to="print-barcode"
      ><ion-icon name="barcode-outline"></ion-icon><div class="button-text">Print barcode</div></router-link
    > -->
    <div
      v-if="showPatientSummary && currentPatient.isCovidSuspected === undefined"
      class="confirmation-buttons"
    >
      <button
        class="btn-primary show-confirmation-btn patient-suspect icon-button"
        @click="viewConfirmationQR(true)"
      >
        <ion-icon name="checkmark-outline"></ion-icon>
        <div class="button-text">
          {{ $t('EMPLOYEE.CONFIRM_AS_COVID_SUSPECT') }}
        </div>
      </button>

      <button
        class="btn-primary show-confirmation-btn patient-non-suspect icon-button"
        @click="viewConfirmationQR(false)"
      >
        <ion-icon name="checkmark-outline"></ion-icon>
        <div class="button-text">
          {{ $t('EMPLOYEE.CONFIRM_AS_COVID_NON_SUSPECT') }}
        </div>
      </button>
    </div>

    <div v-if="showingConfirmationQR" class="confirmation-view">
      <div class="top-buttons">
        <button @click="viewPatientSummary">
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </button>
      </div>
      <h1>{{ $t('EMPLOYEE.PATIENT_CONFIRMATION_CODE') }}</h1>
      <qrcode-vue
        class="qrcode"
        :value="confirmedPatient"
        size="300"
        level="H"
      ></qrcode-vue>
      <button class="link btn-primary" @click="showEmployeeHomepage">
        {{ $t('EMPLOYEE.CLOSE_PATIENT') }}
      </button>
    </div>

    <div
      v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
      class="employee-page-buttons"
    >
      <button class="btn-primary scan-next-patient icon-button" @click="scan">
        <ion-icon name="scan-outline"></ion-icon>
        <div class="button-text">{{ $t('EMPLOYEE.SCAN_NEXT_PATIENT') }}</div>
      </button>

      <div class="spacer"></div>

      <div class="employee-page-bottom-links">
        <router-link class="employee-page-link" to="/how-it-works">{{
          $t('HOME.HOW_IT_WORKS')
        }}</router-link>
        <router-link class="employee-page-link" to="/about">{{
          $t('HOME.ABOUT')
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import QRScanner from '@/components/QRSanner'
import PatientSummary from '@/components/PatientSummary'

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
    ...mapState('app', ['appTitle']),
    ...mapGetters('patients', ['currentPatient']),
    confirmedPatient() {
      if (this.currentPatient) return JSON.stringify(this.currentPatient)
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
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
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
    viewConfirmationQR(isCovidSuspected) {
      this.setCurrentPatientValueByKey({
        key: 'confirmed',
        value: true
      })
      this.setCurrentPatientValueByKey({
        key: 'confirmation',
        value: {
          confirmedBy: 'Jan Novák',
          timestamp: new Date()
        }
      })
      this.setCurrentPatientValueByKey({
        key: 'isCovidSuspected',
        value: isCovidSuspected
      })
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
  min-height: calc(100vh - 34px);
}

.top-buttons {
  width: 100%;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;

  img {
    max-width: 20rem;
  }
}

.summary-view,
.confirmation-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.confirmation-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.show-confirmation-btn {
  cursor: pointer;
  font-size: 1.1rem;
  background-color: $primary-color;
  color: white;
  padding: 0.8rem 1.5rem 0.8rem 1.2rem;
  margin: 0.5rem 0;

  &.patient-suspect {
    background-color: $negative-color;
  }

  &.patient-non-suspect {
    background-color: $positive-color;
  }
}

.scan-next-patient {
  font-size: 1rem;
  margin-bottom: 2rem;
  padding: 0.8rem 1.2rem;
  color: white;

  .button-text {
    font-size: 1rem;
  }
}

.employee-page-buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  .spacer {
    flex-grow: 1;
  }
}

.employee-page-bottom-links {
  display: flex;

  .employee-page-link {
    text-decoration: none;
    color: $main-text-color;
    font-weight: 400;
    align-self: flex-end;
    margin: 1em 1.5em 1em 1.5em;
  }
}
</style>
