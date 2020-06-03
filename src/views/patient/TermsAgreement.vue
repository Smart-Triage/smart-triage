<template>
  <div class="page-wrapper">
    <NavBar slim>
      <template v-slot:left>
        <router-link to="/summary">
          <ion-icon name="close" size="large"></ion-icon>
        </router-link>
      </template>
      <template v-slot:right>
        <LocaleChanger short no-background></LocaleChanger>
      </template>
    </NavBar>
    <div>
      <p class="my-4 text-xl text-center text-secondary font-semibold">
        {{ $t('SUMMARY.TERMS_AGREEMENT_HEADER') }}
      </p>
      <div class="items-center card flex-grow">
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
            <a
              href="./privacy-policy/privacy-policy-cs.pdf"
              class="text-blue-500"
            >
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
          v-if="!personalInfoAgreed || !allIsTrueAgreed"
          class="w-full max-w-sm flex justify-center items-center rounded-full text-white text-lg mx-4 mb-8 p-2 weird-safari-button-fix margin-auto not-active-qr btn-primary"
        >
          {{ $t('SUMMARY.YOU_HAVE_TO_ACCEPT_BTN') }}
        </div>
        <button
          v-if="personalInfoAgreed && allIsTrueAgreed"
          class="w-full max-w-sm flex justify-center items-center bg-primary rounded-full text-white text-lg mx-4 mb-8 p-2 weird-safari-button-fix margin-auto"
          @click="$router.push('/patient-qr-code')"
        >
          <ion-icon name="qr-code-outline"></ion-icon>
          <div class="ml-2">{{ $t('SUMMARY.SHOW_QR_CODE') }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { isConfirmedMixin, isFinishedMixin } from '@/mixins'
import LocaleChanger from '@/components/LocaleChanger'

export default {
  name: 'TermsAgreement',
  components: { LocaleChanger },
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
    }
  }
}
</script>

<style scoped>
.weird-safari-button-fix {
  min-height: 3rem;
}

.margin-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
