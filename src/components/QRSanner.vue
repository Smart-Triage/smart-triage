<template>
  <div style="position: relative">
    <div v-if="error" class="p-4 mx-4 bg-red-500 text-white rounded-xl">
      {{ $t(`ERROR.${error}`) }}. {{ $t(`ERROR.TRY_DIFFERENT_BROWSER`) }}.
    </div>

    <qrcode-stream class="qr-overlay" @decode="onDecode" @init="onInit">
      <div class="qr-border"></div>
      <loading class="active-loading" />
    </qrcode-stream>

    <qrcode-capture v-if="noStreamApiSupport" @decode="onDecode" />
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from 'vue-qrcode-reader'
import { mapGetters } from 'vuex'

import validatePatient from '@/misc/validateScannedData'
import { getFormStepsMixin } from '@/mixins'
import Loading from '@/components/Loading'

export default {
  components: { Loading, QrcodeStream, QrcodeCapture },
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
      error: '',
      noStreamApiSupport: false
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
          this.result,
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
        this.$emit('data', this.result)
      }
    },
    async onInit(promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'StreamApiNotSupportedError') {
          this.noStreamApiSupport = true
        } else this.error = error.name
      }
    }
  }
}
</script>

<style scoped lang="scss">
.qr-overlay {
  max-height: 350px;
  min-height: 350px;
}

.qr-border {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.active-loading {
  position: absolute;
  right: 1%;
  bottom: 54%;
}
</style>
