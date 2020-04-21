<template>
  <div v-if="dataIsReady" class=" w-full h-full">
    <div
      v-for="step in getFormSteps"
      :key="step.order"
      class="step w-full h-full"
      :class="{ hidden: step.order !== currentStepNum }"
    >
      <NavBar>
        <template v-slot:left>
          <router-link
            class="close"
            :to="appMode === 'employee' ? '/employee#patient-summary' : '/home'"
            ><ion-icon name="close" size="large"></ion-icon
          ></router-link>
        </template>
        <template v-slot:center>
          <span v-if="step.order === '0'">
            {{ $t('FORM.PERSONAL_DETAILS') }}
          </span>
          <span v-else>
            {{ $t('FORM.QUESTIONNAIRE') }}
          </span>
        </template>
        <template v-slot:right>
          <router-link
            v-if="currentPatient.finished"
            class="skip-to-summary"
            :to="
              appMode === 'employee' ? '/employee#patient-summary' : '/summary'
            "
            >{{ $t('FORM.SKIP_TO_SUMMARY') }}</router-link
          >
        </template>
      </NavBar>
      <div class="mb-8">
        <img src="@/assets/img/form-page-top.png" class="h-32 sm:h-full" />
      </div>

      <ProgressBar :actualStep="step.order"></ProgressBar>

      <div class="flex-grow"></div>

      <transition name="view" mode="out-in">
        <div
          class="question-box w-full max-w-lg flex flex-col justify-between bg-white form-div items-center mx-2 sm:mx-4"
        >
          <p v-if="step.order !== '0'" class="directions">
            {{ $t('FORM.ANSWER_A_FEW_QUESTIONS') }}
          </p>
          <p v-if="currentStepNum !== '0'" class="question">
            {{ step.question }}
          </p>

          <div v-if="step.order === '0'">
            <PatientForm
              v-if="currentStepNum === '0'"
              :form-fields="step.formFields"
              @next="next(null)"
            ></PatientForm>
          </div>

          <div
            v-if="step.answerType === 'boolean'"
            class="boolean-answer-button"
          >
            <button
              :class="{ 'button-active': answers[currentStepNum] == false }"
              @click="next(false)"
            >
              {{ $t('NO') }}
            </button>
            <button
              :class="{ 'button-active': answers[currentStepNum] == true }"
              @click="next(true)"
            >
              {{ $t('YES') }}
            </button>
          </div>

          <div v-if="step.answerType === 'slider'" class="slider-answer-slider">
            <div class="slider-value">{{ temperatureValue }}</div>
            <input
              v-model="temperatureValue"
              type="range"
              min="36"
              max="42"
              step="0.1"
              class="slider"
            />
            <button @click="next(temperatureValue)">{{ $t('NEXT') }}</button>
          </div>

          <div v-if="step.answerType === 'one-of'" class="one-of-answer">
            <button
              v-for="option in step.options"
              :key="option.value"
              :class="{
                'button-active': answers[currentStepNum] === option.value
              }"
              @click="next(option.value)"
            >
              {{ option.text }}
            </button>
          </div>

          <div
            v-if="currentStepNum == '5' && step.answerType === 'checkbox'"
            class="checkbox-answer"
          >
            <div
              v-for="option in step.options"
              :key="currentPatient + option.value"
              class="checkbox-wrapper"
            >
              <input
                :id="option.value"
                v-model="
                  answers[currentStepNum].find(op => op.value === option.value)
                    .isChecked
                "
                :value="option.value"
                type="checkbox"
                class="hideCheckbox"
              />
              <label :for="option.value">{{ option.text }}</label>
            </div>

            <button @click="next(step.options)">{{ $t('NEXT') }}</button>
          </div>

          <div class="spacer"></div>
          <div v-if="currentStepNum !== '0'" class="buttons">
            <button v-if="!isFirst" class="icon-button prev" @click="prev()">
              <ion-icon name="chevron-back-outline" size="large"></ion-icon>
            </button>
            <div class="spacer"></div>
            <button
              v-if="currentPatient.answers[currentStepNum] !== undefined"
              class="icon-button next"
              @click="next(null)"
            >
              <ion-icon name="chevron-forward-outline" size="large"></ion-icon>
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { cloneDeep } from 'lodash'
import PatientForm from '@/components/PatientForm'
import ProgressBar from '@/components/ProgressBar'

export default {
  components: { ProgressBar, PatientForm },
  data: () => ({
    currentStepNum: '0',
    visitedSteps: ['0'],
    temperatureValue: 36.5,
    dataIsReady: false,
    answers: {}
  }),
  computed: {
    ...mapGetters('questions', ['getFormSteps']),
    ...mapGetters('patients', ['currentPatient']),
    ...mapState('settings', ['appMode']),
    currentStep() {
      return this.getFormSteps.find(step => step.order === this.currentStepNum)
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
      // If visitedSteps are not defined set te default value ['0']
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: ['0']
      })
    } else if (this.currentPatient.visitedSteps.indexOf('end') > -1) {
      // Comming back to form after finishing, show form from beginning
      this.visitedSteps = ['0']
      this.currentStepNum = '0'
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: ['0']
      })
    } else {
      // clone visitedStepos from vuex store
      this.visitedSteps = cloneDeep(this.currentPatient.visitedSteps)
      this.currentStepNum = cloneDeep(
        this.currentPatient.visitedSteps[
          this.currentPatient.visitedSteps.length - 1
        ]
      )
    }

    if (!this.currentPatient.answers) {
      // If answers are not defined for current patient (first time in form), prepopulate the object with default values
      this.answers = {}
      this.getFormSteps.forEach(step => {
        switch (step.answerType) {
          case 'checkbox':
            this.answers[step.order] = []

            step.options.forEach(option => {
              this.answers[step.order].push({
                value: option.value,
                isChecked: false
              })
            })
            break
          default:
            break
        }

        this.setCurrentPatientValueByKey({
          key: 'answers',
          value: cloneDeep(this.answers)
        })
      })
    } else {
      // Answers are defined, clone then locally to this.answers
      Object.keys(this.currentPatient.answers).forEach(
        key => (this.answers[key] = cloneDeep(this.currentPatient.answers[key]))
      )
    }
    const stepNumFromUrl = this.$route.hash.substr(1).trim()
    if (stepNumFromUrl.length > 1) {
      // Check if hash in URL is a valid step
      if (
        this.getFormSteps.map(step => step.order).indexOf(stepNumFromUrl) > -1
      )
        this.$router.replace('')
    }

    // Set correct hash in URL
    if (stepNumFromUrl !== this.currentStepNum)
      this.$router.replace(`#${this.currentStepNum}`)

    this.dataIsReady = true
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    prev() {
      if (this.visitedSteps.length === 0) return

      this.visitedSteps.pop()
      this.currentStepNum = cloneDeep(
        this.visitedSteps[this.visitedSteps.length - 1]
      )
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: cloneDeep(this.visitedSteps)
      })

      // Update hash in URL with correct step number
      this.$router.push(`#${this.currentStepNum}`)
    },
    next(answer) {
      if (answer === null) {
        // Navigating by clicking Next button, keep the last saved value for this step
        this.currentStepNum = cloneDeep(
          (this.currentPatient.answers[this.currentStepNum] === true
            ? this.currentStep.nextIfPositive
            : this.currentStep.nextIfNegative) || this.currentStep.next
        )
      } else {
        // Save prevous value
        const previousAnswer = this.answers[this.currentStepNum]

        // Check if answer has changed from the previous answer
        if (previousAnswer !== answer) {
          const stepsToReset = this.getFormSteps
            .filter(
              step =>
                step.order.substr(0, 1) === this.currentStepNum.substr(0, 1)
            )
            .map(step => step.order)
            .filter(
              stepToReset =>
                stepToReset.length > 1 &&
                parseInt(stepToReset.substr(2), 10) >
                  (parseInt(this.currentStepNum.substr(2), 10) || 0)
            )

          // Reset answers for follow-up questions (e.g. 1 has changed, reset 1.1, 1.2, ...)
          stepsToReset.forEach(stepToReset => {
            delete this.answers[stepToReset]
          })
        }

        // Navigating by selecting an answer, save the answer to store
        switch (typeof answer) {
          case 'boolean':
            this.answers[this.currentStepNum] = answer
            if (answer === true)
              this.currentStepNum = cloneDeep(
                this.currentStep.nextIfPositive || this.currentStep.next
              )

            if (answer === false)
              this.currentStepNum = cloneDeep(
                this.currentStep.nextIfNegative || this.currentStep.next
              )
            break

          case 'number':
            this.answers[this.currentStepNum] = answer
            this.currentStepNum = cloneDeep(this.currentStep.next)
            break

          case 'string':
            this.answers[this.currentStepNum] = answer
              .replace(/\s\s+/g, ' ') // replace multiple whitespaces with only one
              .split(' ')
              .join('')
              .trim()
            this.currentStepNum = cloneDeep(this.currentStep.next)
            break

          default:
            this.currentStepNum = cloneDeep(this.currentStep.next)
            break
        }
        // Save to vuex store
        this.setCurrentPatientValueByKey({
          key: 'answers',
          value: cloneDeep(this.answers)
        })
      }
      // Add this steps to visited steps
      this.visitedSteps.push(cloneDeep(this.currentStepNum))
      // Update visited step in vuex store
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: cloneDeep(this.visitedSteps)
      })

      // When on last step navigate to summary
      if (this.currentStepNum === 'end')
        this.$router.push(
          this.appMode === 'employee' ? 'employee#patient-summary' : '/summary'
        )
      // Else update hash in URL with correct step number
      else this.$router.push(`#${this.currentStepNum}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/general.scss';

.form-div {
  border-radius: 2em 2em 0 0;
}

.container {
  .spacer {
    flex-grow: 1;
  }
}

.skip-to-summary {
  color: white;
  background-color: $secondary-color;
  padding: 0 1rem;
  border-radius: 5rem;
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
  padding: 1rem;
}

.boolean-answer-button,
.slider-answer-slider,
.one-of-answer,
.checkbox-answer {
  button {
    font-size: 1.1em;
    background-color: $light-button-color;
    border-radius: 2em;
    border: none;
    padding: 0.8em 2em;
    margin: 0.5em;
  }

  .button-active {
    background-color: $primary-color;
  }

  button:hover {
    background-color: $dark-button-color;
  }
}

.hidden {
  display: none;
}

.slider-answer-slider {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  .slider-value {
    font-size: 1.2rem;
  }

  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    margin: 1rem 0 2rem;
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

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem 1em;
    margin: 0.5rem 0;
    background: white;
    border-radius: 10rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

    label {
      margin-left: 0.5rem;
    }
  }
}

.question-box {
  min-height: 50vh;
}
</style>
