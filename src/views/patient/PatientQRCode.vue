<template>
  <div
    class="page-wrapper"
    :class="{ 'bg-confirmed': isConfirmed(currentPatient) }"
  >
    <NavBar bg-transparent>
      <template v-slot:left>
        <router-link
          to="/summary"
          :class="{ 'text-white': isConfirmed(currentPatient) }"
          ><ion-icon name="close" size="large"></ion-icon
        ></router-link>
      </template>
    </NavBar>
    <div class="page-content">
      <!-- <p class="text-xl leading-tight">
        {{ $t('PATIENT_QR_CODE.FOLLOW_INSTRUCTIONS') }}
      </p> -->
      <strong class="flex-grow">
        {{ $t('PATIENT_QR_CODE.WHEN_ASKED_SHOW_THIS_CODE') }}
      </strong>

      <strong class="flex-shrink">
        {{ `${currentPatient.firstName} ${currentPatient.lastName}` }}
      </strong>
      <!-- QR CODE -->
      <div class="bg-white p-4 mb-6 mt-2">
        <QrcodeVue
          :value="stringifyPatient(currentPatient)"
          :size="qrCodeSize"
          :level="qrLevel"
        ></QrcodeVue>
        <!-- <div class="w-full flex justify-around my-4">
          <button class="px-2 py-1 rounded bg-white" @click="qrLevel = 'L'">
            Level L
          </button>
          <button class="px-2 py-1 rounded bg-white" @click="qrLevel = 'M'">
            Level M
          </button>
          <button class="px-2 py-1 rounded bg-white" @click="qrLevel = 'Q'">
            Level Q
          </button>
          <button class="px-2 py-1 rounded bg-white" @click="qrLevel = 'H'">
            Level H
          </button>
        </div> -->
      </div>

      <!-- CONFIRMATION BOX -->
      <div v-if="isConfirmed(currentPatient)" class="is-confirmed w-full mt-4">
        <ConfirmationBox :patient="currentPatient"></ConfirmationBox>
      </div>

      <div class="flex-grow">
        <router-link
          v-if="!isConfirmed(currentPatient)"
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
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'
import ConfirmationBox from '@/components/ConfirmationBox'
import { isConfirmedMixin, stringifyPatientMixin } from '@/mixins'

export default {
  components: { QrcodeVue, ConfirmationBox },
  head() {
    return {
      title: {
        inner: this.$t('PATIENT_QR_CODE.TITLE')
      }
    }
  },
  mixins: [stringifyPatientMixin, isConfirmedMixin],
  data: () => ({
    qrLevel: 'H'
  }),
  computed: {
    ...mapGetters('patients', ['currentPatient']),
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
  },
  methods: {
    getPatientFullName() {
      return `${this.currentPatient.firstName} ${this.currentPatient.lastName}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

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
