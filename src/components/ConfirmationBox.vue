<template>
  <div
    class="w-full bg-white text-black rounded-xl px-12 py-4 my-4"
    :class="{ 'covid-suspedted': patient.isCovidSuspected }"
  >
    <div>
      {{ $t('PATIENT_SUMMARY.CONFIRMED_BY') }}
      {{ patient.confirmation.confirmedByName }}
    </div>
    <div>{{ patient.confirmation.timestamp | formatDate }}</div>
    <div v-if="patient.isCovidSuspected === true">
      {{ $t('PATIENT_SUMMARY.COVID_SUSPECTED') }}
    </div>
    <div v-if="patient.isCovidSuspected === false">
      {{ $t('PATIENT_SUMMARY.COVID_NOT_SUSPECTED') }}
    </div>
  </div>
</template>

<script>
export default {
  props: { patient: { type: Object, required: true } }
}
</script>

<style></style>
