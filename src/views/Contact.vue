<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
      <div class="card text-center">
        <h1 class="mb-6"></h1>
        <p>
          <strong>
            {{ $t('CONTACT_US') }}
          </strong>
        </p>
        <p>
          <a class="font-bold" href="mailto:info@nemocnice.online"
            >info@nemocnice.online</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact'
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';

a {
  color: $secondary-color;
  text-decoration: underline;
}
</style>
