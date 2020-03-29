<template>
  <div class="container">
    <div class="home-page-top-img">
      <h1>Vyčkejte na příchod zdravotníka</h1>
      <img src="@/assets/img/scan-code.png" alt="" />
    </div>
    <p>Zde je Váš QR kód, ukažte ho zdravotníkovi</p>
    <!-- {{ currentPatient.firstName + ' ' + currentPatient.lastName }} -->
    <PatientQRCode :patient="currentPatient"></PatientQRCode>

    <router-link class="link btn-primary button-qr-close" to="/summary"
      >Close</router-link
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PatientQRCode from '../components/PatientQRCode'

export default {
  components: {
    PatientQRCode
  },
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
}

.button-qr-close {
  margin: 0 0 1em 0;
}

.home-page-top-img {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 1.6em;
    padding: 1em 2em 0 2em;
  }
  img {
    margin: 0;
  }
}
</style>
