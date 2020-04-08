export default {
  maxPoints: 19,
  formSteps: {
    cs: [
      {
        order: '0',
        question: 'Osobní údaje',
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
        pointsIfValueIsHigherThan: { treshold: 37.5, points: 3 }
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
            value: 'wet'
          },
          {
            text: 'Suchý',
            value: 'dry'
          }
        ],
        pointsIfPositive: 2,
        pointsIfNegative: 2,
        next: '3'
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
          { text: 'Rýma', value: 'cold', pointsIfChecked: 1 },
          { text: 'Bolest v krku', value: 'sore-throat', pointsIfChecked: 1 },
          {
            text: 'Bolest svalů nebo kloubů',
            value: 'muscle-or-joint-pain',
            pointsIfChecked: 1
          },
          {
            text: 'Ztráta chuti nebo čichu',
            value: 'loss-of-taste-or-smell',
            pointsIfChecked: 1
          }
        ],
        next: '6'
      },
      {
        order: '6',
        question: 'Byl/a jste v posledních 20 dnech v zahraničí?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7'
      },
      {
        order: '7',
        question: 'Setkal/a jste se s někým v posledních 14 dnech?',
        answerType: 'boolean',
        nextIfPositive: '7.1',
        nextIfNegative: 'end'
      },
      {
        order: '7.1',
        question: 'Byl/a daná osoba v poslední době v zahraničí?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7.2'
      },
      {
        order: '7.2',
        question: 'Byl/a daná osoba testovaná pozitivně na COVID-19?',
        answerType: 'boolean',
        pointsIfPositive: 3,
        next: 'end'
      }
    ],

    en: [
      {
        order: '0',
        question: 'Patient personal details',
        answerType: 'form',
        next: '1'
      },
      {
        order: '1',
        question: 'Did you take your body temperature lately?',
        answerType: 'boolean',
        nextIfPositive: '1.1',
        nextIfNegative: '1.2'
      },
      {
        order: '1.1',
        question: 'Enter your temperature',
        answerType: 'slider',
        next: '2',
        pointsIfValueIsHigherThan: { treshold: 37.5, points: 3 }
      },
      {
        order: '1.2',
        question: 'Did you experience increased body temperature?',
        answerType: 'boolean',
        next: '2',
        pointsIfPositive: 2
      },
      {
        order: '2',
        question: 'Have you been coughing lately?',
        answerType: 'boolean',
        nextIfPositive: '2.1',
        nextIfNegative: '3'
      },
      {
        order: '2.1',
        question: 'Wet or dry cough?',
        answerType: 'one-of',
        options: [
          {
            text: 'Wet',
            value: 'wet'
          },
          {
            text: 'Dry',
            value: 'dry'
          }
        ],
        pointsIfPositive: 2,
        pointsIfNegative: 2,
        next: '3'
      },
      {
        order: '3',
        question:
          'Have you recently had an unusual chest strain or shortness of breath?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '4'
      },
      {
        order: '4',
        question: 'Have you had unusual tiredness, chills or rigor lately?',
        answerType: 'boolean',
        pointsIfPositive: 1,
        next: '5'
      },
      {
        order: '5',
        question: 'Select the symptoms you have had recently:',
        answerType: 'checkbox',
        options: [
          { text: 'Cold', value: 'cold', pointsIfChecked: 1 },
          { text: 'Sore throat', value: 'sore-throat', pointsIfChecked: 1 },
          {
            text: 'Muscle or joint pain',
            value: 'muscle-or-joint-pain',
            pointsIfChecked: 1
          },
          {
            text: 'Loss of taste or smell',
            value: 'loss-of-taste-or-smell',
            pointsIfChecked: 1
          }
        ],
        next: '6'
      },
      {
        order: '6',
        question: 'Have you been abroad in the last 20 days?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7'
      },
      {
        order: '7',
        question: 'Have you been in contact with anyone in the last 14 days?',
        answerType: 'boolean',
        nextIfPositive: '7.1',
        nextIfNegative: 'end'
      },
      {
        order: '7.1',
        question: 'Have they been abroad recently?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7.2'
      },
      {
        order: '7.2',
        question: 'Have they been tested positively for COVID-19?',
        answerType: 'boolean',
        pointsIfPositive: 3,
        next: 'end'
      }
    ],

    sk: [
      { order: '0', question: 'Osobné údaje', answerType: 'form', next: '1' },
      {
        order: '1',
        question: 'Merali ste si v poslednej dobe teplotu?',
        answerType: 'boolean',
        nextIfPositive: '1.1',
        nextIfNegative: '1.2'
      },
      {
        order: '1.1',
        question: 'Zadajte teplotu',
        answerType: 'slider',
        next: '2',
        pointsIfValueIsHigherThan: { treshold: 37.5, points: 3 }
      },
      {
        order: '1.2',
        question: 'Pociťovali ste prejavy teploty?',
        answerType: 'boolean',
        next: '2',
        pointsIfPositive: 2
      },
      {
        order: '2',
        question: 'Mali ste v poslednej dobe kašeľ?',
        answerType: 'boolean',
        nextIfPositive: '2.1',
        nextIfNegative: '3'
      },
      {
        order: '2.1',
        question: 'Vlhký alebo suchý kašeľ?',
        answerType: 'one-of',
        options: [
          { text: 'Vlhký', value: 'wet' },
          { text: 'Suchý', value: 'dry' }
        ],
        pointsIfPositive: 2,
        pointsIfNegative: 2,
        next: '3'
      },
      {
        order: '3',
        question:
          'Mali ste v poslednej dobe nezvyčajný pocit tiaže na hrudi alebo dušnosť?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '4'
      },
      {
        order: '4',
        question:
          'Boli ste v poslednej dobe nezvyčajne unavený, mali ste triašku alebo zimnicu?',
        answerType: 'boolean',
        pointsIfPositive: 1,
        next: '5'
      },
      {
        order: '5',
        question: 'Vyberte príznaky, ktoré ste v poslednej dobe mali:',
        answerType: 'checkbox',
        options: [
          { text: 'Nádcha', value: 'cold', pointsIfChecked: 1 },
          { text: 'Bolesť v krku', value: 'sore-throat', pointsIfChecked: 1 },
          {
            text: 'Bolesť svalov alebo kĺbov',
            value: 'muscle-or-joint-pain',
            pointsIfChecked: 1
          },
          {
            text: 'Strata chuti alebo čuchu',
            value: 'loss-of-taste-or-smell',
            pointsIfChecked: 1
          }
        ],
        next: '6'
      },
      {
        order: '6',
        question: 'Boli ste v posledných 20 dňoch v zahraničí?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7'
      },
      {
        order: '7',
        question: 'Stretli ste sa s niekým v posledných 14 dňoch?',
        answerType: 'boolean',
        nextIfPositive: '7.1',
        nextIfNegative: 'end'
      },
      {
        order: '7.1',
        question: 'Bola daná osoba v poslednej dobe v zahraničí?',
        answerType: 'boolean',
        pointsIfPositive: 2,
        next: '7.2'
      },
      {
        order: '7.2',
        question: 'Bola daná osoba testovaná pozitívne na COVID-19?',
        answerType: 'boolean',
        pointsIfPositive: 3,
        next: 'end'
      }
    ]
  }
}
