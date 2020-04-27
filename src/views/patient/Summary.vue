<template>
  <div v-if="currentPatient" class="page-wrapper">
    <NavBar sticky>
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
        v-if="!currentPatient.confirmed"
        class="mx-auto my-4"
        src="@/assets/img/home-page-welcome-img.png"
        alt=""
      />

      <PatientSummary :patient="currentPatient"></PatientSummary>

      <div v-if="!currentPatient.confirmed" class="items-center card">
        <div class="flex flex-row w-full justify-between mb-2">
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

        <div class="flex flex-row w-full justify-between">
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
      </div>

      <!-- FEEDBACK -->
      <!-- <portal to="modals">
        <FeedbackModal
          :open="feedbackModalVisible"
          :liking-app="likingApp"
          @close="feedbackModalClosed"
        ></FeedbackModal>
      </portal>
      <div
        v-if="currentPatient.confirmed && !currentPatient.hasGivenFeedback"
        class="flex flex-col items-center bg-white rounded-2xl px-8 py-4 m-4"
      >
        {{ $t('SUMMARY.DO_YOU_LIKE_OUR_APP') }}?
        <div class="w-full flex justify-around mt-2">
          <button
            href="#"
            class="flex items-center bg-green-500 px-4 py-2 text-white rounded-full"
            @click="showFeedBackModal(true)"
          >
            <ion-icon name="thumbs-up-outline"></ion-icon>
          </button>
          <button
            href="#"
            class="flex items-center bg-red-500 px-4  py-2 text-white rounded-full"
            @click="showFeedBackModal(false)"
          >
            <ion-icon name="thumbs-down-outline"></ion-icon>
          </button>
        </div>
      </div> -->

      <!-- ACCEPT TERMS AND SHOW QR CODE -->
      <div
        v-if="
          (!allIsTrueAgreed || !personalInfoAgreed) && !currentPatient.confirmed
        "
        class="btn-primary w-full max-w-sm flex justify-center mx-4 mb-8 p-8 not-active-qr weird-safari-button-fix"
      >
        {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
      </div>
      <button
        v-else-if="!currentPatient.confirmed"
        class="w-full max-w-sm flex justify-center items-center bg-primary rounded-full text-white text-lg mx-4 mb-8 p-2 weird-safari-button-fix"
        @click="
          !isExpired(currentPatient)
            ? (showModal = true)
            : (showValidityTimeoutModal = true)
        "
      >
        <ion-icon name="qr-code-outline"></ion-icon>
        <div class="ml-2">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
      </button>
      <router-link
        v-if="currentPatient.confirmed"
        to="/patient-qr-code"
        class="w-full max-w-sm flex justify-center items-center bg-primary rounded-full text-white text-lg mx-4 mb-8 p-2 weird-safari-button-fix"
      >
        <ion-icon name="qr-code-outline"></ion-icon>
        <div class="button-text ml-2">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
      </router-link>

      <!-- <router-link to="/" class="link btn-primary icon-button"
        ><ion-icon name="person-add-outline"></ion-icon>
        <div class="button-text">Add another person</div>
      </router-link> -->
      <ModalWindow v-if="showModal && !currentPatient.confirmed">
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
    <router-link to="/"> {{ $t('GO_TO_HOMEPAGE') }}</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PatientSummary from '@/components/PatientSummary'
import ModalWindow from '@/components/ModalWindow'
import Constants from '@/misc/constants'
// import FeedbackModal from '@/components/modals/FeedbackModal'

export default {
  head() {
    return {
      title: {
        inner: this.$t('SUMMARY.SUMMARY')
      }
    }
  },
  components: {
    PatientSummary,
    ModalWindow
    // FeedbackModal
  },
  data: () => ({
    allIsTrueAgreed: false,
    personalInfoAgreed: false,
    showModal: false,
    showValidityTimeoutModal: false,
    feedbackModalVisible: false,
    likingApp: ''
  }),
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },

  mounted() {
    if (this.currentPatient === undefined) {
      this.$router.push('/')
    } else if (
      !this.isExpired(this.currentPatient)
      /* this.currentPatient.validityTimestamp.getTime() +
        Constants.FORM_VALIDITY_PERIOD >
      new Date().getTime() */
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
        `${this.$t('ALERT.DELETE_PATIENT')} ${this.currentPatient.firstName} ${
          this.currentPatient.lastName
        }?`
      )
      if (r === true) {
        this.deletePatientById(this.currentPatient.id).then(() => {
          this.$router.push('/')
        })
      }
    },
    invalidatePatientAndRedirect() {
      this.showValidityTimeoutModal = false
      this.invalidatePatientFormById(this.currentPatient.id).then(() => {
        this.$router.push('/')
      })
    },
    agreedToTerms() {
      this.setCurrentPatientValueByKey({
        key: 'termsAccepted',
        value: this.personalInfoAgreed
      })
    },
    isExpired(patient) {
      if (!patient.validityTimestamp) {
        return false
      }
      const validityTimestamp = new Date(patient.validityTimestamp)
      return (
        !patient.confirmed &&
        (patient.invalid ||
          validityTimestamp.getTime() + Constants.FORM_VALIDITY_PERIOD <
            new Date().getTime())
      )
    },
    showFeedBackModal(like) {
      this.likingApp = like
      this.feedbackModalVisible = true
    },
    feedbackModalClosed() {
      this.feedbackModalVisible = false
      this.setCurrentPatientValueByKey({ key: 'hasGivenFeedback', value: true })
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
