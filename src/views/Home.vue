<template>
  <div class="main-container">
    <div></div>
    <div class="mt-4 mb-2">
      <img class="mb-8 mx-auto" src="@/assets/img/home-page-welcome-img.png" alt="" />
      <p>{{ $t('HOME.WELCOME') }}</p>
      <h1 class="text-5xl">{{ $t('HOME.TITLE') }}</h1>
      <p>
        {{ $t('HOME.INFO') }}
      </p>
    </div>
    <PatientList class="w-full my-1"></PatientList>
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

    <div class="bottom-link">
      <router-link to="/how-it-works">{{
        $t('HOME.HOW_IT_WORKS')
      }}</router-link>
      <router-link to="/settings">{{ $t('HOME.SETTINGS') }}</router-link>
    </div>

    <!-- Modal development warning -->
    <ModalWindow v-if="showModal">
      <template v-slot:header>
        <h2 class="p-0">Upozornení</h2>
      </template>
      <template v-slot:body>
        <p>
          Zkušební mód.
        </p>
        <p>
          Aplikace je stále ve vývoji.
        </p>
      </template>
      <template v-slot:footer>
        <button class="btn-primary" @click="showModal = false">
          Beru na vědomí
        </button>
      </template>
    </ModalWindow>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PatientList from '@/components/PatientList'
import ModalWindow from '@/components/ModalWindow'

export default {
  components: {
    PatientList,
    ModalWindow
  },
  data: () => ({
    showModal: true
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

<style lang="scss" scoped></style>
