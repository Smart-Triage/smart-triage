<template>
  <div class="overflow-container">
    <div class="in-developement-overlay">
      This app is in development
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
  padding: 0.5rem 1rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
}
</style>
