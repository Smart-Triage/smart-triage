<template>
  <div>
    <div id="qrcode" style="width:200px; height:200px; margin-top:15px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      required: true
    }
  },
  mounted() {
    const qrcode = new window.QRCode(document.getElementById('qrcode'), {
      width: 200,
      height: 200
    })

    const formatedPatientString = Object.keys(this.patient)
      .filter(key => key !== 'id')
      .reduce((arr, key) => {
        arr.push(this.patient[key])
        return arr
      }, [])
      .join('-')

    console.log(formatedPatientString)

    qrcode.makeCode(formatedPatientString)
  }
}
</script>

<style></style>
