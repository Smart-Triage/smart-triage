<template>
  <div v-if="user" class="page-wrapper">
    <NavBar v-if="!scanning && !showingConfirmationQR && !showPatientSummary">
      <template v-slot:right>
        <div class="flex items-center text-gray-700">
          <ion-icon name="person-circle-outline" size="large"></ion-icon>
          <span class="ml-2 font-semibold">{{ fullName }}</span>
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
          <template v-slot:center>
            <span>{{ $t('EMPLOYEE.SCAN_PATIENT') }}</span>
          </template>
        </NavBar>
      </template>
      <template v-slot:body>
        <QRScanner :only-valid-patient="true" @data="addPatient"></QRScanner>
      </template>
    </FullScreenModal>

    <div class="page-content" style="display:block">
      <!-- EMPLOYEE HOMEPAGE -->
      <div
        v-if="!scanning && !showingConfirmationQR && !showPatientSummary"
        class="header-info"
      >
        <h1>{{ appTitle }}</h1>
        <p class="my-4">{{ $t('EMPLOYEE.WELCOME') }}</p>

        <img
          src="@/assets/img/hand-holding-phone-scanning-qr-code.png"
          alt="Scanning a QR code"
        />

        <!-- SCAN NEXT PATIENT -->
        <button class="btn-primary flex items-center m-4" @click="scan">
          <ion-icon name="scan-outline"></ion-icon>
          <span class="ml-2">{{ $t('EMPLOYEE.SCAN_NEXT_PATIENT') }}</span>
        </button>

        <!-- FILL PATIENT DATA MANUALLY -->
        <!-- <button
          class="btn-primary flex items-center m-4"
          @click="fillPatientManually"
        >
          <ion-icon name="scan-outline"></ion-icon>
          <span class="ml-2">{{ $t('EMPLOYEE.FILL_PATIENT_MANUALLY') }}</span>
        </button> -->

        <div class="bottom-link">
          <router-link class="employee-page-link" to="/how-it-works">{{
            $t('HOME.HOW_IT_WORKS')
          }}</router-link>
          <router-link class="employee-page-link" to="/settings">{{
            $t('HOME.SETTINGS')
          }}</router-link>
        </div>
      </div>

      <!-- EMPLOYEE - PATIENT SUMMARY PAGE -->
      <div
        v-if="showPatientSummary && currentPatient !== null"
        class="w-full max-w-md summary-view"
      >
        <NavBar>
          <template v-slot:center>
            <span v-if="showPatientSummary">
              {{ $t('EMPLOYEE.PATIENT_SUMMARY') }}
            </span>
          </template>
          <template v-slot:left>
            <button class="icon-button" @click="showEmployeeHomepage">
              <ion-icon name="close-outline" size="large"></ion-icon>
            </button>
          </template>
        </NavBar>

        <PatientSummary :patient="currentPatient"></PatientSummary>

        <div
          v-if="currentPatient && currentPatient.confirmation === undefined"
          class="temperature-input w-full rounded-full px-4 sm:px-8 py-2 mb-8 mt-2 flex items-center font-semibold"
        >
          <label for="enter-temperature">
            {{ $t('EMPLOYEE.ENTER_TEMPERATURE') }}:
          </label>
          <input
            id="enter-temperature"
            :value="currentPatient.measuredTemperature"
            type="number"
            min="36"
            max="42"
            step="0.1"
            class="flex-grow p-2 rounded-full ml-4 text-center"
            required
            @input="setMeasuredTemperature($event.target.value)"
          />
        </div>

        <div
          v-else
          class="temperature-input w-full rounded-full px-4 sm:px-8 py-2 mb-8 mt-2 flex items-center font-semibold"
        >
          <label for="measured-temperature">
            {{ $t('EMPLOYEE.MEASURED_TEMPERATURE') }}
          </label>
          <input
            id="measured-temperature"
            :value="currentPatient.measuredTemperature"
            type="number"
            min="36"
            max="42"
            step="0.1"
            class="flex-grow p-2 rounded-full ml-4 text-center"
            disabled
          />
        </div>
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
        class="flex flex-col items-center pb-4 pt-4 bg-white rounded-t-xl"
      >
        <div class="w-full font-semibold text-lg">
          {{ $t('EMPLOYEE.IS_INFECTION_SUSPECTED') }}
        </div>
        <div class="w-full flex justify-around items-center my-2">
          <button
            :class="{
              'bg-primary text-white': isCovidSuspected === true,
              'bg-gray-300 text-black': isCovidSuspected !== true
            }"
            class="flex icon-button px-12 py-2 rounded-full cursor-pointer"
            @click="isCovidSuspected = true"
          >
            {{ $t('YES') }}
          </button>

          <button
            :class="{
              'bg-primary text-white': isCovidSuspected === false,
              'bg-gray-300 text-black': isCovidSuspected !== false
            }"
            class="flex icon-button px-12 py-2 rounded-full cursor-pointer"
            @click="isCovidSuspected = false"
          >
            {{ $t('NO') }}
          </button>
        </div>
        <button
          class="flex items-center px-8 py-2 mt-8 rounded-full bg-secondary text-white text-lg disabled:opacity-50"
          :disabled="isCovidSuspected === null"
          @click="viewConfirmationQR"
        >
          <ion-icon
            v-if="isCovidSuspected !== null"
            name="checkmark-outline"
          ></ion-icon>
          <div v-if="isCovidSuspected !== null" class="ml-2">
            {{ $t('EMPLOYEE.CONFIRM') }}
          </div>
          <div v-else>
            {{ $t('EMPLOYEE.SELECT_INFECTION_SUSPECTION') }}
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
    patientTemperature: null,
    isCovidSuspected: null
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
      this.isCovidSuspected = null
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
    async viewConfirmationQR() {
      await this.setCurrentPatientValueByKey({
        key: 'confirmed',
        value: true
      })
      await this.setCurrentPatientValueByKey({
        key: 'confirmation',
        value: {
          confirmedByName: this.fullName,
          confirmedById: this.user.id,
          timestamp: new Date()
        }
      })
      await this.setCurrentPatientValueByKey({
        key: 'isCovidSuspected',
        value: this.isCovidSuspected
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
    },
    setMeasuredTemperature(temperature) {
      this.setCurrentPatientValueByKey({
        key: 'measuredTemperature',
        value: temperature
      })
    },
    fillPatientManually() {
      this.$router.push('/form')
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

.temperature-input {
  background-color: #32227f15;
  color: $secondary-color;
}
</style>
