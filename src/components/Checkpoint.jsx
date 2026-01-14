import React, { useState } from 'react';
import { Check, Circle } from 'lucide-react';
// import { CONTENT } from '../data/content'; // Removed static
import { useSiteContent } from '../hooks/useSiteContent';

const Checkpoint = ({ id, tutorialId, sectionId }) => {
  const { getText } = useSiteContent();
  const [completed, setCompleted] = useState(() => {
    // Load completion state from localStorage lazily
    if (typeof window === 'undefined') return false;
    const key = `checkpoint_${tutorialId}_${sectionId}_${id}`;
    const saved = localStorage.getItem(key);
    return saved === 'true';
  });

  /* useEffect removed as initial state handles load */

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
      title={completed ? getText('academy.completed') : getText('academy.checkpoint')}
    >
      {completed ? <Check size={16} /> : <Circle size={12} />}
    </button>
  );
};

export default Checkpoint;

