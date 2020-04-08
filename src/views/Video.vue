<template>
  <div class="w-full flex flex-col justify-center items-center">
    <NavBar>
      <template v-slot:center>
        <h1>Smart Triage</h1>
      </template>
    </NavBar>
    <div class="videoWrapper">
      <iframe
        src="https://player.vimeo.com/video/404530226"
        frameborder="0"
        allow="autoplay; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
    <div class="max-w-lg p-4">
      <p>
        Aplikace Smart Triage pomáhá nemocnicím urychlit proces třídění pacientů
        na COVID-19 suspektní či nikoliv.
      </p>

      <p>Autoři:</p>
      <ul class="list-disc pl-8">
        <li>Tomáš Trejdl</li>
        <li>Ľuboš Repka</li>
        <li>Vasil Kostin</li>
        <li>Tom Kuna</li>
      </ul>
      <p>Voice over:</p>
      <ul class="list-disc pl-8">
        <li>
          Veronika Viktoria Matraszek
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.videoWrapper {
  max-width: 80vw;
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
