<template>
  <div>
    <p v-if="error" class="error">Error: {{ error }}</p>

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

export default {
  components: { QrcodeStream },
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
    ...mapGetters('questions', ['getFormSteps']),
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
            this.error = err
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
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.error {
  font-weight: bold;
  color: red;
}

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
