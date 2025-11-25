import { Question } from "@/store/useQuizStore";

// Sample questions data with images for isori type
export const sampleQuestions: Question[] = [
  // ISORI Questions (5) - with images
  {
    id: 'isori-1',
    type: 'isori',
    text: "Kini oruko Oba Remo?",
    amount: "NGN 40,000",
    cash: 40000,
    points: 400,
    image: "/remo.jpg",
    options: ["Oba Babatunde Adetona", "Oba Adebola Adetona", "Oba Kehinde Adetona", "Oba Olusegun Adetona"],
    answer: "Oba Babatunde Adetona"
  },
  {
    id: 'isori-2',
    type: 'isori',
    text: "Ta ni Olori Ilu Ibadan?",
    amount: "NGN 60,000",
    cash: 60000,
    points: 600,
    image: "/olori.jpg",
    options: ["Oba Lamidi Adeyemi", "Oba Adetola", "Oba Aderogba", "Oba Adeola"],
    answer: "Oba Lamidi Adeyemi"
  },
  {
    id: 'isori-3',
    type: 'isori',
    text: "Ki lo koja ni iwaju Ile Oba ti ko ki Oba?",
    amount: "NGN 80,000",
    cash: 80000,
    points: 800,
    image: "/olori.jpg",
    input: true,
    options: ["Aje", "Oja", "Oko", "Ile"], // Added options for verification
    answer: "Aje"
  },
  {
    id: 'isori-4',
    type: 'isori',
    text: "Kini oruko akoko Ile Ife?",
    amount: "NGN 100,000",
    cash: 100000,
    points: 1000,
    options: ["Ile Ife", "Ife Ooye", "Ife Oodaye", "Ife Akoko"],
    answer: "Ife Oodaye"
  },
  {
    id: 'isori-5',
    type: 'isori',
    text: "Ta ni a npe ni Sangoni?",
    amount: "NGN 120,000",
    cash: 120000,
    points: 1200,
    options: ["Oba Lagos", "Oba Ibadan", "Oba Oyo", "Oba Ife"],
    answer: "Oba Lagos"
  },

  // OWE Questions (5)
  {
    id: 'owe-1',
    type: 'owe',
    text: "Pari owe yii: 'Akekoo Baale...'",
    amount: "NGN 40,000",
    cash: 40000,
    points: 400,
    options: ["Ko ni Iyi", "Ko ni Ile", "Ko ni Owo", "Ko ni Eko"],
    answer: "Ko ni Iyi"
  },
  {
    id: 'owe-2',
    type: 'owe',
    text: "Ta lo ni owe 'Ile la nwo, ka to so Omode loruko'?",
    amount: "NGN 60,000",
    cash: 60000,
    points: 600,
    options: ["Awon Agba", "Awon Ode", "Awon Akewi", "Awon Babalawo"],
    answer: "Awon Agba"
  },
  {
    id: 'owe-3',
    type: 'owe',
    text: "Kini itumo owe 'Owo Oro so Apo'?",
    amount: "NGN 80,000",
    cash: 80000,
    points: 100,
    input: true,
    options: ["Aroko ni ipa", "Owo ni ipa", "Oro ni ipa", "Apo ni ipa"], // Added options for verification
    answer: "Aroko ni ipa"
  },
  {
    id: 'owe-4',
    type: 'owe',
    text: "Pari owe yii: 'Bi inu Ako ba dun...'",
    amount: "NGN 100,000",
    cash: 100000,
    points: 1000,
    options: ["Inu Abiya a dun", "Inu Ejo a dun", "Inu Eye a dun", "Inu Esu a dun"],
    answer: "Inu Abiya a dun"
  },
  {
    id: 'owe-5',
    type: 'owe',
    text: "Kini itumo owe 'A fi Ika we Ika'?",
    amount: "NGN 120,000",
    cash: 120000,
    points: 1200,
    options: ["Aiye o dara", "Aiye o le", "Aiye o dun", "Aiye o soro"],
    answer: "Aiye o soro"
  },

  // ALO Questions (5)
  {
    id: 'alo-1',
    type: 'alo',
    text: "Kini oruko akoko Alantakun?",
    amount: "NGN 40,000",
    cash: 40000,
    points: 400,
    options: ["Ijapa", "Ijakadi", "Ijanba", "Ijalana"],
    answer: "Ijapa"
  },
  {
    id: 'alo-2',
    type: 'alo',
    text: "Ta ni o nfe Ijapa loju Popo?",
    amount: "NGN 60,000",
    cash: 60000,
    points: 600,
    options: ["Eyonu", "Aroye", "Ogun", "Ori"],
    answer: "Eyonu"
  },
  {
    id: 'alo-3',
    type: 'alo',
    text: "Kini orin ti Ijapa ma a nko?",
    amount: "NGN 80,000",
    cash: 80000,
    points: 800,
    input: true,
    options: ["Ijapa o ma tan la ati", "Ijapa o ma sun", "Ijapa o ma jeun", "Ijapa o ma rin"], // Added options for verification
    answer: "Ijapa o ma tan la ati"
  },
  {
    id: 'alo-4',
    type: 'alo',
    text: "Melo ni omo Ijapa?",
    amount: "NGN 100,000",
    cash: 100000,
    points: 1000,
    options: ["Marun", "Mefa", "Meje", "Mesan"],
    answer: "Meje"
  },
  {
    id: 'alo-5',
    type: 'alo',
    text: "Kini oruko iya Ijapa?",
    amount: "NGN 120,000",
    cash: 120000,
    points: 200,
    options: ["Ironu", "Irete", "Iroro", "Iran"],
    answer: "Ironu"
  },
];