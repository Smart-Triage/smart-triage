<template>
  <div v-if="currentPatient" class="container">
    <div class="top-sumary">
      <!-- <div class="top-buttons">
        <button @click="edit">Edit</button>
        <button @click="deletePatient">
          Remove
        </button>
      </div> -->
      <h1 class="page-title">Summary</h1>
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>
    <PatientSummary></PatientSummary>

    <hr />

    <div class="buttons">
      <router-link to="/home" class="link btn-primary icon-button"
        ><ion-icon name="person-add-outline"></ion-icon>
        <div class="button-text">Add another person</div>
      </router-link>
      <router-link to="/patient-qr-code" class="link btn-primary icon-button">
        <ion-icon name="qr-code-outline"></ion-icon>
        <div class="button-text">Show QR code</div>
      </router-link>
    </div>
  </div>
  <div v-else>
    <p>Something went wrong</p>
    <router-link to="/home">Go to homepage</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PatientSummary from '../components/PatientSummary'

export default {
  components: { PatientSummary },
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient']),
    stepAnswers() {
      return this.formSteps.map(step => {
        return {
          ...step,
          answer: this.currentPatient.answers[step.order]
        }
      })
    }
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
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;

  button {
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    background-color: $light-button-color;
    border-radius: 2em;
    border: none;
  }
}

.buttons {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.link {
  font-size: 1em;
  padding: 0.5em 1em;
  margin: 0 0.5em 2em 0.5em;
}

.top-sumary {
  text-align: center;
}
</style>
