import React, { useState, useEffect } from 'react';
import { Competition, Phase } from '../types/Competition';

interface ViewCompetitionProps {
  competition: Competition;
}

const ViewCompetition: React.FC<ViewCompetitionProps> = ({ competition }) => {
  const [daysLeft, setDaysLeft] = useState<string>('');

  useEffect(() => {
    const today = new Date();
    let endDate: Date | undefined;

    if (competition.phase === Phase.Nomination) {
      endDate = new Date(competition.nominationDates);
    } else if (competition.phase === Phase.Voting) {
      endDate = new Date(competition.votingDates);
    }

    if (endDate) {
      const timeDiff = endDate.getTime() - today.getTime();
      const remainingDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysLeft(remainingDays > 0 ? `(${remainingDays}d)` : '');
    }
  }, [competition]);

  return (
    <p className="text-sm text-textGray font-semibold">
      {competition.phase} Phase {daysLeft}
    </p>
  );
};

export default ViewCompetition;
