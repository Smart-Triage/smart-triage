<template>
  <form class="container">
    <input
      placeholder="First name"
      class="form-input"
      type="text"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProductAction"
    />

    <input
      placeholder="Last name"
      class="form-input"
      type="text"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProductAction"
    />

    <input
      placeholder="Birth number"
      class="form-input"
      type="text"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProductAction"
    />

    <input
      placeholder="Phone number"
      class="form-input"
      type="tel"
      :value="productNameToCreate"
      @input="setProductNameToCreate($event.target.value)"
      @keypress.enter="triggerAddProductAction"
    />

    <router-link class="link" to="/form2">Next</router-link>
  </form>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 0 auto;
}

.form-input {
  margin: 0.5rem;
  padding-left: 5px;
  height: 2.5rem;
  width: 20rem;
  outline: none;
  font: inherit;
  border: 1px solid;
  border-color: #2c3e50;
  border-radius: 3px;
}
</style>
