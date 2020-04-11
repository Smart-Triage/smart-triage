<template>
  <div class="page-wrapper">
    <router-link to="/employee"
      ><ion-icon name="arrow-back-outline" size="large"></ion-icon
    ></router-link>

    <!-- RENDERING HELPERS -->
    <svg id="barcode"></svg>
    <canvas id="canvas" width="600" height="150"></canvas>

    <h1>Print this barcode</h1>

    <p>How to print?</p>
    <p>
      Long press on barcode image and select 'Download' or 'Share' directly to
      printer app
    </p>

    <!-- THE IMAGE -->
    <div id="png-container"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import JsBarcode from 'jsbarcode'

export default {
  data: () => ({
    barcodeValue: ''
  }),
  computed: { ...mapGetters('patients', ['currentPatient']) },
  mounted() {
    // 'Tomáš-Novák-235874/2356-1569-6-856985478'
    const patientArr = []

    patientArr.push(this.currentPatient.firstName)
    patientArr.push(this.currentPatient.lastName)
    patientArr.push(this.currentPatient.birthNumber)
    // patientArr.push(this.currentPatient.answers)
    patientArr.push(this.currentPatient.phoneNumber)

    const patientString = patientArr.join('-')

    this.barcodeValue = patientString
      .split('')
      .map(char => {
        switch (char) {
          case 'ě':
            return '\\e'
          case 'š':
            return '\\s'
          case 'č':
            return '\\c'
          case 'ř':
            return '\\r'
          case 'ž':
            return '\\z'
          case 'ý':
            return '\\y'
          case 'á':
            return '\\a'
          case 'í':
            return '\\i'
          case 'é':
            return '\\e'
          case 'ť':
            return '\\t'
          case 'ú':
            return '\\u'
          case 'ů':
            return '\\u'
          case 'ó':
            return '\\o'
          case 'ď':
            return '\\d'

          case 'Ě':
            return '\\E'
          case 'Š':
            return '\\S'
          case 'Č':
            return '\\C'
          case 'Ř':
            return '\\R'
          case 'Ž':
            return '\\Z'
          case 'Ý':
            return '\\Y'
          case 'Á':
            return '\\A'
          case 'Í':
            return '\\I'
          case 'É':
            return '\\E'
          case 'Ť':
            return '\\T'
          case 'Ú':
            return '\\U'
          case 'Ů':
            return '\\\\U'
          case 'Ó':
            return '\\O'
          case 'Ď':
            return '\\D'
          default:
            return char
        }
      })
      .join('')

    JsBarcode('#barcode', this.barcodeValue, { format: 'CODE128', width: 1 })

    const svgString = new XMLSerializer().serializeToString(
      document.querySelector('#barcode')
    )

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    // eslint-disable-next-line no-restricted-globals
    const DOMURL = self.URL || self.webkitURL || self
    const img = new Image()
    const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = DOMURL.createObjectURL(svg)
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const png = canvas.toDataURL('image/png')
      document.querySelector('#png-container').innerHTML = `<img src="${png}"/>`
      DOMURL.revokeObjectURL(png)
    }
    img.src = url
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

#canvas,
#barcode {
  display: none;
}
</style>
