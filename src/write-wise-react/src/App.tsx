import { useState } from 'react'
import HomePage from './pages/HomePage';
import CompetitionDetailsPage from './pages/CompetitionDetail';
import ViewNominationsPage from './pages/ViewNominations';
import AddNominationPage from './pages/AddNomination';
import ViewDetailsPage from './pages/ViewNominationDetail';
//import './App.css'
import './styles/tailwind.css'; 
import Header from './components/Header';
import { Competition, Nomination } from './types/Competition';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);
  const [userHasVoted, setUserHasVoted] = useState<boolean>(false);

  const goToPage = (page: string, competition: Competition | null = null, nomination: Nomination | null = null, voted: boolean | false = false): void => {
    setCurrentPage(page);
    setSelectedCompetition(competition);
    setSelectedNomination(nomination);
    setUserHasVoted(voted)
  };

  return (
    <div className="bg-gradient-to-r from-lightBlue to-blue p-3">
       <Header onHomeClick={() => goToPage('home')} />
      {currentPage === 'home' && (
        <HomePage
          onViewDetails={(competition: Competition) => goToPage('competition-details', competition)}
        />
      )}
      {currentPage === 'competition-details' && selectedCompetition && (
        <CompetitionDetailsPage
          competition={selectedCompetition}
          onViewNominations={() => goToPage('view-nominations', selectedCompetition)}
        />
      )}
      {currentPage === 'view-nominations' && selectedCompetition && (
        <ViewNominationsPage
          competition={selectedCompetition}
          onBack={() => goToPage('competition-details', selectedCompetition)}
          onAddNomination={() => goToPage('add-nomination', selectedCompetition)}
          onViewNominationDetails={(nomination: Nomination, userHasVoted: boolean) => goToPage('view-nomination-detail', selectedCompetition, nomination, userHasVoted)}
        />
      )}
      {currentPage === 'add-nomination' && selectedCompetition && (
        <AddNominationPage
          competitionId={selectedCompetition.id}
          competitionPhase={selectedCompetition.phase}
          onBack={() => goToPage('view-nominations', selectedCompetition)}
        />
      )}
      {currentPage === 'view-nomination-detail' && selectedNomination && selectedCompetition && (
        <ViewDetailsPage
          nomination={selectedNomination}
          userHasVoted={userHasVoted}
          competitionPhase={selectedCompetition.phase}
          onBack={() => goToPage('view-nominations', selectedCompetition)}
        />
      )}
    </div>
  );
}

export default App
