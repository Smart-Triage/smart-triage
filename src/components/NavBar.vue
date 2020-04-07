<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">
    <div class="left flex items-center leading-none">
      <slot name="left">
        <!-- Back button is only displayed when there is no element in 'left' slot and 'backBtn' prop is true-->
        <button v-if="backBtn" class="icon-button" @click="$router.go(-1)">
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </button>
      </slot>
    </div>

    <div class="center">
      <slot name="center">
<!--        <InDevelopementOverlay></InDevelopementOverlay>-->
      </slot>
    </div>

    <div class="right flex justify-end">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
// import InDevelopementOverlay from '@/components/InDevelopementOverlay'

export default {
  components: {
    // InDevelopementOverlay
  },
  props: { backBtn: { type: Boolean, default: false } },
  computed: {
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  width: 100%;
  line-height: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @apply mt-5 mb-2;

  &.offline {
    background: $navbar-offline-color;
    .links .nav-links .nav-item a,
    .site-name {
      color: white;
    }
  }

  .user-picture {
    max-height: 32px;
    margin-left: 1.5rem;
    border-radius: 50%;
  }

  .offline-label {
    padding: 0px 10px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
    margin-left: 1.5rem;
  }
}
</style>
