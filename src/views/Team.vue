<template>
  <div class="page-wrapper">
    <NavBar sticky back-button></NavBar>
    <div class="page-content">
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
        <partners />
      </div>
    </div>
  </div>
</template>

<script>
import Partners from '@/components/home-components/Partners'

export default {
  name: 'Team',
  components: { Partners }
}
</script>

<style scoped></style>
