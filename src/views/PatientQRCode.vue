<template>
  <div
    class="main-container"
    :class="{ 'bg-confirmed': currentPatient.confirmed }"
  >
    <NavBar>
      <template v-slot:left>
        <router-link to="/summary"
          ><ion-icon name="close" size="large"></ion-icon
        ></router-link>
      </template>
    </NavBar>
    <div class="main-content">
      <div class="flex flex-col justify-start items-center">
        <h1 class="text-2xl leading-tight">
          {{ $t('PATIENT_QR_CODE.FOLLOW_INSTRUCTIONS') }}
        </h1>
        <img class="w-1/2" src="@/assets/img/scan-code.png" alt="" />
        <p class="my-4">
          <strong>
            {{ $t('PATIENT_QR_CODE.WHEN_ASKED_SHOW_THIS_CODE') }}
          </strong>
        </p>
      </div>
      <div
        v-if="
          currentPatient.confirmation &&
            currentPatient.confirmation.confirmedBy.length > 1 &&
            currentPatient.confirmation.timestamp
        "
        class="is-confirmed"
      >
        <div
          class="confirmation-info"
          :class="{ 'covid-suspedted': currentPatient.isCovidSuspected }"
        >
          <div>
            {{ $t('PATIENT_QR_CODE.CONFIRMED_BY') }}
            {{ currentPatient.confirmation.confirmedBy }}
          </div>
          <div>{{ currentPatient.confirmation.timestamp | formatDate }}</div>
          <div v-if="currentPatient.isCovidSuspected === true">
            {{ $t('PATIENT_QR_CODE.COVID_SUSPECTED') }}
          </div>
          <div v-if="currentPatient.isCovidSuspected === false">
            {{ $t('PATIENT_QR_CODE.COVID_NOT_SUSPECTED') }}
          </div>
        </div>
      </div>
      <!-- {{ currentPatient.firstName + ' ' + currentPatient.lastName }} -->
      <QrcodeVue
        class="qrcode"
        :value="stringyfiedPatient"
        size="300"
        level="H"
      ></QrcodeVue>

      <router-link
        v-if="!currentPatient.confirmed"
        class="link btn-primary scan-confirmation-btn icon-button mb-3"
        to="/scan-confirmation-qr-code"
        ><ion-icon name="scan-outline"></ion-icon>
        <div class="button-text">
          {{ $t('PATIENT_QR_CODE.SCAN_CONFIRMATION') }}
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QrcodeVue },
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
              'finished'
            ].indexOf(key) > -1
        )
        .reduce(
          (res, key) => Object.assign(res, { [key]: this.currentPatient[key] }),
          {}
        )

      return JSON.stringify(filteredPatient)
    }
  },
  created() {
    if (!this.currentPatient) {
      this.$router.push('/home')
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
  @supports (-webkit-appearance: none) {
    .os-android & {
      min-height: calc(100vh - 56px);
    }
  }
}

.button-qr-close {
  margin: 0 0 1em 0;
}

.scan-confirmation-btn {
  background-color: $secondary-color;
  display: flex;
  align-items: center;
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

.qrcode {
  background-color: white;
  padding: 2rem;
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
