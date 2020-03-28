<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>

    <PatientList></PatientList>

    <router-link class="link" to="/form">Add patient</router-link>
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
  justify-content: center;
  align-items: center;

  .home-page-title {
    text-align: center;
  }
}
</style>
