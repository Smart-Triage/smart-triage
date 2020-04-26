<template>
  <div class="page-wrapper">
    <div class="page-content">
      <!-- HEADER -->
      <div class="mt-4 mb-2">
        <img
          class="mb-8 mx-auto"
          src="@/assets/img/logo.svg"
          alt="Smart Triage logo"
        />
        <p class="text-xl text-secondary font-semibold">
          Vyplňte dotazník v mobilu <br />
          a zkraťte si čekání ve frontě
        </p>
        <img
          class="my-8 mx-auto"
          src="@/assets/img/home-page-welcome-img.png"
          alt=""
        />
        <!-- <p>{{ $t('HOME.WELCOME') }}</p> -->
        <!-- <h1 class="text-5xl">{{ $t('HOME.TITLE') }}</h1> -->
        <p class="text-xl text-secondary font-semibold">
          {{ $t('HOME.INFO') }}
        </p>
      </div>

      <!-- PATIENT LIST -->
      <PatientList class="w-full my-1"></PatientList>

      <!-- ACTIONS -->
      <div class="w-full">
        <div v-if="patients.length === 0">
          <button class="btn-primary" @click="createPatient">
            <ion-icon class="btn-icon text-xl" name="create-outline"></ion-icon>
            <span>{{ $t('HOME.FILL_FORM') }}</span>
          </button>
        </div>
        <div v-else>
          <button class="btn-primary" @click="createPatient">
            <ion-icon class="btn-icon" name="person-add-outline"></ion-icon>
            <span>{{ $t('HOME.FILL_FOR_ANOTHER_PERSON') }}</span>
          </button>
          <p class="my-1 text-secondary">{{ $t('HOME.NOT_GOING_ALONE') }}</p>
        </div>
      </div>

      <!-- BOTTOM LINKS -->
      <!--      <div class="bottom-link">-->
      <!--        <router-link to="/how-it-works">-->
      <!--          {{ $t('HOME.HOW_IT_WORKS') }}-->
      <!--        </router-link>-->
      <!--        <router-link to="/settings">-->
      <!--          {{ $t('HOME.SETTINGS') }}-->
      <!--        </router-link>-->
      <!--      </div>-->
    </div>
    <div class="home-text bg-white px-4 pb-4 mt-4 border-app rounded-b-none">
      <h2>{{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_H') }}</h2>
      <p>{{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_P') }}</p>
      <h2>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_H') }}</h2>
      <p>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_P') }}</p>
      <ol
        class="list-decimal list-inside my-6 text-secondary font-semibold leading-loose"
      >
        <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_1') }}</li>
        <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_2') }}</li>
        <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_3') }}</li>
        <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_4') }}</li>
      </ol>
      <h2>{{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_H') }}</h2>
      <p>{{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_P') }}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientList from '@/components/PatientList'

export default {
  components: {
    PatientList
  },
  data: () => ({
    showModal: false
  }),
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
  mounted() {
    this.setAppMode('patient')
  },
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    ...mapActions('settings', ['setAppMode']),
    async createPatient() {
      await this.createNewPatient()
      this.$router.push('/form')
    }
  }
}
</script>
