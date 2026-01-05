import React, { useState, useEffect } from 'react';
import { Check, Circle } from 'lucide-react';
import { CONTENT } from '../data/content';

const Checkpoint = ({ id, tutorialId, sectionId, lang = 'en' }) => {
  const t = CONTENT[lang];
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Load completion state from localStorage
    const key = `checkpoint_${tutorialId}_${sectionId}_${id}`;
    const saved = localStorage.getItem(key);
    if (saved === 'true') {
      setCompleted(true);
    }
  }, [tutorialId, sectionId, id]);

  const toggleComplete = () => {
    const newState = !completed;
    setCompleted(newState);
    const key = `checkpoint_${tutorialId}_${sectionId}_${id}`;
    localStorage.setItem(key, newState.toString());
  };

  return (
    <button
      onClick={toggleComplete}
      className={`
        flex items-center justify-center w-6 h-6 rounded-full transition-all shrink-0
        ${completed
          ? 'bg-green-500 text-black hover:bg-green-400'
          : 'border-2 border-gray-400 text-gray-400 hover:border-gray-300 hover:text-gray-300'
        }
      `}
      title={completed ? t.academy.completed : t.academy.checkpoint}
    >
      {completed ? <Check size={16} /> : <Circle size={12} />}
    </button>
  );
};

export default Checkpoint;

