<template>
  <div>
    <div>First name: {{ patient.firstName }}</div>
    <div>Last Name: {{ patient.lastName }}</div>
    <div>Birth number: {{ patient.birthNumber }}</div>
    <div>Phone number: {{ patient.phoneNumber }}</div>
  </div>
</template>

<script>
export default {
  props: { patient: { type: Object, required: true } }
}
</script>

<style></style>
