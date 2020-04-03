<template>
  <div class="flex flex-col items-center h-screen">
    <NavBar :back-btn="true"> </NavBar>
    <div class="flex flex-col text-center items-center justify-center max-w-md">
      <h1 class="mb-6">{{ $t('ABOUT.ABOUT_THIS_APP') }}</h1>

      <img class="m-6" src="@/assets/img/home-page-welcome-img.png" alt="" />
      <div class="rounded-lg overflow-hidden shadow-lg m-6 p-6 bg-white">
        <p class="m-3">
          <strong>
            {{ $t('ABOUT.APP_SHORT_DESCRIPTION') }}
          </strong>
        </p>

        <p class="m-3">
          {{ $t('ABOUT.TRIAGE_DESCRIPTION') }}
        </p>

        <p class="m-3">
          {{ $t('ABOUT.CREATED_ON_HACKATHON') }}
        </p>
      </div>

      <div>
        <h2>{{ $t('ABOUT.AUTHORS') }}</h2>
      <ul>
        <li>Vasil Kostin</li>
        <li>Tom Kuna</li>
        <li>Ľuboš Repka</li>
        <li>Tomáš Trejdl</li>
      </ul>
      </div>


    </div>
          <div class="mt-auto p-4">
        {{ $store.state.app.appTitle }} {{ $t('ABOUT.VERSION') }}
        {{ $store.getters.appVersion }}
      </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
</style>
