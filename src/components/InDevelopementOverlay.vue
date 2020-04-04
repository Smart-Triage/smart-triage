<template>
  <div class="overflow-container">
    <div
      class="in-developement-overlay p-4 m-3 rounded-lg text-sm font-normal leading-none text-center"
    >
      {{ $t('APP_IN_DEVELOPMENT') }}
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.in-developement-overlay {
  background-color: $negative-color;
  color: white;
}
</style>
