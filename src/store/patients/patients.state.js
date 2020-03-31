export default {
  patients: [],
  currentPatientId: '',
  formSteps: [
    {
      order: '0',
      question: 'Patient personal details',
      answerType: 'form',
      next: '1'
    },
    {
      order: '1',
      question: 'Did you take your body temperature lately?',
      // question: 'Měřil/a jste si v poslední době teplotu?',
      answerType: 'boolean',
      nextIfPositive: '1.1',
      nextIfNegative: '1.2'
    },
    {
      order: '1.1',
      question: 'Enter your temperature',
      // question: 'Zadejte teplotu',
      answerType: 'slider',
      next: '2',
      pointsIfPositive: 3
    },
    {
      order: '1.2',
      // question: 'Pociťoval/a jste zvýšené projevy teploty?',
      question: 'Did you experience increased body temperature?',
      answerType: 'boolean',
      next: '2',
      pointsIfPositive: 2
    },
    {
      order: '2',
      question: 'Have you been coughing lately?',
      // question: 'Měl/a jste v poslední době kašel?',
      answerType: 'boolean',
      nextIfPositive: '2.1',
      nextIfNegative: '3'
    },
    {
      order: '2.1',
      question: 'Wet or dry cough?',
      // question: 'Vlhký nebo suchý kašel?',
      answerType: 'one-of',
      options: [
        {
          text: 'Wet',
          // text: 'Vlhký',
          value: 'vlhky'
        },
        {
          text: 'Dry',
          // text: 'Suchý',
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
        'Have you recently had an unusual chest strain or shortness of breath?',
      // question:'Měl/a jste v poslední době nezvyklý pocit tíhy na hrudi nebo dušnost?',
      answerType: 'boolean',
      pointsIfPositive: 2,
      next: '4'
    },
    {
      order: '4',
      question: 'Have you had unusual tiredness, chills or rigor lately?',
      // question:'Měl/a jste v poslední době nezvykou únavu, třesavku nebo zimnici?',
      answerType: 'boolean',
      pointsIfPositive: 1,
      next: '5'
    },
    {
      order: '5',
      question: 'Select the symptoms you have had recently:',
      // question: 'Vyberte příznaky, které jste během poslední doby měli:',
      answerType: 'checkbox',
      options: [
        { text: 'Cold', value: 'ryma' },
        // { text: 'Rýma', value: 'ryma' },
        { text: 'Sore throat', value: 'bolest-v-krku' },
        // { text: 'Bolest v krku', value: 'bolest-v-krku' },
        { text: 'Muscle or joint pain', value: 'bolest-svalu-nebo-kloubu' },
        // {text: 'Bolest svalů nebo kloubů', value: 'bolest-svalu-nebo-kloubu'     },
        { text: 'Loss of taste or smell', value: 'ztrata-chuti-nebo-cichu' }
        // { text: 'Ztráta chuti nebo čichu', value: 'ztrata-chuti-nebo-cichu' }
      ],
      next: '6'
    },
    {
      order: '6',
      question: 'Have you been abroad recently?',
      // question: 'Byl/a jste v poslední době v zahraničí?',
      answerType: 'boolean',
      next: '7'
    },
    {
      order: '7',
      question: 'Has anyone visited you in the last 14 days?',
      // question: 'Navštívil Vás někdo v posledních 14 dnech?',
      answerType: 'boolean',
      nextIfPositive: '7.1',
      nextIfNegative: 'end'
    },
    {
      order: '7.1',
      question: 'Have they been abroad recently?',
      // question: 'Byl/a daná osova v poslední době v zahraničí?',
      answerType: 'boolean',
      next: 'end'
    }
  ]
}
