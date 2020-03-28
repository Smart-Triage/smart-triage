<template>
  <div class="container">
    <div
      v-for="step in steps"
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
        <button @click="next(true)">Další</button>
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
        v-if="!isLast && currentStep.answer !== undefined"
        class="next"
        @click="next(null)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import PatientForm from './PatientForm'

export default {
  components: { PatientForm },
  data: () => ({
    currentStepNum: '0',
    visitedSteps: ['0'],
    steps: [
      {
        order: '0',
        question: 'Patient personal details',
        answerType: 'form',
        next: '1'
      },
      {
        order: '1',
        question: 'Měřil/a jste si v poslední době teplotu?',
        answerType: 'boolean',
        nextIfPositive: '1.1',
        nextIfNegative: '1.2'
      },
      {
        order: '1.1',
        question: 'Zadejte teplotu',
        answerType: 'slider',
        next: '2',
        pointsIfPositive: 3
      },
      {
        order: '1.2',
        question: 'Pociťoval/a jste zvýšené projevy teploty?',
        answerType: 'boolean',
        next: '2',
        pointsIfPositive: 2
      },
      {
        order: '2',
        question: 'Měl/a jste v poslední době kašel?',
        answerType: 'boolean',
        nextIfPositive: '2.1',
        nextIfNegative: '3'
      },
      {
        order: '2.1',
        question: 'Vlhký nebo suchý kašel?',
        answerType: 'one-of',
        options: [
          {
            text: 'Vlhký',
            value: 'vlhky'
          },
          {
            text: 'Suchý',
            value: 'suchy'
          }
        ],
        next: '3',
        pointsIfPositive: 2,
        pointsIfNegative: 2
      },
      {
        order: '3',
        question:
          'Měl/a jste v poslední době nezvyklý pocit tíhy na hrudi nebo dušnost?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '4'
      },
      {
        order: '4',
        question:
          'Měl/a jste v poslední době nezvykou únavu, třesavku nebo zimnici?',
        answerType: 'boolean',
        pointsIfPositive: 1,
        next: '5'
      },
      {
        order: '5',
        question: 'Vyberte příznaky, které jste během poslední doby měli:',
        answerType: 'checkbox',
        options: [
          { text: 'Rýma', value: 'ryma' },
          { text: 'Bolest v krku', value: 'bolest-v-krku' },
          {
            text: 'Bolest svalů nebo kloubů',
            value: 'bolest-svalu-nebo-kloubu'
          },
          { text: 'Ztráta chuti nebo čichu', value: 'ztrata-chuti-nebo-cichu' }
        ],
        next: '6'
      },
      {
        order: '6',
        question: 'Byl/a jste v poslední době v zahraničí?',
        answerType: 'boolean',
        next: '7'
      },
      {
        order: '7',
        question: 'Navštívil Vás někdo v posledních 14 dnech?',
        answerType: 'boolean',
        next: 'end'
      }
    ],
    temperatureValue: 36.5
  }),
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    currentStep() {
      return this.steps.find(step => step.order === this.currentStepNum)
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
          (this.currentStep.answer === true
            ? this.currentStep.nextIfPositive
            : this.currentStep.nextIfNegative) || this.currentStep.next
      } else {
        switch (typeof answer) {
          case 'boolean':
            this.currentStep.answer = answer
            if (answer === true)
              this.currentStepNum =
                this.currentStep.nextIfPositive || this.currentStep.next

            if (answer === false)
              this.currentStepNum =
                this.currentStep.nextIfNegative || this.currentStep.next
            break

          case 'object':
          case 'string':
            this.currentStep.answer = answer
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
