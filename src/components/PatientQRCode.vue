<template>
  <div>
    <qrcode-vue
      class="qrcode"
      :value="stringyfiedPatient"
      size="300"
      level="H"
    ></qrcode-vue>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  components: { QrcodeVue },
  props: {
    patient: {
      type: Object,
      required: true
    }
  },
  computed: {
    stringyfiedPatient() {
      const filteredPatient = Object.keys(this.patient)
        .filter(
          key =>
            [
              'id',
              'firstName',
              'lastName',
              'birthNumber',
              'phoneNumber',
              'answers'
            ].indexOf(key) > -1
        )
        .reduce(
          (res, key) => Object.assign(res, { [key]: this.patient[key] }),
          {}
        )

      return JSON.stringify(filteredPatient)
    }
  }
}
</script>

<style scoped>
.qrcode {
  margin: 1rem;
}
</style>
