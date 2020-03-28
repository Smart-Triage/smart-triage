<template>
  <div class="container">
    <div
      v-for="step in formSteps"
      :key="step.order"
      class="step"
      :class="{ hidden: step.order !== currentStepNum }"
    >
      {{ step.question }}

      <div v-if="step.order === '0'">
        <PatientForm
          v-if="currentStepNum === '0'"
          @next="next(null)"
        ></PatientForm>
      </div>

      <div v-if="step.answerType === 'boolean'" class="boolean-answer-button">
        <button
          :class="{ 'answer-active': step.answer === false }"
          @click="next(false)"
        >
          No
        </button>
        <button
          :class="{ 'answer-active': step.answer === true }"
          @click="next(true)"
        >
          Yes
        </button>
      </div>

      <div v-if="step.answerType === 'slider'" class="slider-answer-slider">
        <div>{{ temperatureValue }}</div>
        <input
          v-model="temperatureValue"
          type="range"
          min="36.5"
          max="42"
          step="0.5"
          class="slider"
        />
        <button @click="next(temperatureValue)">Další</button>
      </div>

      <div v-if="step.answerType === 'one-of'" class="one-of-answer">
        <button
          v-for="option in step.options"
          :key="option.value"
          :class="{ 'answer-active': step.answer === option.value }"
          @click="next(option.value)"
        >
          {{ option.text }}
        </button>
      </div>

      <div v-if="step.answerType === 'checkbox'" class="checkbox-answer">
        <div v-for="option in step.options" :key="option.value">
          <label :for="option.value">{{ option.text }}</label>
          <input
            :id="option.value"
            v-model="option.isChecked"
            :value="option.value"
            type="checkbox"
          />
        </div>

        <button @click="next(step.options)">Další</button>
      </div>
    </div>

    <div class="buttons">
      <button v-if="!isFirst" class="prev" @click="prev()">Previous</button>
      <div class="spacer"></div>
      <button
        v-if="!isLast && currentPatient.answers[currentStepNum] !== undefined"
        class="next"
        @click="next(null)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import PatientForm from './PatientForm'

export default {
  components: { PatientForm },
  data: () => ({
    currentStepNum: '0',
    visitedSteps: ['0'],
    temperatureValue: 36.5
  }),
  computed: {
    ...mapState('patients', ['formSteps']),
    ...mapGetters('patients', ['currentPatient']),
    currentStep() {
      return this.formSteps.find(step => step.order === this.currentStepNum)
    },
    isLast() {
      return this.currentStepNum === '7'
    },
    isFirst() {
      return this.currentStepNum === '0'
    }
  },
  mounted() {
    if (!this.currentPatient.visitedSteps) {
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: ['0']
      })
    } else if (this.currentPatient.visitedSteps.indexOf('end') > -1) {
      this.visitedSteps = ['0']
      this.currentStepNum = '0'
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: ['0']
      })
    } else {
      this.visitedSteps = this.currentPatient.visitedSteps
      this.currentStepNum = this.currentPatient.visitedSteps[
        this.currentPatient.visitedSteps.length - 1
      ]
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    prev() {
      if (this.visitedSteps.length === 0) return

      this.visitedSteps.pop()
      this.currentStepNum = this.visitedSteps[this.visitedSteps.length - 1]
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: this.visitedSteps
      })
    },
    next(answer) {
      if (answer === null) {
        this.currentStepNum =
          (this.currentPatient.answers[this.currentStepNum] === true
            ? this.currentStep.nextIfPositive
            : this.currentStep.nextIfNegative) || this.currentStep.next
      } else {
        switch (typeof answer) {
          case 'boolean':
            this.currentPatient.answers[this.currentStepNum] = answer
            if (answer === true)
              this.currentStepNum =
                this.currentStep.nextIfPositive || this.currentStep.next

            if (answer === false)
              this.currentStepNum =
                this.currentStep.nextIfNegative || this.currentStep.next
            break

          case 'number':
          case 'string':
            this.currentPatient.answers[this.currentStepNum] = answer
            this.currentStepNum = this.currentStep.next
            break

          case 'object':
            if (Array.isArray(answer)) {
              const checkedOptions = answer
                .filter(option => option.isChecked === true)
                .map(option => option.value)

              this.currentPatient.answers[this.currentStepNum] = checkedOptions
              this.currentStepNum = this.currentStep.next
            }
            break

          default:
            this.currentStepNum = this.currentStep.next
            break
        }
      }
      this.visitedSteps.push(this.currentStepNum)
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: this.visitedSteps
      })

      if (this.currentStepNum === 'end') {
        this.$router.push('/summary')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/variables.scss';

.container {
  min-height: 50vh;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  padding: 1rem;
}

.hidden {
  display: none;
}

.slider-answer-slider {
  display: flex;
  flex-direction: column;
  align-items: center;

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    margin: 1rem;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: $primary-color;
    cursor: pointer;
  }
}

.answer-active {
  background-color: $primary-color;
  color: white;
}
</style>
