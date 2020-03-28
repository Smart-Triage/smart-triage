<template>
  <div>
    <div v-for="patient in patients" :key="patient.id">
      {{ patient.firstName + ' ' + patient.lastName }}
      {{ patient.birthNumber }}
      {{ patient.phoneNumber }}
      <button @click="deletePatientById(patient.id)">Delete</button>
      <hr />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('patients', ['patients'])
  },
  methods: {
    ...mapActions('patients', ['deletePatientById'])
  }
}
</script>

<style></style>
