<template>
  <div class="wrapper">
    <template v-if="refreshingApp">
      {{ $t('NEW_CONTENT_AVAILABLE.LOADING') }} ...
    </template>
    <template v-else>
      {{ $t('NEW_CONTENT_AVAILABLE.AVAILABLE') }}
      <span class="refresh-btn" @click="$emit('refresh')">{{
        $t('NEW_CONTENT_AVAILABLE.REFRESH')
      }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    refreshingApp: Boolean
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  display: inline-block;
  border-radius: 4px;

  .refresh-btn {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
