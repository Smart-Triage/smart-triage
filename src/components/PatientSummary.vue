<template>
  <div v-if="currentPatient" class="container">
    <div
      v-if="
        currentPatient.confirmation &&
          currentPatient.confirmation.confirmedBy.length > 1 &&
          currentPatient.confirmation.timestamp
      "
      class="is-confirmed"
    >
      <div>Confirmed by {{ currentPatient.confirmation.confirmedBy }}</div>
      <div>{{ currentPatient.confirmation.timestamp }}</div>
    </div>
    <button
      :class="{ changecolor: !patientInfoHidden }"
      class="btn-secondary accordion-button"
      @click="patientInfoHidden = !patientInfoHidden"
    >
      <ion-icon name="person-outline"></ion-icon>
      Patient info
      <ion-icon
        class="iconAccordion"
        :name="
          patientInfoHidden ? 'chevron-down-outline' : 'chevron-up-outline'
        "
      ></ion-icon>
    </button>
    <transition name="unroll">
      <div
        class="info-container questionInfo"
        :class="{ hideInfo: patientInfoHidden }"
      >
        <p><b>Name</b></p>
        <span>{{
          currentPatient.firstName + ' ' + currentPatient.lastName
        }}</span>
        <hr class="dividerInfo" />
        <p><b>Birth number</b></p>
        <span>{{ currentPatient.birthNumber }}</span>
        <hr class="dividerInfo" />
        <p><b>Phone number</b></p>
        <span>{{ currentPatient.phoneNumber }}</span>
        <hr class="dividerInfo" />
        <button v-if="!employee" class="edit-btn" @click="edit('0')">
          Edit
        </button>
      </div>
    </transition>
    <button
      :class="{ changecolor: !patientSymptomsHidden }"
      class="btn-secondary accordion-button"
      @click="patientSymptomsHidden = !patientSymptomsHidden"
    >
      <ion-icon name="thermometer-outline"></ion-icon>

      Symptomy
      <ion-icon
        :name="
          patientSymptomsHidden ? 'chevron-down-outline' : 'chevron-up-outline'
        "
      ></ion-icon>
    </button>
    <div :class="{ hideInfo: patientSymptomsHidden }" class="info-container">
      <div
        v-for="step in formStepsToShow"
        :key="step.order"
        class="questionInfo"
      >
        <p>
          <b>{{ step.question }}</b>
        </p>
        <span v-if="step.answerType === 'boolean'">{{
          currentPatient.answers[step.order] === true ? 'ANO' : 'NE'
        }}</span>
        <span v-else-if="step.answerType === 'checkbox'">
          <span
            v-for="option in currentPatient.answers[step.order]"
            :key="option.value"
            >{{
              option.isChecked
                ? formSteps
                    .find(s => s.order === step.order)
                    .options.find(o => o.value === option.value).text + ', '
                : ''
            }}</span
          >
        </span>
        <span v-else>{{ currentPatient.answers[step.order] }}</span>
        <hr class="dividerInfo" />
      </div>
      <button v-if="!employee" class="edit-btn" @click="edit('1')">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  props: { employee: { type: Boolean, default: false } },
  data: () => ({
    patientInfoHidden: false,
    patientSymptomsHidden: true
  }),
  computed: {
    ...mapState('patients', ['formSteps']),
    ...mapGetters('patients', ['currentPatient']),
    formStepsToShow() {
      if (!this.currentPatient) return []
      const stepsToShow = []
      this.formSteps.forEach(step => {
        if (Object.keys(this.currentPatient.answers).indexOf(step.order) > -1)
          stepsToShow.push(step)
      })
      return stepsToShow
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    edit(stepNum) {
      this.setCurrentPatientValueByKey({
        key: 'visitedSteps',
        value: [stepNum]
      })
      this.$router.push('/form')
    }
  }
}
</script>

<style lang="scss">
@import '@/theme/variables.scss';
@import '@/theme/general.scss';

.dividerInfo {
  border-color: $secondary-color;
  z-index: 10;
}

.questionInfo {
  p {
    color: $secondary-color;
  }
  span {
    color: black;
  }
}

.accordion-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 20;

  .spacer {
    width: 18px;
  }
}

ion-icon {
  font-size: 1.3em;
}

.btn-secondary {
  font-size: 1.1em;
  background-color: $secondary-color;
  color: #edf1f9;
  border-radius: 2em;
  border: none;
  padding: 0.8em 2em;
  margin: 0.5em 2em;
  width: calc(100% - 2em);
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
  max-width: 400px;
  align-self: flex-start;
  margin: 0 1em;
  background-color: #32227f15;
  padding: 3em 2em 2em 2em;
  width: calc(100% - 2em);
  border-radius: 1.1em;
}

.edit-btn {
  cursor: pointer;
  font-size: 1em;
  background-color: $secondary-color;
  color: white;
  border-radius: 2em;
  padding: 0.8em 4em;
  width: fit-content;
  margin: 0 auto;
}
</style>
