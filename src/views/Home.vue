<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>

    <PatientList></PatientList>

    <button class="link" @click="createPatient">Add patient</button>
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

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .home-page-title {
    text-align: center;
  }
}
</style>
