<template>
  <div class="container">
    <div class="top-buttons">
      <router-link to="/patient-qr-code">
        <ion-icon name="arrow-back-outline" size="large"></ion-icon>
      </router-link>
    </div>
    <h1>Scan confirmation code from hospital employee</h1>
    <QRScanner
      :scanning-confirmation-code="true"
      @patient="processConfirmation"
    ></QRScanner>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import QRScanner from '../components/QRSanner'

export default {
  components: {
    QRScanner
  },
  methods: {
    ...mapActions('patients', ['updateOrAddPatient']),
    processConfirmation(confirmedPatient) {
      console.log(confirmedPatient)
      this.updateOrAddPatient(confirmedPatient).then(() => {
        this.$router.push('/summary')
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-buttons {
  display: flex;
}
</style>
