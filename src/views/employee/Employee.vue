<template>
  <div v-if="user" class="page-wrapper">
    <NavBar v-if="!scanning && !showingConfirmationQR && !showPatientSummary">
      <template v-slot:right>
        <div class="flex items-center">
          <ion-icon name="person-circle-outline" size="large"></ion-icon>
          <span class="ml-2">{{ fullName }}</span>
        </div>
      </template>
    </NavBar>
    <FullScreenModal v-if="scanning">
      <template v-slot:header>
        <NavBar :bg-transparent="true">
          <template v-slot:left>
            <button class="text-black" @click="showEmployeeHomepage">
              <ion-icon name="arrow-back-outline" size="large"></ion-icon>
            </button>
          </template>
        </NavBar>
      </template>
      <template v-slot:body>
        <QRScanner :only-valid-patient="true" @data="addPatient"></QRScanner>
      </template>
    </FullScreenModal>

    <div class="page-content" style="display:block">
      <div
        v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
        class="header-info"
      >
        <h1>{{ appTitle }}</h1>
        <p class="my-4">{{ $t('EMPLOYEE.WELCOME') }}</p>

        <img
          src="@/assets/img/hand-holding-phone-scanning-qr-code.png"
          alt=""
        />
      </div>
      <p v-if="!scanning && !showingConfirmationQR && !showPatientSummary">
        {{ $t('EMPLOYEE.TAP_SCAN_TO_BEGIN') }}
      </p>

      <div
        v-if="showPatientSummary && currentPatient !== null"
        class="w-full max-w-md summary-view"
      >
        <NavBar>
          <template v-slot:left>
            <button class="icon-button" @click="showEmployeeHomepage">
              <ion-icon name="close-outline" size="large"></ion-icon>
            </button>
          </template>
        </NavBar>
        <h1 class="mb-4">{{ $t('EMPLOYEE.PATIENT_SUMMARY') }}</h1>

        <PatientSummary :patient="currentPatient"></PatientSummary>

        <div
          v-if="currentPatient && currentPatient.confirmation === undefined"
          class="temperature-input w-full rounded-full px-4 sm:px-8 py-2 mb-8 flex items-center font-semibold"
        >
          <label for="enter-temperature">
            {{ $t('EMPLOYEE.ENTER_TEMPERATURE') }}:
          </label>
          <input
            id="enter-temperature"
            v-model="patientTemperature"
            type="number"
            min="36"
            max="42"
            step="0.1"
            class="flex-grow p-2 rounded-full ml-4 text-center"
            required
          />
        </div>

        <div
          v-else
          class="temperature-input w-full rounded-full px-4 sm:px-8 py-2 mb-8 flex items-center font-semibold"
        >
          <label for="measured-temperature">
            {{ $t('EMPLOYEE.MEASURED_TEMPERATURE') }}
          </label>
          <input
            id="measured-temperature"
            :value="currentPatient.confirmation.measuredTemperature"
            type="number"
            min="36"
            max="42"
            step="0.1"
            class="flex-grow p-2 rounded-full ml-4 text-center"
            disabled
          />
        </div>
        <!-- <RiskScale
        :value="currentPatient.totalPoints"
        :max="getMaxPoints"
      ></RiskScale> -->
      </div>

      <!-- <router-link
      class="link icon-button"
      to="print-barcode"
      ><ion-icon name="barcode-outline"></ion-icon><div class="button-text">Print barcode</div></router-link
    > -->
      <div
        v-if="
          showPatientSummary &&
            currentPatient &&
            currentPatient.isCovidSuspected === undefined
        "
        class="confirmation-buttons pb-12"
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
        <h1>{{ $t('EMPLOYEE.PATIENT_CONFIRMATION_CODE') }}</h1>
        <qrcode-vue
          class="qrcode bg-white p-4 m-2"
          :value="signedPatient"
          size="300"
          level="H"
        ></qrcode-vue>
        <button class="link btn-primary" @click="closePatient">
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
      </div>
      <div
        v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
        class="bottom-link"
      >
        <router-link class="employee-page-link" to="/how-it-works">{{
          $t('HOME.HOW_IT_WORKS')
        }}</router-link>
        <router-link class="employee-page-link" to="/settings">{{
          $t('HOME.SETTINGS')
        }}</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import QRScanner from '@/components/QRSanner'
import PatientSummary from '@/components/PatientSummary'
// import RiskScale from '@/components/RiskScale'
import KeyStore from '@/misc/KeyStore'
import { str2ab, ab2str } from '@/misc/helpers'
import FullScreenModal from '@/components/modals/FullScreenModal'

export default {
  components: {
    QRScanner,
    PatientSummary,
    QrcodeVue,
    FullScreenModal
    // RiskScale
  },
  data: () => ({
    scanning: false,
    showingConfirmationQR: false,
    scannedAtLeastOnce: false,
    showPatientSummary: false,
    signedPatient: null,
    patientTemperature: null
  }),
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapGetters('patients', ['currentPatient']),
    ...mapGetters('questions', ['getMaxPoints', 'getFormSteps']),
    ...mapState('authentication', ['user']),
    ...mapState('employee', ['fullName'])
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
    this.setAppMode('employee')
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
    ...mapActions('settings', ['setAppMode']),
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    ...mapActions('patients', ['updateOrAddPatient', 'deletePatientById']),
    addPatient(patient) {
      this.scanning = false
      this.scannedAtLeastOnce = true
      patient.isScannedByEmployee = true
      this.updateOrAddPatient(patient)
      this.recalculatePoints()
      this.viewPatientSummary()
    },
    showEmployeeHomepage() {
      this.scanning = false
      this.showingConfirmationQR = false
      this.showPatientSummary = false
      this.$router.push('')
    },
    closePatient() {
      this.deletePatientById(this.currentPatient.id)
      this.showEmployeeHomepage()
    },
    scan() {
      this.scanning = true
      this.$router.push('#scanning')
    },
    async viewConfirmationQR(isCovidSuspected) {
      await this.setCurrentPatientValueByKey({
        key: 'confirmed',
        value: true
      })
      await this.setCurrentPatientValueByKey({
        key: 'confirmation',
        value: {
          confirmedByName: 'Jan Novák',
          confirmedById: this.user.id,
          timestamp: new Date(),
          measuredTemperature: this.patientTemperature
        }
      })
      await this.setCurrentPatientValueByKey({
        key: 'isCovidSuspected',
        value: isCovidSuspected
      })

      // SIGN THE CONFIRMATION
      const signedData = await this.signConfirmation(
        JSON.stringify(this.currentPatient)
      )
      if (signedData) {
        this.signedPatient = JSON.stringify(signedData)
        this.showingConfirmationQR = true
        this.$router.push('#confirmation-qr-code')
        return true
      }

      // eslint-disable-next-line no-alert
      alert('Error signing confirmation')
      return false
    },
    async signConfirmation(dataToSign) {
      const keyStore = new KeyStore()
      await keyStore.open()
      const keyFromStore = (await keyStore.listKeys()).find(
        key => key.value.name === 'EMPLOYEE_PRIVATE_KEY'
      )

      if (!keyFromStore) {
        // eslint-disable-next-line no-alert
        alert('Error: Private key not found')
        return false
      }

      console.log(keyFromStore)
      console.log('dataToSign: ', dataToSign)

      return window.crypto.subtle
        .sign(
          {
            name: 'ECDSA',
            hash: { name: 'SHA-256' } // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
          },
          keyFromStore.value.privateKey, // from generateKey or importKey above
          str2ab(dataToSign) // ArrayBuffer of data you want to sign
        )
        .then(signature => {
          // returns an ArrayBuffer containing the signature
          console.log(new Uint8Array(signature))
          const signedData = {
            ...JSON.parse(dataToSign),
            signature: ab2str(signature)
          }
          console.log(signedData)
          return signedData
        })
        .catch(err => {
          console.error(err)
          return false
        })
    },
    viewPatientSummary() {
      this.showPatientSummary = true
      this.$router.push('#patient-summary')
    },
    async recalculatePoints() {
      let totalPoints = 0
      this.getFormSteps.forEach(step => {
        const answer = this.currentPatient.answers[
          Object.keys(this.currentPatient.answers).find(
            key => key === step.order
          )
        ]

        if (step.answerType === 'boolean') {
          totalPoints +=
            (answer === true ? step.pointsIfPositive : step.pointsIfNegative) ||
            0
        }

        if (step.answerType === 'slider') {
          totalPoints +=
            answer >= step.pointsIfValueIsHigherThan.treshold
              ? step.pointsIfValueIsHigherThan.points
              : 0
        }

        if (step.answerType === 'checkbox') {
          step.options.forEach(option => {
            if (answer.find(a => a.value === option.value).isChecked)
              totalPoints += option.pointsIfChecked
          })
        }
      })

      await this.setCurrentPatientValueByKey({
        key: 'totalPoints',
        value: totalPoints
      })
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

.temperature-input {
  background-color: #32227f15;
  color: $secondary-color;
}
</style>
