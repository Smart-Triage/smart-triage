<template>
  <div class="container">
    <div class="top-buttons">
      <router-link class="icon-button" to="/home"
        ><ion-icon name="arrow-back-outline" size="large"></ion-icon
      ></router-link>
    </div>
    <h1>How it wokrs</h1>

    <img src="@/assets/img/hand-holding-phone-scanning-qr-code.png" alt="" />

    <p>
      This app is intended for people who are about to be tested for COVID-19.
      If you're going to the hospital, you can fill this form on your smartphone
      at home and take your phone to the hospital with you
    </p>

    <ol>
      <li>Fill form for yourself</li>
      <li>[optinal] Fill form for other people who are comming with you</li>
      <li>Show the QR code to the hospital staff</li>
    </ol>
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
  img {
    max-width: 20rem;
  }
}
</style>
