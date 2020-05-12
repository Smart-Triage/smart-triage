<template>
  <div class="page-wrapper">
    <NavBar bg-transparent>
      <template v-slot:left>
        <router-link to="/home"
          ><ion-icon name="close" size="large"></ion-icon
        ></router-link>
      </template>
    </NavBar>
    <div class="page-content">
      <h1 class="flex-shrink font-bold text-3xl mx-2">
        {{ 'Aplikácia pre správne fungovanie vyžaduje prístup k fotoaparátu' }}
      </h1>
      <div class="flex-grow mt-12 mb-5">
        <div class="flex w-screen justify-between">
          <button class="btn-primary" @click="$router.push('home')">
            {{ 'Späť' }}
          </button>
          <button class="btn-primary" @click="cameraCheckPassed = false">
            {{ 'Povoliť' }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="!cameraCheckPassed">
      <qrcode-stream class="hidden" @init="onInit"></qrcode-stream>
    </div>
    <ModalWindow v-if="showCameraModal" :background-class="'bg-white'">
      <template v-slot:header>
        <h2 class="p-0 text-primary-black text-xl font-semibold">
          {{ $t('HOME.COMPATIBILITY_MODAL.HEADER') }}
        </h2>
      </template>
      <template v-slot:body>
        <p class="text-primary-black text-base">
          {{ $t('HOME.COMPATIBILITY_MODAL.TEXT') }}
        </p>
      </template>
      <template v-slot:footer>
        <button class="btn-primary mb-3" @click="hideModalAndRedirect()">
          {{ $t('HOME.COMPATIBILITY_MODAL.BUTTON') }}
        </button>
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import isCompatiblePhoneAndBrowser from '@/misc/mobile-check-service'
import { QrcodeStream } from 'vue-qrcode-reader'
import ModalWindow from '@/components/ModalWindow'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CompatibilityCheck',
  components: {
    QrcodeStream,
    ModalWindow
  },
  data: () => ({
    cameraCheckPassed: true,
    showCameraModal: false
  }),
  computed: {
    ...mapState('patients', ['patients']),
    ...mapState('settings', ['locale'])
  },
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    ...mapActions('settings', ['setAppMode']),
    async onInit(promise) {
      try {
        await promise
        this.cameraCheckPassed = true
        this.createPatient()
      } catch (error) {
        this.$log.error('QR Code Reader Problem:', error.name)
        this.cameraCheckPassed = false
        this.showCameraModal = true
      }
    },
    async createPatient() {
      if (!isCompatiblePhoneAndBrowser()) {
        this.showCameraModal = true
        this.$log.error('QR Code Phone Problem')
      } else {
        await this.createNewPatient()
        this.$router.push('/form')
      }
    },
    hideModalAndRedirect() {
      this.showCameraModal = false
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped></style>
