<template>
  <ModalWindow v-if="showPatientFormModal" :background-class="'bg-white'">
    <template v-slot:header>
      <h2 class="p-0 text-primary-black text-xl font-semibold">
        {{ $t('HOME.COMPATIBILITY_MODAL.HEADER') }}
      </h2>
    </template>
    <template v-slot:body>
      <form
        class="container w-full sm:max-w-lg flex flex-col items-center bg-white p-4 sm:p-8"
        @submit="formSubmit"
      >
        <div class="form-wrapper">
          <div class="info-box text-sm text-center">
            <p>{{ $t('FORM.INFORMATION_IS_SAFE') }}</p>
            <p>
              <strong>{{
                $t('FORM.NO_DATA_IS_SENT_OVER_THE_INTERNET')
              }}</strong>
            </p>
          </div>

          <div v-if="formFields.includes('firstName')" class="w-full">
            <label class="floating-label"> {{ $t('FIRST_NAME') }}</label>
            <input
              placeholder=""
              class="form-input"
              type="text"
              :value="currentPatient.firstName"
              required
              @input="setPatientValueByKey('firstName', $event.target.value)"
            />
          </div>

          <div v-if="formFields.includes('lastName')" class="w-full">
            <label class="floating-label"> {{ $t('LAST_NAME') }}</label>
            <input
              placeholder=""
              class="form-input"
              type="text"
              :value="currentPatient.lastName"
              required
              @input="setPatientValueByKey('lastName', $event.target.value)"
            />
          </div>

          <div v-if="formFields.includes('birthNumber')" class="w-full">
            <label class="floating-label">
              {{ $t('PERSONAL_IDENTIFICATION_NUMBER') }}</label
            >
            <input
              placeholder=""
              class="form-input"
              type="text"
              :value="currentPatient.birthNumber"
              required
              @input="setPatientValueByKey('birthNumber', $event.target.value)"
            />
          </div>

          <div v-if="formFields.includes('phoneNumber')" class="w-full">
            <label class="floating-label"> {{ $t('PHONE_NUMBER') }}</label>
            <input
              placeholder=""
              class="form-input"
              type="tel"
              :value="currentPatient.phoneNumber"
              required
              @input="setPatientValueByKey('phoneNumber', $event.target.value)"
            />
          </div>

          <div v-if="formFields.includes('birthDate')" class="w-full">
            <label class="floating-label"> {{ $t('BIRTH_DATE') }}</label>
            <input
              placeholder=""
              class="form-input"
              type="date"
              :value="currentPatient.birthDate"
              required
              @input="setPatientValueByKey('birthDate', $event.target.value)"
            />
          </div>
        </div>
      </form>
    </template>
    <template v-slot:footer>
      <button
        class="btn-primary mb-3"
        @click="$emit('hidePatientFormEditModal')"
      >
        {{ $t('EDIT_MODAL.SAVE_BUTTON') }}
      </button>
    </template>
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow'
import { getFormStepsMixin } from '@/mixins'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PatientFormEditModal',
  components: { ModalWindow },
  mixins: [getFormStepsMixin],
  props: { showPatientFormModal: Boolean },
  computed: {
    ...mapGetters('patients', ['currentPatient']),
    formFields() {
      return this.getPersonInfoSteps
    }
  },
  methods: {
    ...mapMutations('patients', ['setCurrentPatientValueByKey']),
    formSubmit(e) {
      e.preventDefault()
      this.$emit('next')
    },
    setPatientValueByKey(key, value) {
      this.setCurrentPatientValueByKey({
        key,
        value: value
          .replace(/\s\s+/g, ' ') // replace multiple whitespaces with only one
          .split(' ')
          .join('')
          .trim()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/theme/general.scss';

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em 0;

  input {
    color: black;
  }

  .floating-label {
    display: flex;
    align-self: flex-start;
    margin: 0.5rem 0 0 0;
    font-size: 0.9em;
    font-weight: 600;
    color: $secondary-text-color;
  }

  .form-input {
    margin: 0 0 1rem 0;
    height: 2rem;
    width: 100%;
    outline: none;
    font: inherit;
    border-width: 0 0 1px 0;
    border-color: $secondary-text-color;
  }

  input[type='date'] {
    position: relative;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    color: transparent;
    background: none;
    z-index: 1;
  }

  input[type='date']:before {
    background: none;
    display: block;
    font-family: 'FontAwesome', serif;
    content: '\f073';
    font-size: 20px;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 4px;
    right: 6px;
    color: $secondary-text-color;
  }
}
</style>
