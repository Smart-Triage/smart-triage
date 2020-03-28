<template>
  <div class="page-wrapper">
    <div class="home-page-top-img">
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>

    <div class="home-page-center">
      <p class="home-page-welcome">Vítejte v</p>
      <h1 class="home-page-title">{{ appTitle }}</h1>

      <PatientList></PatientList>

      <router-link class="link home-page-btn" to="/form"
        >Add patient</router-link
      >
    </div>
    <div class="home-page-bottom-link">
    <router-link class="home-page-link" to="/form">How it works?</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PatientList from '../components/PatientList'

export default {
  components: {
    PatientList
  },
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: mapState('app', ['appTitle'])
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;

  .home-page-top-img {
    display: flex;
    align-items: center;    
    flex: 2;
  }

  .home-page-center {
    text-align: center;
    flex: 1;

    .home-page-title {
      margin: 0 0 0.5em 0;
      font-weight: 300;
      font-size: 3em;
      line-height: 1em;
      color: $main-text-color;
    }

    .home-page-welcome {
      margin: 0;
      font-weight: 400;
      font-size: 1.75em;
      color: $main-text-color;
    }

    .home-page-btn {
      background-color: $primary-color;
      border-radius: 2em;
    }
  }

.home-page-bottom-link {
  display: flex;
  flex: 2;
  align-items: flex-end;
  .home-page-link {
    text-decoration: none;
    color: $main-text-color;
    font-weight: 400;
    align-self: flex-end;
    margin-bottom: 1em;
  }
  }
}
</style>
