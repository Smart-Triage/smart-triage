<template>
  <div class="page-wrapper">
    <div class="top-buttons">
      <LocaleChanger></LocaleChanger>
    </div>
    <div class="home-page-top-img">
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>

    <div class="home-page-center">
      <p class="home-page-welcome">{{ $t('HOME.WELCOME') }}</p>
      <h1 class="home-page-title">{{ $t('HOME.TITLE') }}</h1>

      <p class="home-page-info">
        {{ $t('HOME.INFO') }}
      </p>

      <PatientList class="patient-list"></PatientList>

      <div v-if="patients.length === 0" class="main-action">
        <button class="link btn-primary" @click="createPatient">
          <ion-icon name="person-add-outline"></ion-icon>
          <span class="main-action-button-text">{{ $t('HOME.BEGIN') }}</span>
        </button>
      </div>
      <div v-else class="main-action">
        <p>{{ $t('HOME.NOT_GOING_ALONE') }}</p>
        <button class="link btn-primary" @click="createPatient">
          <ion-icon name="person-add-outline"></ion-icon>
          <span class="main-action-button-text">{{
            $t('HOME.FILL_FOR_ANOTHER_PERSON')
          }}</span>
        </button>
      </div>
    </div>
    <div class="home-page-bottom-link">
      <router-link class="home-page-link" to="/how-it-works">{{
        $t('HOME.HOW_IT_WORKS')
      }}</router-link>
      <router-link class="home-page-link" to="/about">{{
        $t('HOME.ABOUT')
      }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientList from '@/components/PatientList'
import LocaleChanger from '@/components/LocaleChanger'

export default {
  components: {
    PatientList,
    LocaleChanger
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
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapState('patients', ['patients'])
  },
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

ion-icon {
  font-size: 1.3em;
  margin: 0 0.5em 0 0;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  min-height: calc(100vh - 34px);
  @supports (-webkit-appearance: none) {
    .os-android & {
      min-height: calc(100vh - 56px);
    }
  }

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
      font-size: 2.5em;
      line-height: 1em;
      color: $main-text-color;
    }

    .home-page-welcome {
      margin: 0;
      font-weight: 400;
      font-size: 1.75em;
      color: $main-text-color;
    }

    .home-page-info {
      margin: 2em 1.5em 0 1.5em;
    }

    .patient-list {
      margin-top: 2rem;
    }

    .main-action {
      p {
        margin: 8px 0;
      }

      button {
        margin: 0 auto;
        display: flex;
        justify-content: center;

        .main-action-button-text {
          margin-left: 1rem;
        }
      }
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
      margin: 1em 1.5em 1em 1.5em;
    }
  }
}

.top-buttons {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
