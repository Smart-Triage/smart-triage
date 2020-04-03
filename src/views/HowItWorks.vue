<template>
  <div class="main-container">
    <NavBar :back-btn="true"></NavBar>
    <div class="main-content justify-between">
      <h1>{{ $t('HOW_IT_WORKS.HOW_IT_WORKS') }}?</h1>

      <img src="@/assets/img/hand-holding-phone-scanning-qr-code.png" alt="" />

      <div class="card">
      <p>
        {{ $t('HOW_IT_WORKS.SHORT_DESCRIPTION') }}
      </p>
      </div>
      <ol class="list-decimal">
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
</style>
