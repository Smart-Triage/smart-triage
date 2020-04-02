<template>
  <div v-if="currentPatient" class="container">
    <div class="top-sumary">
      <div class="top-buttons">
        <router-link to="/home">
          <ion-icon name="close" size="large"></ion-icon>
        </router-link>
        <div class="spacer"></div>
        <button class="icon-button" @click="deletePatient">
          <ion-icon name="trash-outline" size="large"></ion-icon>
        </button>
      </div>
      <h1 class="page-title">{{ $t('SUMMARY.SUMMARY') }}</h1>
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>
    <PatientSummary></PatientSummary>

    <hr />

    <div class="buttons">
      <router-link
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
  </div>
  <div v-else>
    <p>{{ $t('SOMETHING_WENT_WRONG') }}</p>
    <router-link to="/home"> {{ $t('GO_TO_HOMEPAGE') }}</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PatientSummary from '@/components/PatientSummary'

export default {
  components: { PatientSummary },
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
  margin: 1.5em 0;
}

.top-buttons {
  position: absolute;
  top: 1.5rem;
  left: 0;
  width: 100%;
  display: flex;
  padding: 1rem;

  .spacer {
    flex-grow: 1;
  }
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
  width: 100%;
  max-width: 25rem;
  display: flex;
  justify-content: center;
}
</style>
