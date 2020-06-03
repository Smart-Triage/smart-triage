<template>
  <div class="page-wrapper">
    <NavBar slim>
      <template v-slot:left>
        <router-link to="/home">
          <ion-icon name="close" size="large"></ion-icon>
        </router-link>
      </template>
      <template v-slot:right>
        <LocaleChanger short no-background></LocaleChanger>
      </template>
    </NavBar>
    <div class="page-content">
      <div>
        <p class="mt-4 text-xl text-secondary font-semibold">
          {{ $t('Vyplňte formulár') }}
        </p>
        <div class="flex flex-row mt-5">
          <button
            v-if="!ownerPatientId"
            class="btn-primary mx-2"
            @click="createPatient(true)"
          >
            <ion-icon class="btn-icon text-xl" name="create-outline"></ion-icon>
            <span>{{ $t('Pre seba') }}</span>
          </button>
          <button class="btn-primary mx-2" @click="createPatient(false)">
            <ion-icon
              class="btn-icon text-xl"
              name="person-add-outline"
            ></ion-icon>
            <span>{{ $t('Pre inú osobu') }}</span>
          </button>
        </div>
      </div>
      <PatientList
        v-if="patients.length > 0"
        class="w-full my-1 flex-grow"
      ></PatientList>
    </div>
  </div>
</template>

<script>
import PatientList from '@/components/PatientList'
import LocaleChanger from '@/components/LocaleChanger'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'PersonList',
  components: { PatientList, LocaleChanger },
  computed: {
    ...mapState('patients', ['patients', 'ownerPatientId']),
    ...mapState('settings', ['locale'])
  },
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    ...mapActions('settings', ['setAppMode']),
    async createPatient(isOwnerPatient) {
      this.cameraCheck()
      await this.createNewPatient(isOwnerPatient)
      this.$router.push('/form')
    },
    cameraCheck() {
      // see if the camera access was granted already
      if (localStorage.getItem('camera:enabled')) {
        this.createPatient()
      } else {
        this.$router.push('compatibility-check')
      }
    }
  }
}
</script>

<style scoped lang="scss">
button {
  margin-left: 0.5em;
  margin-right: 0.5em;
}
</style>
