import { useState } from 'react'
import HomePage from './pages/HomePage';
import CompetitionDetailsPage from './pages/CompetitionDetail';
import ViewNominationsPage from './pages/ViewNominations';
import AddNominationPage from './pages/AddNomination';
import ViewDetailsPage from './pages/ViewNominationDetail';
import './App.css'
import './styles/tailwind.css'; 
import Header from './components/Header';
import { Competition, Nomination } from './types/Competition';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null);


  const goToPage = (page: string, competition: Competition | null = null, nomination: Nomination | null = null): void => {
    setCurrentPage(page);
    setSelectedCompetition(competition);
    setSelectedNomination(nomination);
  };

  return (
    <div>
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
          onViewNominationDetails={(nomination: Nomination) => goToPage('view-nomination-detail', selectedCompetition, nomination)}
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
          competitionPhase={selectedCompetition.phase}
          onBack={() => goToPage('view-nominations', selectedCompetition)}
        />
      )}
    </div>
  );
}

export default App
