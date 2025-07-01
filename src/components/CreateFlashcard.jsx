import { useState } from 'react'

const CreateFlashcard = ({ onAdd }) => {
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newQuestion.trim() === '' || newAnswer.trim() === '') return

    const newCard = {
      id: Date.now(), // unique ID
      question: newQuestion,
      answer: newAnswer
    }

    onAdd(newCard) // pass to App
    setNewQuestion('')
    setNewAnswer('')
  }

  return (
    <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md mt-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">➕ Add Your Own Flashcard</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          ➕ Add Flashcard
        </button>
      </form>
    </div>
  )
}

export default CreateFlashcard
