import './App.css';
import { HashRouter as Router, Routes, Route, } from 'react-router-dom';
import WatchList from './screens/watchList';
import Searchscreen from './screens/searchscreen';
import Managewatchlistscreen from './screens/managewatchlistscreen';
import EditwatchListscreen from './screens/editwatchListscreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<WatchList />} />
        <Route path='/search' element={<Searchscreen />} />
        <Route path='/manage' element={<Managewatchlistscreen />} />
        <Route path='/editwatchList' element={<EditwatchListscreen />} />

      </Routes>

    </Router>
  );
}

export default App;
