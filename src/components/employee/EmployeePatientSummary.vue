<template>
  <div v-if="patient">
    <div v-if="isConfirmed(patient)" class="is-confirmed">
      <ConfirmationBox :patient="patient"></ConfirmationBox>
    </div>
    <button
      class="patient-item flex justify-between items-center cursor-pointer my-2 relative z-20"
      @click="patientSymptomsHidden = !patientSymptomsHidden"
    >
      <div class="patient-item-left">
        <ion-icon name="thermometer-outline"></ion-icon>
        <span>{{ $t('PATIENT_SUMMARY.SYMPTOPMS') }}</span>
      </div>
      <div class="patient-item-right">
        <ion-icon
          :name="
            patientSymptomsHidden
              ? 'chevron-down-outline'
              : 'chevron-up-outline'
          "
        ></ion-icon>
      </div>
    </button>
    <div
      :class="{ hideInfo: patientSymptomsHidden }"
      class="info-container text-left"
    >
      <div
        v-for="step in formStepsToShow"
        :key="step.order"
        class="flex border-b border-gray-700 my-1 py-1"
      >
        <div class="font-semibold">
          <div
            class="font-medium text-secondary"
            :class="{
              'font-semibold': step.highlightIf === patient.answers[step.order]
            }"
          >
            {{ step.question }}
          </div>
          <div v-if="step.answerType === 'boolean'">
            <span v-if="!editingAnswers">{{
              patient.answers[step.order] === true ? $t('YES') : $t('NO')
            }}</span>
            <div v-if="editingAnswers">
              <yes-no-component
                :button-active="answers[step.order]"
                :small-buttons="true"
                @next="edit($event, step.order)"
              />
            </div>
          </div>
          <div v-else-if="step.answerType === 'one-of'">
            <span v-if="!editingAnswers">
              {{
                getFormSteps
                  .find(s => s.order === step.order)
                  .options.find(o => o.value === patient.answers[step.order])
                  .text
              }}
            </span>
            <one-choice-component
              v-if="editingAnswers"
              :button-active="answers[step.order]"
              :small-buttons="true"
              :options="step.options"
              @next="edit($event, step.order)"
            />
          </div>
          <div v-else-if="step.answerType === 'checkbox'">
            <span v-if="!editingAnswers">
              <span
                v-for="option in patient.answers[step.order]"
                :key="option.value"
                >{{
                  option.isChecked
                    ? getFormSteps
                        .find(s => s.order === step.order)
                        .options.find(o => o.value === option.value).text + ', '
                    : ''
                }}</span
              >
            </span>
            <div v-if="editingAnswers">
              <check-box-component
                :checked-steps="answers[step.order]"
                :options="step.options"
                :current-patient="patient"
                :editable="true"
              />
            </div>
          </div>
          <span v-else>{{ patient.answers[step.order] }}</span>
        </div>
        <div
          v-if="step.highlightIf === patient.answers[step.order]"
          class="flex items-center"
        >
          <ion-icon
            name="alert-circle-outline"
            size="large"
            class="text-red-500"
          ></ion-icon>
        </div>
      </div>
      <button
        v-if="!editingAnswers"
        class="edit-btn"
        @click="editingAnswers = true"
      >
        {{ $t('EDIT') }}
      </button>
      <button v-if="editingAnswers" class="edit-btn" @click="saveAnwers()">
        {{ $t('SAVE') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import ConfirmationBox from '@/components/ConfirmationBox'
import { getFormStepsMixin, isConfirmedMixin } from '@/mixins'
import { cloneDeep } from 'lodash'
import YesNoComponent from '@/components/form-components/YesNoComponent'
import OneChoiceComponent from '@/components/form-components/OneChoiceComponent'
import CheckBoxComponent from '@/components/form-components/CheckBoxComponent'

export default {
  components: {
    ConfirmationBox,
    YesNoComponent,
    OneChoiceComponent,
    CheckBoxComponent
  },
  mixins: [getFormStepsMixin, isConfirmedMixin],
  props: {
    patient: { type: Object, required: true }
  },
  data() {
    return {
      patientInfoHidden: this.isConfirmed(this.patient),
      patientSymptomsHidden: this.isConfirmed(this.patient),
      editingAnswers: false,
      answers: {}
    }
  },
  computed: {
    formStepsToShow() {
      if (!this.patient) return []
      const stepsToShow = []
      this.getFormSteps.forEach(step => {
        if (Object.keys(this.patient.answers).indexOf(step.order) > -1)
          stepsToShow.push(step)
      })
      return stepsToShow
    }
  },
  mounted() {
    this.answers = cloneDeep(this.patient.answers)
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    edit(answer, num) {
      switch (typeof answer) {
        case 'boolean':
          this.answers[num] = answer
          break
        case 'string':
          this.answers[num] = answer
            .replace(/\s\s+/g, ' ') // replace multiple whitespaces with only one
            .split(' ')
            .join('')
            .trim()
          break
        default:
          this.answers[num] = answer
          break
      }
    },
    saveAnwers() {
      this.editingAnswers = false
      this.setCurrentPatientValueByKey({
        key: 'answers',
        value: cloneDeep(this.answers)
      })
      this.answers = cloneDeep(this.patient.answers)
    }
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

ion-icon {
  font-size: 1.3em;
}

.hideInfo {
  overflow: hidden;
  height: 0;
  padding: 0 !important;
}

.symptoms-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  align-self: flex-start;
  padding: 0 3em;
}

.info-container {
  transform: translateY(-50px);
  display: flex;
  flex-direction: column;
  background-color: #32227f15;
  padding: 3em 2em 1em 2em;
  width: 100%;
  border-radius: 1.1em;
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
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  background: $secondary-color;
  color: white;
  border-radius: 10rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-size: 1em;

  .patient-item-left {
    display: flex;
    margin-left: 0.5em;
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

    ion-icon {
      margin-left: 1rem;
    }
  }
}
</style>
