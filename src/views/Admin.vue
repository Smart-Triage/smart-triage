<template>
  <div class="main-container">
    <NavBar></NavBar>
    <div class="main-content">
      <!-- TODO: spinner v-if spinner -->
      <pre>{{ cert }}</pre>
      <button
        v-if="cert === null"
        class="link btn-primary"
        @click="createCertificate()"
      >
        <ion-icon name="construct-outline"></ion-icon>
        <span class="main-action-button-text">
          {{ $t('ADMIN.CREATE_CERTIFICATE') }}
        </span>
      </button>

      <button
        v-if="cert !== null"
        class="link btn-primary"
        @click="scanning = true"
      >
        <ion-icon name="scan-outline"></ion-icon>
        <span class="main-action-button-text">
          {{ $t('ADMIN.SCAN_REQUEST') }}
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
          <QRScanner @data="signRequest"></QRScanner>
        </template>
      </FullScreenModal>

      <div v-if="signedCsrPem">
        <h1>Show this to employee</h1>
        <QRCodeVue
          class="qrcode bg-white p-8 m-2"
          :value="signedCsrPem"
          size="500"
          level="H"
        ></QRCodeVue>
      </div>
    </div>
  </div>
</template>
<script>
import forge from 'node-forge'
import FullScreenModal from '@/components/modals/FullScreenModal'
import QRScanner from '@/components/QRSanner'
import QRCodeVue from 'qrcode.vue'

// TODO: move to a separate JS
const cfgKeyBits = 1024
const cfgRootValidityYears = 10
const cfgRootCertCommonName = 'SmartTriageRootCA'

export default {
  components: { FullScreenModal, QRScanner, QRCodeVue },
  data: () => ({
    cert: null,
    spinner: false,
    scanning: false,
    signedCsrPem: null,
    rootKeyPair: null,
    rootCertificate: null
  }),
  methods: {
    async createCertificate() {
      this.spinner = true
      this.rootKeyPair = await forge.pki.rsa.generateKeyPair({
        bits: cfgKeyBits
      })
      this.rootCertificate = forge.pki.createCertificate()
      this.rootCertificate.publicKey = this.rootKeyPair.publicKey
      this.rootCertificate.serialNumber = '01'
      this.rootCertificate.validity.notBefore = new Date()
      this.rootCertificate.validity.notAfter = new Date()
      this.rootCertificate.validity.notAfter.setFullYear(
        this.rootCertificate.validity.notBefore.getFullYear() +
          cfgRootValidityYears
      )
      const rootCertAttrs = [
        {
          name: 'commonName',
          value: cfgRootCertCommonName
        }
      ]
      this.rootCertificate.setSubject(rootCertAttrs)
      this.rootCertificate.setIssuer(rootCertAttrs)
      this.rootCertificate.setExtensions([
        {
          name: 'basicConstraints',
          ca: true
        },
        {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        },
        {
          name: 'extKeyUsage',
          serverAuth: true,
          clientAuth: true,
          codeSigning: true,
          emailProtection: true,
          timeStamping: true
        },
        {
          name: 'nsCertType',
          client: true,
          server: true,
          email: true,
          objsign: true,
          sslCA: true,
          emailCA: true,
          objCA: true
        }
      ])
      this.rootCertificate.sign(this.rootKeyPair.privateKey)

      // this.cert = forge.pki.createCaStore()
      this.cert = forge.pki.certificateToPem(this.rootCertificate)

      this.spinner = false
    },
    signRequest(data) {
      this.scanning = false
      // convert a Forge certification request from PEM-format
      const csr = forge.pki.certificationRequestFromPem(data)
      // verify certification request
      if (csr.verify()) {
        console.log('Certification request (CSR) verified.')
      } else {
        throw new Error('Signature not verified.')
      }

      console.log('Creating certificate...')
      const cert = forge.pki.createCertificate()
      cert.serialNumber = '02'

      cert.validity.notBefore = new Date()
      cert.validity.notAfter = new Date()
      cert.validity.notAfter.setFullYear(
        cert.validity.notBefore.getFullYear() + cfgRootValidityYears
      )

      // subject from CSR
      cert.setSubject(csr.subject.attributes)
      // issuer from CA
      cert.setIssuer(this.rootCertificate.subject.attributes)

      cert.setExtensions([
        {
          name: 'basicConstraints',
          cA: true
        },
        {
          name: 'keyUsage',
          keyCertSign: true,
          digitalSignature: true,
          nonRepudiation: true,
          keyEncipherment: true,
          dataEncipherment: true
        }
      ])

      cert.publicKey = csr.publicKey

      cert.sign(this.rootKeyPair.privateKey)
      console.log('Certificate created.')

      this.signedCsrPem = forge.pki.certificateToPem(cert)
    }
  }
}
</script>
<style lang="scss" scoped></style>
