<template>
  <div v-if="dataIsReady">
    <div
      v-for="step in formSteps"
      :key="step.order"
      class="step"
      :class="{ hidden: step.order !== currentStepNum }"
    >
      <div v-if="step.order === '0'" class="home-page-top-img">
        <h1 class="page-title">Vytváření účtu</h1>
        <img src="@/assets/img/form-page-top.png" alt />
      </div>
      <div v-if="step.order !== '0'" class="home-page-top-img">
        <h1 class="page-title">Dotazník</h1>
        <img src="@/assets/img/form-page-top.png" alt />
      </div>
      <div class="container">
        <p
          v-if="step.order !== '0'"
          class="directions"
        >Nyní prosím zodpovězte několik otázek ohledně Vašeho zdraví.</p>
        <p class="question">{{ step.question }}</p>

        <div v-if="step.order === '0'">
          <PatientForm v-if="currentStepNum === '0'" @next="next(null)"></PatientForm>
        </div>

        <div v-if="step.answerType === 'boolean'" class="boolean-answer-button">
          <button :class="{ 'answer-active': step.answer === false }" @click="next(false)">No</button>
          <button :class="{ 'answer-active': step.answer === true }" @click="next(true)">Yes</button>
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
          >{{ option.text }}</button>
        </div>

        <div v-if="currentStepNum == '5' && step.answerType === 'checkbox'" class="checkbox-answer">
          <div v-for="option in step.options" :key="currentPatient + option.value">
            <label :for="option.value">{{ option.text }}</label>
            <input
              :id="option.value"
              v-model="
              currentPatient.answers[currentStepNum].find(
                op => op.value === option.value
              ).isChecked
            "
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
          v-if="currentPatient.answers[currentStepNum] !== undefined"
          class="next"
          @click="next(null)"
        >{{ isLast ? 'Sumary' : 'Next' }}</button>
      </div>
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
    temperatureValue: 36.5,
    dataIsReady: false
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
    if (!this.currentPatient.answers) {
      this.currentPatient.answers = {}
      this.formSteps.forEach(step => {
        switch (step.answerType) {
          case 'checkbox':
            this.currentPatient.answers[step.order] = []
            console.log(step.options)

            step.options.forEach(option => {
              this.currentPatient.answers[step.order].push({
                value: option.value,
                isChecked: false
              })
            })
            break
          default:
            break
        }
      })
    }
    console.log(this.currentPatient)

    this.dataIsReady = true
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
@import '@/theme/general.scss';

.container {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  width: 100vw;
  align-items: center;
  margin: 0 auto;
  background-color: white;
  border-radius: 2em 2em 0 0;
  max-width: 400px;
  padding: 0 0 2em 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.boolean-answer-button,
.slider-answer-slider,
.one-of-answer {
  button {
    font-size: 1.1em;
    background-color: $light-button-color;
    border-radius: 2em;
    border: none;
    padding: 0.8em 2em;
    margin: 0.5em;
  }

  button:hover {
    background-color: $dark-button-color;
  }
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

.question {
  text-align: center;
  font-size: 1.3em;
  font-weight: 600;
  padding: 1em 0.5em;
}

.directions {
  text-align: center;
  font-size: 0.8em;
  padding: 1em 3em 0 3em;
}

.checkbox-answer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
