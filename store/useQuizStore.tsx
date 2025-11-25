import { sampleQuestions } from "@/utils/questions"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type QuestionType = "isori" | "owe" | "alo"
export type AccountType = "cash" | "points"|"none"

export interface Question {
  id: string
  text: string
  amount: string
  type: QuestionType
  image?: string
  points?: number
  cash?: number
  input?: boolean
  options?: string[]
  answer?: string
}

interface UserAnswer {
  questionId: string
  selectedOptionIndex?: number | null
  inputAnswer?: string
  isCorrect?: boolean
  hasChecked: boolean
}

interface AccumulatedAmounts {
  isori: { cash: number; points: number }
  owe: { cash: number; points: number }
  alo: { cash: number; points: number }
}

interface QuizState {
  language: string | null
  setLanguage: (language: string) => void

  level: string | null
  setLevel: (level: string) => void

  reward: string | null
  setReward: (reward: string) => void

  questionCount: string | null
  setQuestionCount: (count: string) => void

  timer: string | null
  setTimer: (timer: string) => void

  subject: string | null
  setSubject: (subject: string) => void

  // Question type state
  selectedQuestionType: QuestionType
  setSelectedQuestionType: (type: QuestionType) => void

  // Account type state
  selectedAccountType: AccountType
  setSelectedAccountType: (type: AccountType) => void

  // Questions data
  questions: Question[]
  filteredQuestions: Question[]

  // Current question state
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void

  // Accumulated amounts for each question type
  accumulatedAmounts: AccumulatedAmounts

  // User answers - store as Record instead of Map for better persistence
  userAnswers: Record<string, UserAnswer>

  // Filter questions by type
  filterQuestionsByType: (type: QuestionType) => void

  // Calculate accumulated amounts
  calculateAccumulatedAmounts: () => void

  // User answer methods
  setUserAnswer: (questionId: string, answer: Partial<UserAnswer>) => void
  getUserAnswer: (questionId: string) => UserAnswer | undefined
  clearUserAnswer: (questionId: string) => void
  resetAllAnswers: () => void

  // Reset all selections
  resetSelections: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      // Selection state
      language: null,
      setLanguage: (language: string) => set({ language }),

      level: null,
      setLevel: (level: string) => set({ level }),

      reward: null,
      setReward: (reward: string) => set({ reward }),

      questionCount: null,
      setQuestionCount: (count: string) => set({ questionCount: count }),

      timer: null,
      setTimer: (timer: string) => set({ timer }),

      subject: null,
      setSubject: (subject: string) => {
        set({ subject })
        // Also set the question type and filter questions based on the subject
        const questionType = subject.toLowerCase() as QuestionType
        if (['isori', 'owe', 'alo'].includes(questionType)) {
          set({ selectedQuestionType: questionType })
          get().filterQuestionsByType(questionType)
          get().calculateAccumulatedAmounts()
        }
      },

      // Question type state
      selectedQuestionType: "isori",
      setSelectedQuestionType: (type: QuestionType) => {
        set({ selectedQuestionType: type })
        get().filterQuestionsByType(type)
        get().calculateAccumulatedAmounts()
      },

      // Account type state
      selectedAccountType: "cash",
      setSelectedAccountType: (type: AccountType) => {
        set({ selectedAccountType: type })
      },

      // Questions data
      questions: sampleQuestions,
      filteredQuestions: sampleQuestions.filter((q) => q.type === "isori"),

      // Current question state
      currentQuestionIndex: 0,
      setCurrentQuestionIndex: (index: number) => {
        set({ currentQuestionIndex: index })
      },

      // Accumulated amounts
      accumulatedAmounts: {
        isori: { cash: 0, points: 0 },
        owe: { cash: 0, points: 0 },
        alo: { cash: 0, points: 0 },
      },

      // User answers - use Record instead of Map
      userAnswers: {},

      // Filter questions by type
      filterQuestionsByType: (type: QuestionType) => {
        const filtered = sampleQuestions.filter((question) => question.type === type)
        set({
          filteredQuestions: filtered,
          currentQuestionIndex: 0,
        })
      },

      // Calculate accumulated amounts
      calculateAccumulatedAmounts: () => {
        const { selectedQuestionType } = get()

        const questionsOfType = sampleQuestions.filter((q) => q.type === selectedQuestionType)

        const totalCash = questionsOfType.reduce((sum, question) => sum + (question.cash || 0), 0)
        const totalPoints = questionsOfType.reduce((sum, question) => sum + (question.points || 0), 0)

        set((state) => ({
          accumulatedAmounts: {
            ...state.accumulatedAmounts,
            [selectedQuestionType]: {
              cash: totalCash,
              points: totalPoints,
            },
          },
        }))
      },

      // User answer methods - updated to work with Record
      setUserAnswer: (questionId: string, answer: Partial<UserAnswer>) => {
        set((state) => {
          const existing = state.userAnswers[questionId]
          return {
            userAnswers: {
              ...state.userAnswers,
              [questionId]: {
                questionId,
                selectedOptionIndex: answer.selectedOptionIndex ?? existing?.selectedOptionIndex ?? null,
                inputAnswer: answer.inputAnswer ?? existing?.inputAnswer ?? "",
                isCorrect: answer.isCorrect ?? existing?.isCorrect,
                hasChecked: answer.hasChecked ?? existing?.hasChecked ?? false,
              },
            },
          }
        })
      },

      getUserAnswer: (questionId: string) => {
        return get().userAnswers[questionId]
      },

      clearUserAnswer: (questionId: string) => {
        set((state) => {
          const newAnswers = { ...state.userAnswers }
          delete newAnswers[questionId]
          return { userAnswers: newAnswers }
        })
      },

      resetAllAnswers: () => {
        set({ userAnswers: {} })
      },

      // Reset all selections
      resetSelections: () =>
        set({
          language: null,
          level: null,
          reward: null,
          questionCount: null,
          timer: null,
          subject: null,
          selectedQuestionType: "isori",
          selectedAccountType: "cash",
          currentQuestionIndex: 0,
          userAnswers: {},
        }),
    }),
    {
      name: "quiz-store",
    },
  ),
)