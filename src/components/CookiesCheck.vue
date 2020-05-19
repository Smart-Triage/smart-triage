<template>
  <cookie-law>
    <div slot-scope="props" class="cookie-box">
      <p class="text-secondary text-sm font-medium pb-6">
        {{ $t('HOME.FOOTER.COOKIES_INFO') }}
      </p>
      <div class="flex justify-between">
        <div class="m-auto flex-grow text-left text-xs">
          <a
            href="./privacy-policy/privacy-policy-cs.pdf"
            class="text-secondary underline"
          >
            {{ $t('HOME.FOOTER.PRIVACY_POLICY') }}
          </a>
        </div>
        <div>
          <button class="btn-primary" @click="acceptCookies(props)">
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  </cookie-law>
</template>

<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'CookiesCheck',
  components: {
    CookieLaw
  },
  methods: {
    acceptCookies(props) {
      props.accept()
      this.$emit('accepted')
    }
  }
}
</script>

<style scoped>
.cookie-box {
  width: 100%;
}

.Cookie--base {
  border-top-left-radius: 2em;
  border-top-right-radius: 2em;
}
</style>
