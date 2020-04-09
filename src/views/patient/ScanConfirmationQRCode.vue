<template>
  <div class="container">
    <NavBar :back-btn="true"></NavBar>
    <h1>{{ $t('SCAN_CONFIRMATION_QR_CODE.SCAN_CONFIRMATION_QR_CODE') }}</h1>
    <QRScanner
      only-valid-patient="true"
      :scanning-confirmation-code="true"
      @data="processConfirmation"
    ></QRScanner>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QRScanner from '@/components/QRSanner'

export default {
  components: {
    QRScanner
  },
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  },
  created() {
    if (!this.currentPatient) {
      this.$router.push('/home')
    }
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
</style>
