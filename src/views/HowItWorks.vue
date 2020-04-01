<template>
  <div class="container">
    <div class="top-buttons">
      <router-link class="icon-button" to="/home"
        ><ion-icon name="arrow-back-outline" size="large"></ion-icon
      ></router-link>
    </div>
    <h1>{{ $t('HOW_IT_WORKS.HOW_IT_WORKS') }}?</h1>

    <img src="@/assets/img/hand-holding-phone-scanning-qr-code.png" alt="" />

    <p>
      {{ $t('HOW_IT_WORKS.SHORT_DESCRIPTION') }}
    </p>

    <ol>
      <li>{{ $t('HOW_IT_WORKS.FILL_FORM') }}</li>
      <li>{{ $t('HOW_IT_WORKS.FILL_FOR_OTHERS') }}</li>
      <li>{{ $t('HOW_IT_WORKS.SHOW_QR_CODE_TO_STAFF') }}</li>
    </ol>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 40rem;
  margin: 0 auto;

  .top-buttons {
    width: 100%;
    display: flex;
  }
  img {
    max-width: 20rem;
  }
}
</style>
