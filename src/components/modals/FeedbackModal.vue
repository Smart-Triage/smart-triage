<template>
  <transition name="fade" appear>
    <div
      v-if="open"
      class="absolute inset-0 p-8 z-40 flex justify-center items-center"
      style="background-color: hsla(0, 0%, 0%, .5)"
      @click="close"
    >
      <transition name="slide-up" appear>
        <div
          class="max-w-sm w-full bg-white rounded-2xl p-6 mt-8 z-50 shadow-lg"
          @click.stop
        >
          <h1 class="font-normal text-xl text-center mb-6">
            <span v-if="likingApp">{{ $t('MODAL.LIKE_OUR_APP') }}?</span>
            <span v-else>{{ $t('MODAL.HAVE_SUGGESTIONS') }}?</span>
          </h1>

          <p>
            {{ $t('MODAL.GIVE_US_FEEDBACK') }}
          </p>

          <div class="text-right mt-4">
            <button
              class="text-grey-darker hover:text-black hover:underline mr-6"
              @click="close"
            >
              {{ $t('MODAL.NOT_INTERESTED') }}
            </button>
            <a
              href="https://forms.google.com"
              class="bg-primary text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-dark"
            >
              {{ $t('MODAL.SURE') }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    open: { type: Boolean, default: false },
    likingApp: { type: Boolean, default: true }
  },
  created() {
    document.addEventListener('keydown', e => {
      if (this.open && e.keyCode === 27) {
        this.close()
        document.removeEventListener('keydown', this)
      }
    })
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
