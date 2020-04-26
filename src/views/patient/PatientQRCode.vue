<template>
  <div
    class="page-wrapper"
    :class="{ 'bg-confirmed': currentPatient.confirmed }"
  >
    <NavBar bg-transparent>
      <template v-slot:left>
        <router-link
          to="/summary"
          :class="{ 'text-white': currentPatient.confirmed }"
          ><ion-icon name="close" size="large"></ion-icon
        ></router-link>
      </template>
    </NavBar>
    <div class="page-content">
      <p class="text-xl leading-tight">
        {{ $t('PATIENT_QR_CODE.FOLLOW_INSTRUCTIONS') }}
      </p>
      <p class="my-4">
        <strong>
          {{ $t('PATIENT_QR_CODE.WHEN_ASKED_SHOW_THIS_CODE') }}
        </strong>
      </p>

      <!-- QR CODE -->
      <div class="bg-white p-4">
        <QrcodeVue
          :value="stringyfiedPatient"
          :size="qrCodeSize"
          level="M"
        ></QrcodeVue>
      </div>

      <!-- CONFIRMATION BOX -->
      <div v-if="isConfirmed" class="is-confirmed w-full mt-4">
        <ConfirmationBox :patient="currentPatient"></ConfirmationBox>
      </div>

      <router-link
        v-if="!currentPatient.confirmed"
        class="flex-shrink-0 flex items-center bg-secondary text-lg text-white rounded-full px-8 py-3 my-6"
        to="/scan-confirmation-qr-code"
      >
        <ion-icon name="scan-outline"></ion-icon>
        <span class="ml-2">
          {{ $t('PATIENT_QR_CODE.SCAN_CONFIRMATION') }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'
import ConfirmationBox from '@/components/ConfirmationBox'

export default {
  components: { QrcodeVue, ConfirmationBox },
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    stringyfiedPatient() {
      const filteredPatient = Object.keys(this.currentPatient)
        .filter(
          key =>
            [
              'id',
              'firstName',
              'lastName',
              'birthNumber',
              'phoneNumber',
              'answers',
              'confirmed',
              'confirmation',
              'isCovidSuspected',
              'finished',
              'signature',
              'termsAccepted',
              'measuredTemperature',
              'validityTimestamp'
            ].indexOf(key) > -1
        )
        .reduce(
          (res, key) => Object.assign(res, { [key]: this.currentPatient[key] }),
          {}
        )

      return JSON.stringify(filteredPatient)
    },
    isConfirmed() {
      return !!(
        this.currentPatient.confirmation &&
        this.currentPatient.confirmation.confirmedById.length > 1 &&
        this.currentPatient.confirmation.timestamp
      )
    },
    qrCodeSize() {
      if (window.innerWidth < 400) return window.innerWidth * 0.85
      if (window.innerWidth < 500) return window.innerWidth * 0.8
      return 400
    }
  },
  created() {
    if (!this.currentPatient) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3rem;
  height: 100%;
  min-height: 100vh;
}

.button-qr-close {
  margin: 0 0 1em 0;
}

.scan-confirmation-btn {
  background-color: $secondary-color;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
}

.home-page-top-img {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 1.6em;
    padding: 1em 2em 0 2em;
  }
  img {
    margin: 0;
  }
}

.bg-confirmed {
  background-color: $secondary-color;
  color: white;
}

.confirmation-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: $positive-color;
  color: white;
  border-radius: 5rem;
  margin: 0 1rem;

  &.covid-suspedted {
    background-color: $negative-color;
  }
}
</style>
