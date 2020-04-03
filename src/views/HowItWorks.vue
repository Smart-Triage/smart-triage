<template>
  <div class="main-container">
    <NavBar :back-btn="true"></NavBar>
    <h1>{{ $t('HOW_IT_WORKS.HOW_IT_WORKS') }}?</h1>
    <div class="main-content">
      <img class="w-2/3" src="@/assets/img/hand-holding-phone-scanning-qr-code.png" alt="" />

      <div class="card">
      <p>
        {{ $t('HOW_IT_WORKS.SHORT_DESCRIPTION') }}
      </p>
      </div>
      <ol class="order-list mb-4">
        <li>{{ $t('HOW_IT_WORKS.FILL_FORM') }}</li>
<!--        <li>{{ $t('HOW_IT_WORKS.FILL_FOR_OTHERS') }}</li>-->
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
