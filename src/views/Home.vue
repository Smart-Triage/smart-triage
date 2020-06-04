<template>
  <div class="page-wrapper">
    <div
      class="smooth-opacity"
      :class="{
        'opacity-50': !areCookiesAccepted
      }"
    >
      <NavBar slim>
        <template v-slot:left>
          <Menu />
        </template>
        <template v-slot:center>
          <img
            v-if="locale === 'cs' || locale === 'sk'"
            class="h-8 mx-auto"
            src="@/assets/img/logo.svg"
            alt="Smart Triage logo"
          />
          <img
            v-else
            class="h-8 mx-auto"
            src="@/assets/img/logo_en.svg"
            alt="Smart Triage logo"
          />
        </template>
        <template v-slot:right>
          <LocaleChanger short no-background></LocaleChanger>
        </template>
      </NavBar>
      <div class="page-content">
        <!-- HEADER -->
        <p class="mt-12 text-xl font-semibold">
          {{ $t('HOME.FILL_FORM_IN_YOUR_PHONE') }}<br />
          {{ $t('HOME.SHORTEN_THE_WAIT') }}
        </p>

        <!-- ACTIONS -->
        <div class="w-full">
          <router-link to="/person-list">
            <button class="btn-primary text-2xl my-12">
              <ion-icon
                class="btn-icon text-2xl"
                name="create-outline"
              ></ion-icon>
              <span>{{ $t('HOME.FILL_FORM') }}</span>
            </button>
          </router-link>
        </div>

        <p class="mb-12" v-html="$t('HOME.INFO')"></p>

        <HomeAccordion>
          <template v-slot:heading>
            {{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_H') }}
          </template>
          <template v-slot:content>
            <p>{{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_P') }}</p>
          </template>
        </HomeAccordion>

        <HomeAccordion>
          <template v-slot:heading>
            {{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_H') }}
          </template>
          <template v-slot:content>
            <p>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_P') }}</p>
            <ol
              class="list-decimal list-inside my-6 text-secondary font-semibold leading-loose"
            >
              <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_1') }}</li>
              <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_2') }}</li>
              <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_3') }}</li>
              <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_4') }}</li>
            </ol>
          </template>
        </HomeAccordion>

        <HomeAccordion>
          <template v-slot:heading>
            {{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_H') }}
          </template>
          <template v-slot:content>
            <p>{{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_P') }}</p>
          </template>
        </HomeAccordion>

        <div class="home-text home-h2-secondary p-6 mt-4 border-app">
          <h2>{{ $t('HOME.PERSONAL_INFO.WHATS_HAPPENING_H') }}</h2>
          <p v-html="$t('HOME.PERSONAL_INFO.WHATS_HAPPENING_P')"></p>
          <img
            class="my-8 mx-auto"
            src="@/assets/img/hand-holding-phone-scanning-qr-code.png"
            alt="Hand holding phone scanning QR code"
          />
          <h2>{{ $t('HOME.PERSONAL_INFO.APP_H') }}</h2>
          <p v-html="$t('HOME.PERSONAL_INFO.APP_P')"></p>
        </div>
      </div>

      <!-- PARTNERS -->
      <partners />

      <!-- CALL TO ACTION -->
      <div
        class="w-full flex flex-col justify-center items-center mt-16 text-center"
      >
        <p class="text-xl text-secondary font-semibold">
          {{ $t('HOME.FILL_FORM_IN_YOUR_PHONE') }}<br />
          {{ $t('HOME.SHORTEN_THE_WAIT') }}
        </p>
        <router-link to="/person-list">
          <button class="btn-primary text-2xl my-8">
            <ion-icon class="btn-icon text-xl" name="create-outline"></ion-icon>
            <span>{{ $t('HOME.FILL_FORM') }}</span>
          </button>
        </router-link>
      </div>

      <!-- FOOTER -->
      <home-footer />
    </div>
    <footer>
      <cookies-check @accepted="hideOverlay()" />
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LocaleChanger from '@/components/LocaleChanger'
import CookiesCheck from '@/components/home-components/CookiesCheck'
import HomeAccordion from '@/components/home-components/HomeAccordion'
import Menu from '@/components/Menu'
import Partners from '@/components/home-components/Partners'
import HomeFooter from '@/components/home-components/HomeFooter'

export default {
  components: {
    LocaleChanger,
    CookiesCheck,
    HomeAccordion,
    Menu,
    Partners,
    HomeFooter
  },
  head() {
    return {
      title: {
        inner: this.$t('APP_TITLE'),
        separator: ' ',
        complement: ' '
      },
      meta: [
        {
          name: 'description',
          content: `${this.$t('APP_TITLE')} home page`,
          id: 'desc'
        }
      ]
    }
  },
  data: () => ({
    areCookiesAccepted: localStorage.getItem('cookie:accepted'),
    whatIsTriageHidden: false,
    howItWorksHidden: true
  }),
  computed: {
    ...mapState('patients', ['patients']),
    ...mapState('settings', ['locale'])
  },
  mounted() {
    this.setAppMode('patient')
  },
  methods: {
    ...mapActions('patients', ['createNewPatient']),
    ...mapActions('settings', ['setAppMode']),
    hideOverlay() {
      this.areCookiesAccepted = true
    },
    async createPatient() {
      await this.createNewPatient()
      this.$router.push('/form')
    }
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';

.authors-pictures {
  @apply flex flex-row;
  div {
    @apply m-8;

    img {
      @apply rounded-full;
    }

    p {
      color: $secondary-color;
      @apply mt-4 font-semibold text-xl;
    }
  }
}

.divider {
  height: 2px;
  @apply my-4 w-20 bg-black;
}

.footer {
  color: black;
  @apply font-semibold leading-8;
}

.copyright {
  text-align: center;
}

.smooth-opacity {
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -ms-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}
</style>
