<template>
  <div
    class="footer home-h2-secondary p-6 mt-4 border-app text-left w-full max-w-lg"
  >
    <img
      class="h-12 mx-auto"
      src="@/assets/img/logo.svg"
      alt="Smart Triage logo"
    />
    <p>
      <router-link to="/contact">
        {{ $t('HOME.FOOTER.CONTACT') }}
      </router-link>
    </p>
    <!--        <p>-->
    <!--          <a href="">{{ $t('HOME.FOOTER.FOR_HOSPITALS') }}</a>-->
    <!--        </p>-->
    <!--        <p>-->
    <!--          <a href="">{{ $t('HOME.FOOTER.FOR_EMPLOYEES') }}</a>-->
    <!--        </p>-->
    <p>
      <router-link to="/settings">
        {{ $t('HOME.SETTINGS') }}
      </router-link>
    </p>
    <div class="divider"></div>
    <p>
      <router-link to="/team">
        {{ $t('HOME.FOOTER.ABOUT_US') }}
      </router-link>
    </p>
    <p>
      <a href="./privacy-policy/privacy-policy-cs.pdf">
        {{ $t('HOME.FOOTER.PRIVACY_POLICY') }}
      </a>
    </p>
    <p>
      <a href="./privacy-policy/privacy-policy-cs.pdf">
        {{ $t('HOME.FOOTER.TERMS_OF_SERVICE') }}
      </a>
    </p>
    <div class="copyright">
      <p class="mx-auto mt-6">{{ $t('HOME.FOOTER.COPYRIGHT') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeFooter'
}
</script>

<style scoped></style>
