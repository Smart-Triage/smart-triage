<template>
  <div class="page-wrapper">
    <div class="page-content">
      <!-- HEADER -->
      <div class="mt-4 mb-2">
        <img
          class="mb-8 mx-auto"
          src="@/assets/img/home-page-welcome-img.png"
          alt=""
        />
        <p>{{ $t('HOME.WELCOME') }}</p>
        <h1 class="text-5xl">{{ $t('HOME.TITLE') }}</h1>
        <p>
          {{ $t('HOME.INFO') }}
        </p>
      </div>

      <!-- PATIENT LIST -->
      <PatientList class="w-full my-1"></PatientList>

      <!-- ACTIONS -->
      <div class="w-full">
        <div v-if="patients.length === 0">
          <button class="btn-primary" @click="createPatient">
            <ion-icon class="btn-icon" name="person-add-outline"></ion-icon>
            <span>{{ $t('HOME.BEGIN') }}</span>
          </button>
        </div>
        <div v-else>
          <p class="my-1">{{ $t('HOME.NOT_GOING_ALONE') }}</p>
          <button class="btn-primary" @click="createPatient">
            <ion-icon class="btn-icon" name="person-add-outline"></ion-icon>
            <span>{{ $t('HOME.FILL_FOR_ANOTHER_PERSON') }}</span>
          </button>
        </div>
      </div>

      <!-- BOTTOM LINKS -->
      <div class="bottom-link">
        <router-link to="/how-it-works">
          {{ $t('HOME.HOW_IT_WORKS') }}
        </router-link>
        <router-link to="/settings">
          {{ $t('HOME.SETTINGS') }}
        </router-link>
      </div>
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
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    async createPatient() {
      await this.createNewPatient()
      this.$router.push('/form')
    }
  }
}
</script>
