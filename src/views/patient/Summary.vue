<template>
  <div v-if="currentPatient" class="page-wrapper">
    <NavBar>
      <template v-slot:left>
        <router-link to="/home">
          <ion-icon name="close" size="large"></ion-icon>
        </router-link>
      </template>
      <template v-slot:center>
        {{ $t('SUMMARY.SUMMARY') }}
      </template>
      <template v-slot:right>
        <button class="icon-button" @click="deletePatient">
          <ion-icon name="trash-outline" size="large"></ion-icon>
        </button>
      </template>
    </NavBar>

    <div class="page-content">
      <img
        class="mx-auto my-4"
        src="@/assets/img/home-page-welcome-img.png"
        alt=""
      />

      <PatientSummary :patient="currentPatient"></PatientSummary>

      <div v-if="!currentPatient.confirmed" class="items-center card">
        <div class="flex flex-row w-full justify-between mb-2">
          <p class="text-left text-xs">
            {{ $t('SUMMARY.PERSONAL_INFORMATION') }}
          </p>
          <div>
            <input
              id="agree"
              v-model="personalInfoAgreed"
              type="checkbox"
              value="agree"
              class="m-4 self-center"
            />
          </div>
        </div>
        <div class="flex flex-row w-full justify-between">
          <p class="text-left text-xs">
            {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_TXT') }}
          </p>

          <div>
            <input
              id="agree2"
              v-model="allIsTrueAgreed"
              type="checkbox"
              value="agree"
              class="m-4 self-center"
              @change="agreedToTerms()"
            />
          </div>
        </div>
      </div>

      <div
        v-if="
          (!allIsTrueAgreed || !personalInfoAgreed) && !currentPatient.confirmed
        "
        class="btn-primary w-full max-w-sm flex justify-center mx-4 mb-8 p-8 not-active-qr weird-safari-button-fix"
      >
        {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
      </div>
      <button
        v-else
        class="btn-primary icon-button w-full max-w-sm flex justify-center mx-4 mb-8 p-4 weird-safari-button-fix"
        @click="showModal = true"
      >
        <ion-icon name="qr-code-outline"></ion-icon>
        <div class="button-text">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
      </button>

      <!-- <router-link to="/home" class="link btn-primary icon-button"
        ><ion-icon name="person-add-outline"></ion-icon>
        <div class="button-text">Add another person</div>
      </router-link> -->
      <ModalWindow v-if="showModal">
        <template v-slot:header>
          <h2 class="p-0">{{ $t('SUMMARY.WARNING') }}</h2>
        </template>
        <template v-slot:body>
          <p>
            {{ $t('SUMMARY.WARNING_TEXT') }}
          </p>
        </template>
        <template v-slot:footer>
          <button class="btn-secondary mb-3" @click="showModal = false">
            {{ $t('BACK') }}
          </button>
          <router-link to="/patient-qr-code" class="btn-primary">
            <div class="button-text">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
          </router-link>
        </template>
      </ModalWindow>
      <ModalWindow v-if="showValidityTimeoutModal">
        <template v-slot:header>
          <h2 class="p-0">{{ $t('SUMMARY.VALIDITY_TIMEOUT') }}</h2>
        </template>
        <template v-slot:body>
          <p>
            {{ $t('SUMMARY.VALIDITY_TIMEOUT_TEXT') }}
          </p>
        </template>
        <template v-slot:footer>
          <button
            class="btn-secondary mb-3"
            @click="invalidatePatientAndRedirect"
          >
            {{ $t('SUMMARY.VALIDITY_TIMEOUT_CONFIRMATION') }}
          </button>
        </template>
      </ModalWindow>
    </div>
  </div>
  <div v-else>
    <p>{{ $t('SOMETHING_WENT_WRONG') }}</p>
    <router-link to="/home"> {{ $t('GO_TO_HOMEPAGE') }}</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PatientSummary from '@/components/PatientSummary'
import ModalWindow from '@/components/ModalWindow'
import Constants from '@/misc/constants'

export default {
  components: { PatientSummary, ModalWindow },
  data: () => ({
    allIsTrueAgreed: false,
    personalInfoAgreed: false,
    showModal: false,
    showValidityTimeoutModal: false
  }),
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },

  mounted() {
    if (this.currentPatient === undefined) {
      this.$router.push('/home')
    } else if (
      this.currentPatient.validityTimestamp + Constants.FORM_VALIDITY_PERIOD >
      new Date().getTime()
    ) {
      this.setCurrentPatientValueByKey({ key: 'finished', value: true })
    } else {
      // 24 hour validity period ran out, inform the user and make him go back
      this.showValidityTimeoutModal = true
    }
  },
  methods: {
    ...mapActions('patients', [
      'deletePatientById',
      'invalidatePatientFormById'
    ]),
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    deletePatient(e) {
      e.stopPropagation()
      // eslint-disable-next-line no-alert
      const r = window.confirm(
        `Delete patient ${this.currentPatient.firstName} ${this.currentPatient.lastName}?`
      )
      if (r === true) {
        this.deletePatientById(this.currentPatient.id).then(() => {
          this.$router.push('/home')
        })
      }
    },
    invalidatePatientAndRedirect() {
      this.showValidityTimeoutModal = false
      this.invalidatePatientFormById(this.currentPatient.id).then(() => {
        this.$router.push('/home')
      })
    },
    agreedToTerms() {
      this.setCurrentPatientValueByKey({
        key: 'termsAccepted',
        value: this.personalInfoAgreed
      })
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
  align-items: center;
}

.buttons {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
}

.link {
  font-size: 1em;
  padding: 0.5em 1em;
  margin: 0 0.5em 2em 0.5em;
}

.top-sumary {
  text-align: center;
}

.not-active-qr {
  background-color: #d5d8de;
  color: #0d1f3c;
}

.card {
  @apply my-8;
}

.weird-safari-button-fix {
  min-height: 3rem;
}
</style>
