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
      return JSON.stringify(this.patient)
    }
  }
}
</script>

<style scoped>
.qrcode {
  margin: 1rem;
}
</style>
