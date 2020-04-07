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
    <div class="main-content">
      <div class="top-sumary">
        <h1 class="page-title">{{ $t('SUMMARY.SUMMARY') }}</h1>
        <img
          class="mx-auto"
          src="@/assets/img/home-page-welcome-img.png"
          alt=""
        />
      </div>
      <PatientSummary :patient="currentPatient"></PatientSummary>

      <div
        v-if="!currentPatient.confirmed"
        class="flex items-center my-3 mx-6 card"
      >
        <p class="text-left text-xs">
          {{ $t('SUMMARY.PERSONAL_INFORMATION') }}
        </p>
        <input
          id="agree"
          v-model="personalInfoAgreed"
          type="checkbox"
          value="agree"
          class="m-4"
        />
      </div>

      <div
        v-if="!currentPatient.confirmed"
        class="flex items-center my-3 mx-6 card"
      >
        <p class="text-left text-xs">
          {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_TXT') }}
        </p>
        <input
          id="agree2"
          v-model="allIsTrueAgreed"
          type="checkbox"
          value="agree"
          class="m-4"
          @change="agreedToTerms()"
        />
      </div>

      <router-link
        v-if="
          (!allIsTrueAgreed || !personalInfoAgreed) && !currentPatient.confirmed
        "
        to="/summary"
        class="link btn-primary icon-button show-qr-code-btn not-active-qr"
      >
        <div>
          {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
        </div>
      </router-link>
      <router-link
        v-else
        to="/patient-qr-code"
        class="link btn-primary icon-button show-qr-code-btn"
      >
        <ion-icon name="qr-code-outline"></ion-icon>
        <div class="button-text">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
      </router-link>

      <!-- <router-link to="/home" class="link btn-primary icon-button"
        ><ion-icon name="person-add-outline"></ion-icon>
        <div class="button-text">Add another person</div>
      </router-link> -->
    </div>
    <ModalWindow v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <h2 class="p-0">Upozornení</h2>
      </template>
      <template v-slot:body>
        <p>
          Tyto informace zjišťujeme za účelem snížení rizika přenosu infekce
          virem COVID-19 ve zdravotnickém zařízení. Uvedení nepravdivých
          informací může být posuzováno jako trestný čin.
        </p>
      </template>
      <template v-slot:footer>
        <button class="btn-primary" @click="$emit('close')">
          Souhlasím
        </button>
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
      if (this.allIsTrueAgreed) {
        this.showModal = true
      }
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
  // background-color: $secondary-color;
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
</style>
