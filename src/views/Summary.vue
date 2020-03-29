<template>
  <div v-if="currentPatient" class="container">
    <div class="top-sumary">
      <h1 class="page-title">Summary</h1>
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>
    <PatientSummary></PatientSummary>

    <hr />

    <div class="buttons">
      <div>
        <button class="link btn-primary" @click="edit">Edit</button>
        <router-link to="/home" class="link btn-primary"
          >Next patient</router-link
        >
      </div>

      <router-link to="/qr-code" class="link btn-primary"
        >Show QR code</router-link
      >
    </div>
  </div>
  <div v-else>
    <p>Something went wrong</p>
    <router-link to="/home">Go to homepage</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
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
      this.currentPatient.finished = true
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    edit() {
      this.setCurrentPatientValueByKey({ key: 'visitedSteps', value: ['0'] })
      this.$router.push('/form')
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
