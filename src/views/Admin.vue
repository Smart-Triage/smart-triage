<template>
  <div class="page-wrapper">
    <NavBar sticky></NavBar>
    <div class="page-content">
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
    </div>
  </div>
</template>
<script>
import forge from 'node-forge'

// TODO: move to a separate JS
const cfgKeyBits = 2048
const cfgRootValidityYears = 10
const cfgRootCertCommonName = 'SmartTriageRootCA'

export default {
  data: () => ({
    cert: null,
    spinner: false
  }),
  methods: {
    async createCertificate() {
      this.spinner = true
      const rootKeyPair = await forge.pki.rsa.generateKeyPair({
        bits: cfgKeyBits
      })
      const rootCertificate = forge.pki.createCertificate()
      rootCertificate.publicKey = rootKeyPair.publicKey
      rootCertificate.serialNumber = '01'
      rootCertificate.validity.notBefore = Math.floor(Date.now() / 1000)
      rootCertificate.validity.notAfter = Math.floor(Date.now() / 1000)
      rootCertificate.validity.notAfter.setFullYear(
        rootCertificate.validity.notBefore.getFullYear() + cfgRootValidityYears
      )
      const rootCertAttrs = [
        {
          name: 'commonName',
          value: cfgRootCertCommonName
        }
      ]
      rootCertificate.setSubject(rootCertAttrs)
      rootCertificate.setIssuer(rootCertAttrs)
      rootCertificate.setExtensions([
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
      rootCertificate.sign(rootKeyPair.privateKey)

      // this.cert = forge.pki.createCaStore()
      this.cert = forge.pki.certificateToPem(rootCertificate)

      this.spinner = false
    }
  }
}
</script>
<style lang="scss" scoped></style>
