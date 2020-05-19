<template>
  <div class="page-wrapper">
    <div
      class="smooth-opacity"
      :class="{
        'opacity-50': !areCookiesAccepted
      }"
    >
      <NavBar slim>
        <template v-slot:right>
          <LocaleChanger short no-background></LocaleChanger>
        </template>
      </NavBar>
      <div class="page-content">
        <!-- HEADER -->
        <img
          v-if="locale == 'cs' || locale == 'sk'"
          class="h-16 mx-auto"
          src="@/assets/img/logo.svg"
          alt="Smart Triage logo"
        />
        <img
          v-else
          class="h-16 mx-auto"
          src="@/assets/img/logo_en.svg"
          alt="Smart Triage logo"
        />
        <p class="mt-4 text-xl text-secondary font-semibold">
          {{ $t('HOME.FILL_FORM_IN_YOUR_PHONE') }}<br />
          {{ $t('HOME.SHORTEN_THE_WAIT') }}
        </p>
        <img
          class="h-32 my-8 mx-auto"
          src="@/assets/img/home-page-welcome-img.png"
          alt=""
        />
        <!-- <p>{{ $t('HOME.WELCOME') }}</p> -->
        <!-- <h1 class="text-5xl">{{ $t('HOME.TITLE') }}</h1> -->
        <p class="text-xl text-secondary font-semibold">
          {{ $t('HOME.INFO') }}
        </p>

        <!-- PATIENT LIST -->
        <PatientList class="w-full my-1"></PatientList>

        <!-- ACTIONS -->
        <div class="w-full">
          <div v-if="patients.length === 0">
            <button
              class="btn-primary"
              @click="$router.push('/compatibility-check')"
            >
              <ion-icon
                class="btn-icon text-xl"
                name="create-outline"
              ></ion-icon>
              <span>{{ $t('HOME.FILL_FORM') }}</span>
            </button>
          </div>
          <div v-else>
            <button class="btn-primary" @click="createPatient">
              <ion-icon class="btn-icon" name="person-add-outline"></ion-icon>
              <span>{{ $t('HOME.FILL_FOR_ANOTHER_PERSON') }}</span>
            </button>
            <p class="my-1 text-secondary">{{ $t('HOME.NOT_GOING_ALONE') }}</p>
          </div>
        </div>

        <!-- BOTTOM LINKS -->
        <!--      <div class="bottom-link">-->
        <!--        <router-link to="/how-it-works">-->
        <!--          {{ $t('HOME.HOW_IT_WORKS') }}-->
        <!--        </router-link>-->
        <!--      </div>-->
        <div
          class="home-text home-h2-primary bg-white px-6 pb-6 mt-4 border-app"
        >
          <h2>{{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_H') }}</h2>
          <p>{{ $t('HOME.ABOUT_TRIAGE.WHAT_IS_TRIAGE_P') }}</p>
          <h2>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_H') }}</h2>
          <p>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_P') }}</p>
          <ol
            class="list-decimal list-inside my-6 text-secondary font-semibold leading-loose"
          >
            <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_1') }}</li>
            <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_2') }}</li>
            <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_3') }}</li>
            <li>{{ $t('HOME.ABOUT_TRIAGE.HOW_IT_WORKS_OL_4') }}</li>
          </ol>
          <h2>{{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_H') }}</h2>
          <p>{{ $t('HOME.ABOUT_TRIAGE.WHERE_IT_WORKS_P') }}</p>
        </div>
        <div class="home-text home-h2-secondary p-6 mt-4 border-app">
          <h2>{{ $t('HOME.PERSONAL_INFO.WHATS_HAPPENING_H') }}</h2>
          <p>{{ $t('HOME.PERSONAL_INFO.WHATS_HAPPENING_P') }}</p>
          <img
            class="my-8 mx-auto"
            src="@/assets/img/hand-holding-phone-scanning-qr-code.png"
            alt="Hand holding phone scanning QR code"
          />
          <h2>{{ $t('HOME.PERSONAL_INFO.APP_H') }}</h2>
          <p>{{ $t('HOME.PERSONAL_INFO.APP_P') }}</p>
        </div>
        <div
          class="text-center w-full max-w-lg home-h2-secondary bg-white px-6 pb-4 mt-4 border-app"
        >
          <h2>{{ $t('HOME.AUTHORS.WHO_IS_BEHIND_THIS_APP') }}</h2>
          <p>{{ $t('HOME.AUTHORS.US') }}</p>
          <div class="authors-pictures">
            <div>
              <img
                src="@/assets/img/avatar-lr.png"
                alt="Hand holding phone scanning QR code"
              />
              <p>
                <a href="https://www.linkedin.com/in/luborepka/">Ľuboš Repka</a>
              </p>
            </div>
            <div>
              <img
                src="@/assets/img/avatar-tk.png"
                alt="Hand holding phone scanning QR code"
              />
              <p>Tom Kuna</p>
            </div>
          </div>
          <div class="authors-pictures">
            <div>
              <img
                src="@/assets/img/avatar-tt.png"
                alt="Hand holding phone scanning QR code"
              />
              <p>
                <a href="https://www.linkedin.com/in/tomastrejdl/"
                  >Tomáš Trejdl
                </a>
              </p>
            </div>
            <div>
              <img
                src="@/assets/img/avatar-vk.png"
                alt="Hand holding phone scanning QR code"
              />
              <p>
                <a href="https://www.linkedin.com/in/vasilkostin/"
                  >Vasil Kostin</a
                >
              </p>
            </div>
          </div>
          <!-- <p>{{ $t('HOME.AUTHORS.PARTNERS') }}</p>
          <img
            class="my-8 mx-auto"
            src="@/assets/img/charles-university-logo.png"
            alt="Charles University logo"
          /> -->

          <!-- PARTNERS -->
          <h2>{{ $t('HOME.PARTNERS_H') }}</h2>
          <div class="w-full flex justify-around items-center my-8">
            <a href="https://artinsolutions.com">
              <img
                src="@/assets/img/partners-logos/artin.png"
                alt="Artin company logo"
            /></a>

            <a href="https://cuni.cz/">
              <img
                src="@/assets/img/charles-university-logo.png"
                alt="Charles University logo"
              />
            </a>
          </div>
        </div>
      </div>

      <!-- CALL TO ACTION -->
      <div class="w-full flex flex-col justify-center items-center mt-16">
        <p class="text-xl text-secondary font-semibold">
          {{ $t('HOME.FILL_FORM_IN_YOUR_PHONE') }}<br />
          {{ $t('HOME.SHORTEN_THE_WAIT') }}
        </p>
        <button class="btn-primary mt-4" @click="createPatient">
          <ion-icon class="btn-icon text-xl" name="create-outline"></ion-icon>
          <span>{{ $t('HOME.FILL_FORM') }}</span>
        </button>
      </div>

      <!-- FOOTER -->
      <div
        class="footer home-h2-secondary p-6 mt-4 border-app text-left w-full max-w-lg"
      >
        <img
          class="h-12 mx-auto"
          src="@/assets/img/logo.svg"
          alt="Smart Triage logo"
        />
        <p>
          <a href="">{{ $t('HOME.FOOTER.CONTACT') }}</a>
        </p>
        <p>
          <a href="">{{ $t('HOME.FOOTER.FAQ') }}</a>
        </p>
        <p>
          <a href="">{{ $t('HOME.FOOTER.FOR_HOSPITALS') }}</a>
        </p>
        <p>
          <a href="">{{ $t('HOME.FOOTER.FOR_EMPLOYEES') }}</a>
        </p>
        <p>
          <router-link to="/settings">
            {{ $t('HOME.SETTINGS') }}
          </router-link>
        </p>
        <div class="divider"></div>
        <p>
          <a href="">{{ $t('HOME.FOOTER.ABOUT_US') }}</a>
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
    </div>
    <footer>
      <cookies-check @accepted="hideOverlay()" />
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import PatientList from '@/components/PatientList'
import LocaleChanger from '@/components/LocaleChanger'
import CookiesCheck from '@/components/CookiesCheck'

export default {
  components: {
    PatientList,
    LocaleChanger,
    CookiesCheck
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
    areCookiesAccepted: localStorage.getItem('cookie:accepted')
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
