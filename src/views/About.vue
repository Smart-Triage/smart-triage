<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
      <h1 class="mb-6">{{ $t('ABOUT.ABOUT_THIS_APP') }}</h1>
      <img class="m-6" src="@/assets/img/home-page-welcome-img.png" alt="" />
      <div class="card text-center">
        <p>
          <strong>
            {{ $t('ABOUT.APP_SHORT_DESCRIPTION') }}
          </strong>
        </p>

        <p>
          {{ $t('ABOUT.TRIAGE_DESCRIPTION') }}
        </p>

        <p>
          {{ $t('ABOUT.CREATED_ON_HACKATHON') }}
        </p>
      </div>

      <div class="my-6 text-center">
        <h2>{{ $t('ABOUT.AUTHORS') }}</h2>
        <ul>
          <li>Vasil Kostin</li>
          <li>Tom Kuna</li>
          <li>Ľuboš Repka</li>
          <li>Tomáš Trejdl</li>
        </ul>
      </div>
      <div class="text-xs mx-auto py-3">
        {{ $t('APP_TITLE') }} {{ $t('ABOUT.VERSION') }}
        {{ $store.getters.appVersion }}
        ({{ $store.getters.buildDate | formatDate }})
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
