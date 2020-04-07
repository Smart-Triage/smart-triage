<template>
  <div id="app">
    <div class="main-wrapper">
      <transition name="view" mode="out-in">
        <router-view />
      </transition>
    </div>

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    >
    </apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    NewContentAvailableToastr,
    AppleAddToHomeScreenModal
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp']),
    ...mapState('settings', ['locale'])
  },
  created() {
    this.$i18n.locale = this.locale
  },
  methods: mapActions('app', [
    'closeAddToHomeScreenModalForApple',
    'serviceWorkerSkipWaiting'
  ])
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';

* {
  box-sizing: border-box;
}

html {
  height: 100%;
  min-height: 100vh;
  @supports (-webkit-appearance: none) {
    .os-android & {
      min-height: calc(100vh - 56px);
    }
  }
}
body {
  margin: 0;
  background-color: $bg-color;

  height: 100%;
  min-height: 100vh;
  @supports (-webkit-appearance: none) {
    .os-android & {
      min-height: calc(100vh - 56px);
    }
  }

  a {
    font-weight: 500;
    text-decoration: none;
    color: black;
  }

  button {
    background-color: initial;
    border: initial;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid;
    border-color: $secondary-text-color;
    padding: 0;
  }

  #app {
    // font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    //   Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

    .main-wrapper {
      height: 100%;
      min-height: 100vh;
      @supports (-webkit-appearance: none) {
        .os-android & {
          min-height: calc(100vh - 56px);
        }
      }

      .page-wrapper {
        width: 60%;
        margin: auto;

        @media screen and (max-width: 1000px) {
          width: 100%;
        }
      }
    }
  }
}


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

.unroll-enter-active,
.unroll-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease;
}
.unroll-enter,
.unroll-leave-to {
  opacity: 0;
  transform: scaleY(1);
}
.unroll-enter-to,
.unroll-leave {
  opacity: 1;
  transform: scaleY(0);
}

.icon-button {
  display: flex;
  cursor: pointer;

  .button-text {
    margin-left: 1rem;
  }
}
</style>
