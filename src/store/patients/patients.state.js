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
  ]
}
