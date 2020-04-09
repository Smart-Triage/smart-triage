<template>
  <div v-if="currentPatient" class="main-container">
    <NavBar>
      <template v-slot:left>
        <router-link to="/home">
          <ion-icon name="close" size="large"></ion-icon>
        </router-link>
      </template>
      <template v-slot:right>
        <button class="icon-button" @click="deletePatient">
          <ion-icon name="trash-outline" size="large"></ion-icon>
        </button>
      </template>
    </NavBar>

    <h1 class="page-title">{{ $t('SUMMARY.SUMMARY') }}</h1>
    <img
      class="mx-auto my-4"
      src="@/assets/img/home-page-welcome-img.png"
      alt=""
    />

    <PatientSummary :patient="currentPatient"></PatientSummary>

    <div
      v-if="!currentPatient.confirmed"
      class="flex flex-col items-center card"
    >
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
      class="link btn-primary icon-button show-qr-code-btn not-active-qr"
    >
      <div>
        {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
      </div>
    </div>
    <button
      v-else
      class="link btn-primary icon-button show-qr-code-btn"
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

export default {
  components: { PatientSummary, ModalWindow },
  data: () => ({
    allIsTrueAgreed: false,
    personalInfoAgreed: false,
    showModal: false
  }),
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },

  mounted() {
    if (this.currentPatient === undefined) {
      this.$router.push('/home')
    } else {
      this.setCurrentPatientValueByKey({ key: 'finished', value: true })
    }
  },
  methods: {
    ...mapActions('patients', ['deletePatientById']),
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

.show-qr-code-btn {
  padding: 1rem;
  width: calc(100% - 2em);
  max-width: 25rem;
  display: flex;
  justify-content: center;
  margin-left: 1em;
  margin-right: 1em;
}

.not-active-qr {
  background-color: #d5d8de;
  color: #0d1f3c;
}

.card {
  @apply my-8;
}
</style>
