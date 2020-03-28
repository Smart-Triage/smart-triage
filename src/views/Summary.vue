<template>
  <div v-if="currentPatient" class="container">
    <h1>Summary</h1>
    <div>
      Name: {{ currentPatient.firstName + ' ' + currentPatient.lastName }}
    </div>
    <div>Birth number: {{ currentPatient.birthNumber }}</div>
    <div>Phone number: {{ currentPatient.phoneNumber }}</div>

    <PatientQRCode :patient="currentPatient"></PatientQRCode>
    <hr />

    <div>
      <router-link to="/home" class="link">Save</router-link>
      <router-link to="/send" class="link">Send</router-link>
    </div>
  </div>
  <div v-else>
    <p>Something went wrong</p>
    <router-link to="/home">Go to homepage</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PatientQRCode from '../components/PatientQRCode'

export default {
  components: {
    PatientQRCode
  },
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },
  mounted() {
    if (this.currentPatient === undefined) {
      this.$router.push('/home')
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
</style>
