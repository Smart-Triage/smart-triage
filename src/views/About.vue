<template>
  <div class="container">
    <div class="top-buttons">
      <router-link class="icon-button" to="/home"
        ><ion-icon name="arrow-back-outline" size="large"></ion-icon
      ></router-link>
    </div>
    <h1>About this app</h1>

    <img src="@/assets/img/home-page-welcome-img.png" alt="" />

    <p>
      This application is designed to significantly speed up patient triage in
      hospitals and mobile test ambulances during COVID-19 testing.
    </p>

    <p>
      Triage is the process of determining the priority of patients' treatments
      based on the severity of their condition or likelyhood of recovery with
      and without treatment
    </p>

    <p>
      This applicatin was created as a submission for the Hack Košice Digital
      hackathon 2020.
    </p>

    <div>Authors:</div>
    <ul>
      <li>Vasil Kostin</li>
      <li>Tom Kuna</li>
      <li>Ľuboš Repka</li>
      <li>Tomáš Trejdl</li>
    </ul>
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
