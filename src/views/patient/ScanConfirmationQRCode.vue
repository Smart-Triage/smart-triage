<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
      <p class="text-3xl leading-tight flex-grow my-6">
        {{ $t('SCAN_CONFIRMATION_QR_CODE.SCAN_CONFIRMATION_QR_CODE') }}
      </p>
      <QRScanner
        class="flex-grow"
        :only-valid-patient="true"
        :scanning-confirmation-code="true"
        @data="processConfirmation"
      ></QRScanner>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QRScanner from '@/components/QRSanner'

export default {
  components: {
    QRScanner
  },
  head() {
    return {
      title: {
        inner: this.$t('SCAN_CONFIRMATION_QR_CODE.SCAN_CONFIRMATION_QR_CODE')
      }
    }
  },
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  },
  created() {
    if (!this.currentPatient) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions('patients', ['updateOrAddPatient']),
    processConfirmation(confirmedPatient) {
      // console.log(confirmedPatient)
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
