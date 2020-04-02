<template>
  <div class="container">
    <NavBar :back-btn="true"></NavBar>
    <div class="content">
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
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 40rem;
    margin: 0 auto;

    img {
      max-width: 20rem;
    }
  }
}
</style>
