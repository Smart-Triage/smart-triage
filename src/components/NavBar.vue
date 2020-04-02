<template>
  <header class="navbar" :class="{ offline: !networkOnLine }">
    <div class="left">
      <slot name="left">
        <!-- Back button is only displayed when there is no element in 'left' slot and 'backBtn' prop is true-->
        <button v-if="backBtn" class="icon-button" @click="$router.go(-1)">
          <ion-icon name="arrow-back-outline" size="large"></ion-icon>
        </button>
      </slot>
    </div>

    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
  height: $navbar-height;
  width: 100%;
  background-color: $bg-color;
  padding: 0.7rem 1.5rem;
  line-height: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    min-width: 3rem;
    height: 100%;
  }

  .center {
    font-size: 1.3rem;
    font-weight: 600;
  }

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
