<template>
  <div class="page-wrapper">
    <div v-if="scannig" class="scanner-view">
      <QRScanner
        :only-valid-patient="true"
        :verifying="true"
        @data="verify"
      ></QRScanner>
      <div v-if="error" class="bg-red-500 p-4 m-4 text-white rounded">
        {{ error }}
      </div>
    </div>
    <div
      v-else
      class="flex justify-center align-center p-4 m-4 rounded text-white"
      :class="{
        'bg-green-500': checkedPatient.isValid,
        'bg-red-500': !checkedPatient.isValid
      }"
    >
      <div v-if="checkedPatient.isValid">
        This confirmation is valid and was issued by
        {{ checkedPatient.confirmation.confirmedByName }}
      </div>
      <div v-else>
        This confirmation is NOT valid
      </div>
    </div>
  </div>
</template>

<script>
import QRScanner from '@/components/QRSanner'
import PublicKeysDB from '@/firebase/public-keys-db'
import { str2ab } from '@/misc/helpers'

export default {
  components: { QRScanner },
  data: () => ({ scannig: true, checkedPatient: null, error: null }),
  methods: {
    async verify(patient) {
      // Fetch public key
      const publicKeysDB = new PublicKeysDB()
      const employeeKeyFromFirebase = await publicKeysDB.read(
        patient.confirmation.confirmedById
      )

      const patientData = JSON.stringify(
        Object.keys(patient)
          .filter(key => !['signature', 'totalPoints'].includes(key))
          .reduce((obj, key) => {
            obj[key] = patient[key]
            return obj
          }, {})
      )

      console.log(patientData)

      window.crypto.subtle
        .importKey(
          'jwk', // can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
          employeeKeyFromFirebase.publicKey,
          {
            // these are the algorithm options
            name: 'ECDSA',
            namedCurve: 'P-256' // can be "P-256", "P-384", or "P-521"
          },
          false, // whether the key is extractable (i.e. can be used in exportKey)
          ['verify'] // "verify" for public key import, "sign" for private key imports
        )
        .then(publicKey => {
          // returns a publicKey (or privateKey if you are importing a private key)
          window.crypto.subtle
            .verify(
              {
                name: 'ECDSA',
                hash: { name: 'SHA-256' } // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
              },
              publicKey, // from generateKey or importKey above
              str2ab(patient.signature), // ArrayBuffer of the signature
              str2ab(patientData) // ArrayBuffer of the data
            )
            .then(isValid => {
              // returns a boolean on whether the signature is true or not
              this.scannig = false
              this.checkedPatient = { ...JSON.parse(patientData), isValid }
              console.log(this.checkedPatient)
            })
            .catch(err => {
              console.error(err)
              this.error = 'Invalid'
            })
        })
        .catch(err => {
          console.error(err)
          this.error = 'Invalid'
        })
    }
  }
}
</script>

<style></style>
