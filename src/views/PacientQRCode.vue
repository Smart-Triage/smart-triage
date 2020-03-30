<template>
  <div class="container" :class="{ 'bg-confirmed': currentPatient.confirmed }">
    <div class="top-buttons">
      <router-link to="/summary"
        ><ion-icon name="close" size="large"></ion-icon
      ></router-link>
    </div>

    <div class="home-page-top-img">
      <h1>Follow the instructions of the hospital staff</h1>
      <img src="@/assets/img/scan-code.png" alt="" />
    </div>
    <p>When asked, show this code.</p>
    <!-- {{ currentPatient.firstName + ' ' + currentPatient.lastName }} -->
    <QrcodeVue
      class="qrcode"
      :value="stringyfiedPatient"
      size="300"
      level="H"
    ></QrcodeVue>

    <router-link
      v-if="!currentPatient.confirmed"
      class="link btn-primary scan-confirmation-btn icon-button"
      to="/scan-confirmation-qr-code"
      ><ion-icon name="scan-outline"></ion-icon>
      <div class="button-text">Scan confirmation</div></router-link
    >
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapGetters } from 'vuex'

export default {
  components: { QrcodeVue },
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    stringyfiedPatient() {
      const filteredPatient = Object.keys(this.currentPatient)
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
          (res, key) => Object.assign(res, { [key]: this.currentPatient[key] }),
          {}
        )

      return JSON.stringify(filteredPatient)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3rem;
  height: 100%;
  min-height: 100vh;
  @supports (-webkit-appearance: none) {
    .os-android & {
      min-height: calc(100vh - 56px);
    }
  }
}

.button-qr-close {
  margin: 0 0 1em 0;
}

.scan-confirmation-btn {
  background-color: $secondary-color;
  display: flex;
  align-items: center;
}

.home-page-top-img {
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 1.6em;
    padding: 1em 2em 0 2em;
  }
  img {
    margin: 0;
  }
}

.top-buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  padding: 0.5rem 1rem;
}

.bg-confirmed {
  background-color: $secondary-color;
  color: white;
}
</style>
