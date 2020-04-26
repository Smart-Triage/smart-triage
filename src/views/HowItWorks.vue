<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
      <h1 class="">{{ $t('HOW_IT_WORKS.HOW_IT_WORKS') }}?</h1>
      <img
        class="w-2/3 my-6"
        src="@/assets/img/hand-holding-phone-scanning-qr-code.png"
        alt=""
      />

      <p class="my-6">
        {{ $t('HOW_IT_WORKS.SHORT_DESCRIPTION') }}
      </p>

      <div class="card">
        <ol class="order-list">
          <li>{{ $t('HOW_IT_WORKS.FILL_FORM') }}</li>
          <li>{{ $t('HOW_IT_WORKS.SHOW_QR_CODE_TO_STAFF') }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.main-container {
  justify-content: flex-start;
}

.card {
  margin-bottom: 2rem;
}
</style>
