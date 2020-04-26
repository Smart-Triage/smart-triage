<template>
  <div>
    <div v-if="error" class="p-4 mx-4 bg-red-500 text-white rounded-xl">
      {{ $t(`ERROR.${error}`) }}. {{ $t(`ERROR.TRY_DIFFERENT_BROWSER`) }}.
    </div>

    <qrcode-stream @decode="onDecode" @init="onInit">
      <div class="qr-border">
        <svg viewBox="0 0 100 100">
          <path
            d="M25,2 L2,2 L2,25"
            fill="none"
            stroke="black"
            stroke-width="1"
          />
          <path
            d="M2,75 L2,98 L25,98"
            fill="none"
            stroke="black"
            stroke-width="1"
          />
          <path
            d="M75,98 L98,98 L98,75"
            fill="none"
            stroke="black"
            stroke-width="1"
          />
          <path
            d="M98,25 L98,2 L75,2"
            fill="none"
            stroke="black"
            stroke-width="1"
          />
        </svg>
      </div>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { mapGetters } from 'vuex'

import validatePatient from '@/misc/validateScannedData'
import getFormStepsMixin from '@/mixins/getFormStepsMixin'

export default {
  components: { QrcodeStream },
  mixins: [getFormStepsMixin],
  props: {
    scanningConfirmationCode: {
      type: Boolean,
      default: false
    },
    verifying: {
      type: Boolean,
      default: false
    },
    onlyValidPatient: { type: Boolean, default: false }
  },
  data() {
    return {
      result: '',
      error: ''
    }
  },
  computed: {
    ...mapGetters('patients', ['currentPatient'])
  },
  methods: {
    onDecode(result) {
      this.result = result

      if (this.onlyValidPatient) {
        validatePatient(
          result,
          this.currentPatient,
          this.scanningConfirmationCode,
          this.verifying,
          this.getFormSteps
        )
          .then(patient => {
            this.$emit('data', patient)
          })
          .catch(err => {
            this.error = err.message
            console.error(err)
          })
      } else {
        this.$emit('data', result)
      }
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        this.error = error.name
      }
    }
  }
}
</script>

<style scoped lang="scss">
.qr-border {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: 80%;
    width: 80%;
  }
}
</style>
