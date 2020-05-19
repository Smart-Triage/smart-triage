<template>
  <div class="page-wrapper">
    <PatientFormStepper v-if="appMode === 'patient'"></PatientFormStepper>
    <EmployeePatientFormStepper v-else></EmployeePatientFormStepper>
  </div>
</template>

<script>
import PatientFormStepper from '@/components/patient/PatientFormStepper'
import { mapGetters, mapState } from 'vuex'
import EmployeePatientFormStepper from '@/components/employee/EmployeePatientFormStepper'

export default {
  components: { EmployeePatientFormStepper, PatientFormStepper },
  head() {
    return {
      title: {
        inner: this.$t('FORM.QUESTIONNAIRE')
      }
    }
  },
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    ...mapState('settings', ['appMode'])
  },
  created() {
    if (!this.currentPatient) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss"></style>
