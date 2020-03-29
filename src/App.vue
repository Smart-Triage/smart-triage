<template>
  <div id="app">
    <nav-bar></nav-bar>
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
import NavBar from '@/components/NavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: { NavBar, NewContentAvailableToastr, AppleAddToHomeScreenModal },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
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
  height: 100vh;
}
body {
  margin: 0;
  height: 100vh;
  background-color: $bg-color;

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

  .navbar {
    display: none;
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
      height: 100vh;

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

.link {
  display: inline-block;
  font-size: 1.2rem;
  color: #fff;
  background-color: $vue-color;
  padding: 0.8rem 1.6rem;
  margin: 0.2rem;
  border-radius: 4px;
  transition: background-color 0.1s ease;
  box-sizing: border-box;
  text-decoration: none;
  width: fit-content;
  font-weight: 500;
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
</style>
