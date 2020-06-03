<template>
  <div class="flex flex-col items-center">
    <div
      class="w-14 h-14 flex justify-center items-center p-2 rounded-full border-4 font-bold"
      :class="{
        'bg-green-400 border-green-500': !patient.confirmation
          .infectionSuspected,
        'bg-red-400 border-red-500': patient.confirmation.infectionSuspected
      }"
    >
      <ion-icon
        name="checkmark-outline"
        size="large"
        class="text-white"
        style="--ionicon-stroke-width: 5rem;"
      ></ion-icon>
    </div>
    <div
      class="w-full bg-white text-black rounded-2xl px-4 py-4 my-4 border-4"
      :class="{
        'border-green-400': !patient.confirmation.infectionSuspected,
        'border-red-400': patient.confirmation.infectionSuspected
      }"
    >
      <div class="grid grid-cols-2 row-gap-6">
        <!-- EMPLOYEE NAME -->
        <div class="flex flex-col items-start text-left leading-tight">
          <span>{{ $t('CB.CONFIRMED_BY') }}</span>
          <span class="text-secondary text-lg font-semibold">
            {{ patient.confirmation.name }}
          </span>
        </div>

        <!-- DATE -->
        <div class="flex flex-col items-end text-right leading-tight">
          <span>{{ $t('CB.CONFIRMED_ON') }}</span>
          <span class="text-secondary text-lg font-semibold">
            {{ new Date(patient.confirmation.timestamp * 1000) | formatDate }}
          </span>
        </div>

        <!-- TEMPERATURE -->
        <div class="flex flex-col items-start text-left leading-tight">
          <span>{{ $t('CB.MEASURED_TEMPERATURE') }}</span>
          <span
            class="text-lg font-semibold"
            :class="{
              'text-secondary': patient.confirmation.temperature <= 37,
              'text-red-500': patient.confirmation.temperature > 37
            }"
          >
            {{ patient.confirmation.temperature }}ºC
          </span>
        </div>

        <!-- IS SUSPECTED -->
        <div class="flex flex-col items-end text-right leading-tight">
          <span>{{ $t('CB.IS_COVID_SUSPECTED') }}</span>
          <span
            v-if="patient.confirmation.infectionSuspected"
            class="text-primary text-lg font-semibold uppercase"
          >
            {{ $t('YES') }}
          </span>
          <span v-else class="text-green-500 text-lg font-semibold uppercase">
            {{ $t('NO') }}
          </span>
        </div>

        <!-- FOR HOSPITAL -->
        <div
          v-if="patient.confirmation.issuedFor"
          class="col-span-2 flex justify-between items-center"
        >
          <div class="flex flex-col items-start text-left leading-tight">
            <span>{{ $t('CB.CONFIRMATION_ISSUED_FOR') }}</span>
            <span class="text-secondary text-lg font-semibold">
              {{ getHospitalLongName(patient.confirmation.issuedFor) }}
            </span>
          </div>
          <div class="flex justify-center items-center flex-grow-0">
            <img
              class="h-12 object-contain"
              :src="getHospitalLogoPath(patient.confirmation.issuedFor)"
              alt="hospital logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hospitalDatabaseMixin } from '@/mixins'

export default {
  mixins: [hospitalDatabaseMixin],
  props: { patient: { type: Object, required: true } }
}
</script>

<style></style>
