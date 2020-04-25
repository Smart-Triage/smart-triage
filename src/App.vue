<template>
  <div id="app">
    <InDevelopementOverlay></InDevelopementOverlay>
    <transition name="view" mode="out-in">
      <router-view />
    </transition>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <!-- <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal> -->
  </div>
</template>
<script>
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
// import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'
import InDevelopementOverlay from '@/components/InDevelopementOverlay'

export default {
  components: {
    NewContentAvailableToastr,
    // AppleAddToHomeScreenModal,
    InDevelopementOverlay
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp']),
    ...mapState('settings', ['locale'])
  },
  created() {
    this.$i18n.locale = this.locale

    this.setHeight()
    // We listen to the resize event
    window.addEventListener('resize', this.setHeight)
  },
  methods: {
    ...mapActions('app', [
      'closeAddToHomeScreenModalForApple',
      'serviceWorkerSkipWaiting'
    ]),
    setHeight() {
      // Set window height without browser bars on mobile
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
  }
}
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<style lang="scss">
@import '@/theme/variables.scss';

#app {
  width: 100%;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);

  overflow: hidden;

  display: flex;
  flex-direction: column;

  background-color: $bg-color;
  font-family: 'Titillium Web', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;

  .new-content-available-toastr {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  .apple-add-to-home-screen-modal {
    position: absolute;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
    height: fit-content;
    width: fit-content;
    margin: auto;
    z-index: 1000;
  }
}

/* Vue Transition definitions */
.view-enter-active,
.view-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease;
}
.view-enter {
  opacity: 0;
  transform: translateX(+100px);
}
.view-enter-to,
.view-leave {
  opacity: 1;
  transform: translateX(0px);
}
.view-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
