<template>
  <div class="flex w-3/5 items-center max-w-sm">
    <div class="relative bg-gray-200 h-3 p-px flex flex-1 rounded-full">
      <span
        :style="styleObject"
        class="block relative h-full rounded-sm bg-primary-color overflow-hidden rounded-full"
      ></span>
    </div>
    <div class="my-4 ml-4 px-4 py-2 font-bold bg-white rounded-full">
      <span>{{ currentProgress }}</span>
    </div>
  </div>
</template>

<script>
import getFormStepsMixin from '@/mixins/getFormStepsMixin'

export default {
  name: 'ProgressBar',
  mixins: [getFormStepsMixin],
  props: {
    actualStep: { type: String, required: true, defaultValue: 1 }
  },
  computed: {
    styleObject() {
      return {
        width: `${(parseInt(this.updatedStep, 10) / this.getFormSteps.length) *
          100}%`
      }
    },
    updatedStep() {
      return parseInt(this.actualStep, 10) + 1
    },
    currentProgress() {
      return `${this.updatedStep} / ${this.getFormSteps.length}`
    }
  }
}
</script>
