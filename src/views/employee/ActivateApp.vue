<template>
  <div class="main-container">
    <button
      v-if="csrPem === null"
      class="link btn-primary"
      @click="createCSR()"
    >
      <ion-icon name="construct-outline"></ion-icon>
      <span class="main-action-button-text">
        {{ $t('ACTIVATE.REQUEST_ACTIVATION') }}
      </span>
    </button>
    <div v-else>
      <h1>Show this to admin</h1>
      <QRCodeVue
        class="qrcode bg-white p-8 m-2"
        :value="csrPem"
        size="500"
        level="H"
      ></QRCodeVue>
    </div>

    <button
      v-if="csrPem !== null"
      class="link btn-primary"
      @click="scanning = true"
    >
      <ion-icon name="scan-outline"></ion-icon>
      <span class="main-action-button-text">
        {{ $t('ACTIVATE.SCAN_SIGNED_CERTIFICATE') }}
      </span>
    </button>

    <FullScreenModal v-if="scanning">
      <template v-slot:header>
        <NavBar>
          <template v-slot:left>
            <button class="text-black" @click="scanning = false">
              <ion-icon name="arrow-back-outline" size="large"></ion-icon>
            </button>
          </template>
        </NavBar>
      </template>
      <template v-slot:body>
        <QRScanner @data="saveCertificate"></QRScanner>
      </template>
    </FullScreenModal>
  </div>
</template>

<script>
import forge from 'node-forge'
import FullScreenModal from '@/components/modals/FullScreenModal'
import QRScanner from '@/components/QRSanner'
import QRCodeVue from 'qrcode.vue'

export default {
  components: {
    FullScreenModal,
    QRScanner,
    QRCodeVue
  },
  data: () => ({
    csrPem: null,
    scanning: false
  }),
  methods: {
    createCSR() {
      // generate a key pair
      const keys = forge.pki.rsa.generateKeyPair(1024)
      // create a certification request (CSR)
      const csr = forge.pki.createCertificationRequest()
      csr.publicKey = keys.publicKey
      csr.setSubject([
        {
          name: 'commonName',
          value: 'example.org'
        },
        {
          name: 'countryName',
          value: 'US'
        },
        {
          shortName: 'ST',
          value: 'Virginia'
        },
        {
          name: 'localityName',
          value: 'Blacksburg'
        },
        {
          name: 'organizationName',
          value: 'Test'
        },
        {
          shortName: 'OU',
          value: 'Test'
        }
      ])

      // sign certification request
      csr.sign(keys.privateKey)
      // verify certification request
      //   var verified = csr.verify()
      // convert certification request to PEM-format
      this.csrPem = forge.pki.certificationRequestToPem(csr)
      // convert a Forge certification request from PEM-format
      //   var csr = forge.pki.certificationRequestFromPem(pem)
    },
    saveCertificate(data) {
      console.log('Signed cert:', data)
    }
  }
}
</script>

<style></style>
