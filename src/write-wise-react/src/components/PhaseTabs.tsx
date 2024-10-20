import React from 'react';
import { Phase } from '../types/Competition';

interface PhaseTabsProps {
  currentPhase: Phase;
  layout?: 'horizontal' | 'vertical';
}

const PhaseTabs: React.FC<PhaseTabsProps> = ({ currentPhase, layout = 'horizontal' }) => {
  // CSS classes based on layout prop
  const containerClasses = layout === 'horizontal' ? 'flex justify-around mb-5' : 'flex flex-col space-y-2 mb-5';
  const buttonClasses = (phase: Phase) =>
    `py-2 px-3 rounded-lg border text-center ${currentPhase === phase ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`;

  return (
    <div className={containerClasses}>
      <button className={buttonClasses(Phase.Nomination)}>Nomination</button>
      <button className={buttonClasses(Phase.Voting)}>Voting</button>
      <button className={buttonClasses(Phase.Closed)}>Closed</button>
    </div>
  );
};

export default PhaseTabs;
