<template>
  <div class="overflow-container">
    <div
      class="in-developement-overlay p-4 text-sm font-normal leading-none text-center w-full h-12"
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
