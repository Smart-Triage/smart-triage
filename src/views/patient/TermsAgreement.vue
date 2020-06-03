<template>
  <div v-if="!isConfirmed(currentPatient)" class="items-center card">
    <div class="flex flex-row w-full justify-between mb-2">
      <p class="text-left text-xs">
        {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_TXT') }}
      </p>

      <div>
        <input
          id="agree2"
          v-model="allIsTrueAgreed"
          type="checkbox"
          value="agree"
          class="m-4 self-center"
          @change="agreedToTerms()"
        />
      </div>
    </div>

    <div class="flex flex-row w-full justify-between">
      <p class="text-left text-xs">
        {{ $t('SUMMARY.PERSONAL_INFORMATION') }}. Viz
        <a href="./privacy-policy/privacy-policy-cs.pdf" class="text-blue-500">
          {{ $t('HOME.FOOTER.PRIVACY_POLICY') }}
        </a>
      </p>
      <div>
        <input
          id="agree"
          v-model="personalInfoAgreed"
          type="checkbox"
          value="agree"
          class="m-4 self-center"
        />
      </div>
    </div></div
></template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'TermsAgreement',
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },
  data: () => {
    return {
      personalInfoAgreed: false,
      allIsTrueAgreed: false
    }
  },
  methods: {
    agreedToTerms() {
      this.setCurrentPatientValueByKey({
        key: 'termsAccepted',
        value: this.personalInfoAgreed
      })
    }
  }
}
</script>

<style scoped></style>
