<template>
  <div v-if="currentPatient" class="container">
    <h1>Summary</h1>

    <PatientSummary></PatientSummary>

    <hr />

    <div class="buttons">
      <button class="link" @click="edit">Edit</button>
      <router-link to="/qr-code" class="link">Show QR code</router-link>
      <router-link to="/home" class="link">Next patient</router-link>
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
