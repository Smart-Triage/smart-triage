<template>
  <div v-if="currentPatient" class="container">
    <h1>Summary</h1>
    <div>
      Name: {{ currentPatient.firstName + ' ' + currentPatient.lastName }}
    </div>
    <div>Birth number: {{ currentPatient.birthNumber }}</div>
    <div>Phone number: {{ currentPatient.phoneNumber }}</div>
    <div>
      <div v-for="step in formSteps" :key="step.order">
        {{ step.question }} -
        <span v-if="typeof step.answer == 'boolean'">{{
          step.answer === true ? 'ANO' : 'NE'
        }}</span>
        <span v-else> {{ step.answer }}</span>
      </div>
    </div>

    <PatientQRCode :patient="currentPatient"></PatientQRCode>
    <hr />

    <div class="buttons">
      <button class="link" @click="edit">Edit</button>
      <router-link to="/send" class="link send">Send</router-link>
    </div>
  </div>
  <div v-else>
    <p>Something went wrong</p>
    <router-link to="/home">Go to homepage</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import PatientQRCode from '../components/PatientQRCode'

export default {
  components: {
    PatientQRCode
  },
  computed: {
    ...mapState('patients', ['patients', 'formSteps']),
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
