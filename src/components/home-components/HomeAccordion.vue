<template>
  <div>
    <button
      class="patient-item flex items-center cursor-pointer my-2 relative z-20"
      @click="isHidden = !isHidden"
    >
      <div class="patient-item-left">
        <h2 class="text-xl font-semibold">
          <slot name="heading"> </slot>
        </h2>
      </div>
      <div class="patient-item-right">
        <ion-icon
          class="iconAccordion"
          :name="isHidden ? 'chevron-down-outline' : 'chevron-up-outline'"
        ></ion-icon>
      </div>
    </button>
    <div class="info-container text-left" :class="{ hideInfo: isHidden }">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeAccordion',
  data: () => ({
    isHidden: true
  })
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';
.hideInfo {
  overflow: hidden;
  height: 0;
  padding: 0 2.5em 0 2.5em !important;
  opacity: 0;
}

.info-container {
  transform: translateY(-50px);
  display: flex;
  flex-direction: column;
  background-color: #fe887015;
  padding: 4em 2.5em 2em 2.5em;
  width: 100%;
  border-radius: 1.1em;
  max-height: 500px;
  transition: padding-bottom 0.5s ease-in, padding-top 0.5s ease-in,
    opacity 0.25s ease-in;
}

.edit-btn {
  cursor: pointer;
  font-size: 1em;
  background-color: $secondary-color;
  color: white;
  border-radius: 2em;
  padding: 0.5em 2em;
  width: fit-content;
  margin: 1rem auto 0 auto;
}

.patient-item {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.7rem 1rem;
  background: $secondary-color-light-new;
  color: white;
  border-radius: 10rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-size: 1em;

  .patient-item-left {
    display: flex;
    justify-self: center;
    margin: 0 auto;
    padding-left: 2rem;
    align-items: center;
    span {
      margin-left: 0.8em;
    }
    .patient-name {
      margin-left: 0.5rem;
    }
  }

  .patient-item-right {
    display: flex;
    align-items: center;
    justify-self: flex-end;
    ion-icon {
      margin-left: 1rem;
    }
  }
}

@media only screen and (max-width: 600px) {
  .info-container {
    padding: 4em 1.2em 2em 1.2em;
  }
}
</style>
