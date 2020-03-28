<template>
  <div class="main-container">
    <div class="home-page-top-img">
      <h1 class="page-title">
        Vytváření účtu
      </h1>
      <img src="@/assets/img/form-page-top.png" alt="" />
    </div>

    <Stepper></Stepper>
  </div>
</template>

<script>
import Stepper from '../components/Stepper'

export default {
  components: { Stepper }
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.main-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .home-page-top-img {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 2;
    img {
      margin: 0 0 2em 0;
    }
  }
}
</style>
