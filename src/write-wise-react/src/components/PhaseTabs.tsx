import React from 'react';
import { Phase } from '../types/Competition';

interface PhaseTabsProps {
    currentPhase: Phase;
    layout?: 'horizontal' | 'vertical';
}

const PhaseTabs: React.FC<PhaseTabsProps> = ({ currentPhase, layout = 'horizontal' }) => {
    // CSS classes based on layout prop
    const containerClasses = layout === 'horizontal' ? 'flex justify-center space-x-3 items-center mb-5' : 'flex flex-col items-center space-y-2 mb-5';

    const tabClasses = (phase: Phase) =>
        `py-2 px-4 rounded-lg border transition ${currentPhase === phase
            ? 'border-primary text-primary font-semibold bg-white' // Active tab
            : 'border-gray-300 text-gray-400 bg-gray-100' // Inactive tab
        }`;
    return (
        <div className={containerClasses}>
            <div className={tabClasses(Phase.Nomination)}>Nominating</div>
            <div className={tabClasses(Phase.Voting)}>Voting</div>
            <div className={tabClasses(Phase.Closed)}>Closed</div>
        </div>

    );
};

export default PhaseTabs;
