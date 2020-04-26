<template>
  <header
    class="w-full h-12 flex justify-between items-center px-2 sm:px-8 pt-2"
    :class="{
      offline: !networkOnLine,
      'transparent-background': bgTransparent,
      'sticky top-0': sticky
    }"
  >
    <!-- LEFT SLOT -->
    <div class="left flex items-center leading-none">
      <slot name="left">
        <!-- Back button is only displayed when there is no element in 'left' slot and 'backButton' prop is true-->
        <button v-if="backButton" class="icon-button" @click="$router.go(-1)">
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </button>
      </slot>
    </div>

    <!-- CENTER SLOT -->
    <div class="center text-xl flex flex-col">
      <span v-if="!networkOnLine" class="text-xs">{{ $t('OFFLINE') }}</span>
      <slot name="center"> </slot>
    </div>

    <!-- RIGHT SLOT -->
    <div class="right flex justify-end">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    backButton: { type: Boolean, default: false },
    bgTransparent: { type: Boolean, default: false },
    sticky: { type: Boolean, default: false }
  },
  computed: {
    ...mapState('app', ['networkOnLine'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.transparent-background {
  background-color: transparent;
}

header {
  background-color: $bg-color;
  color: black;
  z-index: 30;
}

.offline {
  background: $navbar-offline-color;
  color: white;
}

.left,
.center,
.right {
  min-width: 2rem;
}
</style>
