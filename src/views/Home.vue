<template>
  <div class="main-container">
    <NavBar> </NavBar>

    <div>
      <img src="@/assets/img/home-page-welcome-img.png" alt="" />
    </div>

    <div>
      <p>{{ $t('HOME.WELCOME') }}</p>
      <h1 class="text-5xl p-0 my-1">{{ $t('HOME.TITLE') }}</h1>
      <p>
        {{ $t('HOME.INFO') }}
      </p>
    </div>

    <div class="w-full">
      <PatientList class="w-full px-4"></PatientList>
      <div v-if="patients.length === 0" class="main-action">
        <button class="link btn-primary" @click="createPatient">
          <ion-icon name="person-add-outline"></ion-icon>
          <span class="main-action-button-text">{{ $t('HOME.BEGIN') }}</span>
        </button>
      </div>
      <div v-else class="main-action">
        <p class="my-1">{{ $t('HOME.NOT_GOING_ALONE') }}</p>
        <button class="link btn-primary" @click="createPatient">
          <ion-icon name="person-add-outline"></ion-icon>
          <span class="main-action-button-text">{{
            $t('HOME.FILL_FOR_ANOTHER_PERSON')
          }}</span>
        </button>
      </div>
    </div>

    <div class="bottom-link">
      <router-link to="/how-it-works">{{
        $t('HOME.HOW_IT_WORKS')
      }}</router-link>
      <router-link to="/settings">{{ $t('HOME.SETTINGS') }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientList from '@/components/PatientList'
// import InDevelopementOverlay from '@/components/InDevelopementOverlay'

export default {
  components: {
    PatientList
    // InDevelopementOverlay
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
.bottom-link {
  margin-top: 0;
}
</style>
