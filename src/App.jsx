import { useState, useEffect } from 'react'
import Flashcard from './components/Flashcard'

// Deck of cards
const flashcards = [
  { id: 1, question: "What is the capital of France?", answer: "Paris 🇫🇷" },
  { id: 2, question: "What is 5 + 7?", answer: "12 🧮" },
  { id: 3, question: "Boiling point of water?", answer: "100°C 💧" },
  { id: 4, question: "Who wrote 'Hamlet'?", answer: "William Shakespeare 🎭" },
  { id: 5, question: "What color are bananas?", answer: "Yellow 🍌" }
]


function App() {
  const [shuffledDeck, setShuffledDeck] = useState(flashcards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [learnedCards , setLearnedCards] = useState([])

  // 🔀 Shuffle the deck
  const shuffleFlashcards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setShuffledDeck(shuffled)
    setCurrentIndex(0)
  }

  // ⬅️➡️ Spacebar Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % shuffledDeck.length)
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) =>
          prev === 0 ? shuffledDeck.length - 1 : prev - 1
        )
      } else if (e.key === ' ') {
        e.preventDefault()
        document.getElementById('flashcard')?.click()
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [shuffledDeck])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 bg-gray-100">
      <h1 className="text-3xl font-bold">📚 Flashcards App</h1>

      <Flashcard
  question={shuffledDeck[currentIndex].question}
  answer={shuffledDeck[currentIndex].answer}
  isLearned={learnedCards.includes(shuffledDeck[currentIndex].id)}
/>


      <div className="flex gap-4 mt-4">
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? shuffledDeck.length - 1 : prev - 1
            )
          }
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex flex-wrap gap-4 mt-4 justify-center"
        >
          ⬅️ Previous
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % shuffledDeck.length)
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex flex-wrap gap-4 mt-4 justify-center"
        >
          Next ➡️
        </button>

        <button
          onClick={shuffleFlashcards}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded flex flex-wrap gap-4 mt-4 justify-center"
        >
          🔀 Shuffle Deck
        </button>
      </div>

      <p className="text-sm text-gray-500">
        Card {currentIndex + 1} of {shuffledDeck.length}
      </p>

      <p className="text-sm text-green-600 font-medium">
  You’ve learned {learnedCards.length} of {shuffledDeck.length} cards ✅
</p>


     <button
     onClick={() => {
      const currentCardId = shuffledDeck[currentIndex].id
      setLearnedCards((prev) =>
      prev.includes(currentCardId) ? prev : [...prev , currentCardId]
      )
     }}
     className='bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 roundedflex flex-wrap gap-4 mt-4 justify-center'
     >
      Mark as done✅
     </button>

     <button
  onClick={() => {
    const confirmReset = window.confirm("Are you sure you want to reset progress?")
    if (confirmReset) {
      setLearnedCards([])
    }
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex flex-wrap gap-4 mt-4 justify-center"
>
  🔄 Reset Progress
</button>

    </div>
  )
}

export default App
