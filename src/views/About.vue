<template>
  <div class="container">
    <div class="top-buttons">
      <router-link class="icon-button" to="/settings"
        ><ion-icon name="arrow-back-outline" size="large"></ion-icon
      ></router-link>
    </div>
    <h1>{{ $t('ABOUT.ABOUT_THIS_APP') }}</h1>

    <img src="@/assets/img/home-page-welcome-img.png" alt="" />

    <p>
      {{ $t('ABOUT.APP_SHORT_DESCRIPTION') }}
    </p>

    <p>
      {{ $t('ABOUT.TRIAGE_DESCRIPTION') }}
    </p>

    <p>
      {{ $t('ABOUT.CREATED_ON_HACKATHON') }}
    </p>

    <div>{{ $t('ABOUT.AUTHORS') }}:</div>
    <ul>
      <li>Vasil Kostin</li>
      <li>Tom Kuna</li>
      <li>Ľuboš Repka</li>
      <li>Tomáš Trejdl</li>
    </ul>

    <div>
      {{ $store.state.app.appTitle }} {{ $t('ABOUT.VERSION') }}
      {{ $store.getters.appVersion }}
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 40rem;
  margin: 0 auto;

  .top-buttons {
    width: 100%;
    display: flex;
  }
}
</style>
