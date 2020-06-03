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
          @change="agreedToTerms()"
        />
      </div>
    </div>
    <div
      class="btn-primary w-full max-w-sm flex justify-center mx-4 mb-8 p-8 not-active-qr weird-safari-button-fix"
    >
      {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { isConfirmedMixin, isFinishedMixin } from '@/mixins'

export default {
  name: 'TermsAgreement',
  mixins: [isConfirmedMixin, isFinishedMixin],
  data: () => {
    return {
      personalInfoAgreed: false,
      allIsTrueAgreed: false
    }
  },
  computed: {
    ...mapState('patients', ['patients']),
    ...mapGetters('patients', ['currentPatient'])
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    agreedToTerms() {
      this.setCurrentPatientValueByKey({
        key: 'termsAccepted',
        value: this.personalInfoAgreed
      })
      if (this.personalInfoAgreed && this.allIsTrueAgreed) {
        this.$router.push('/patient-qr-code')
      }
    }
  }
}
</script>

<style scoped>
.weird-safari-button-fix {
  min-height: 3rem;
}
</style>
