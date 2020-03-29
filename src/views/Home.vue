<template>
  <div class="page-wrapper">
    <div class="home-page-top-img">
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>

    <div class="home-page-center">
      <p class="home-page-welcome">Vítejte v</p>
      <h1 class="home-page-title">{{ appTitle }}</h1>

      <PatientList class="patient-list"></PatientList>

      <div class="main-action">
        <p>Not going alone?</p>
        <button class="link btn-primary" @click="createPatient">
          <ion-icon name="person-add-outline"></ion-icon>
          Fill for another person
        </button>
      </div>
    </div>
    <div class="home-page-bottom-link">
      <router-link class="home-page-link" to="/how-it-works"
        >How it works?</router-link
      >
      <router-link class="home-page-link" to="/about"
        >About this app</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
  computed: mapState('app', ['appTitle']),
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    async createPatient() {
      await this.createNewPatient()
      this.$router.push('/form')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

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
    img {
      margin: 1em 0;
    }
  }

  .home-page-center {
    text-align: center;
    flex: 1;
    width: 100%;
    max-width: 30rem;

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

    .patient-list {
      margin-top: 4rem;
    }

    .main-action {
      margin-top: 4rem;
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
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }
}
</style>
