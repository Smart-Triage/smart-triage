<template>
  <div class="page-wrapper">
    <Stepper></Stepper>
  </div>
</template>

<script>
import Stepper from '@/components/Stepper'
import { mapGetters } from 'vuex'

export default {
  components: { Stepper },
  head() {
    return {
      title: {
        inner: this.$t('FORM.QUESTIONNAIRE')
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
  }
}
</script>

<style scoped lang="scss"></style>
