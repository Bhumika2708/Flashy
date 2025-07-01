import { useState } from 'react'
import './Flashcard.css' 
import { motion } from 'framer-motion'

const Flashcard = ({ question, answer , isLearned }) => {
  const [flipped, setFlipped] = useState(false)

  

  return (
    <div className="w-80 h-48 perspective" onClick={() => setFlipped(!flipped)}>
      
      <motion.div
  className={`card ${isLearned ? 'border-green-500' : ''}`}
  animate={{ rotateY: flipped ? 180 : 0 }}
  transition={{ duration: 0.6 }}
>

        <div className="front flex items-center justify-center text-xl font-semibold bg-white border-2 border-blue-300 rounded-xl shadow-md">
          {question}
        </div>
        <div className="back flex items-center justify-center text-xl font-semibold bg-yellow-100 border-2 border-yellow-300 rounded-xl shadow-md">
          {answer}
        </div>

      </motion.div>
    </div>
  )
}

export default Flashcard
