<template>
    <div class="flex w-3/5 items-center">
        <div class="relative bg-gray-200 h-2 p-px flex flex-1">
            <span :style="styleObject" class="block relative h-full rounded-sm bg-red-600 overflow-hidden"></span>
        </div>
        <div class="p-1 font-bold">
            <span>{{ currentProgress }}</span>
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ProgressBar',
    props: {
      actualStep: { type: String, required: true, defaultValue: 1}
    },
    computed: {
      ...mapGetters('questions', ['getFormSteps']),
      styleObject() { return { width: `${(parseInt(this.updatedStep, 10) / this.getFormSteps.length) * 100}%` } },
      updatedStep() { return parseInt(this.actualStep, 10) + 1; },
      currentProgress() { return `${this.updatedStep} / ${this.getFormSteps.length}`}
    }
  }
</script>
