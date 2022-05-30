import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import './App.scss';
import { AppDispatch, RootState } from './app/store';
import AddAnimal from './Pages/AddAnimal/addAnimal';
import Animals from './Pages/Animals/animals';
import Page404 from './Pages/Page404/page404';
import Translations from './Pages/Translations/translations';
import { changeLanguage } from './reducers/languageReducer';

const App = () => {
  const animals = useSelector((state: RootState) => state.animal.animals);
  const dispatch = useDispatch<AppDispatch>();
  const languages = [] as string[];

  animals.forEach((animal) => {
    animal.translation.forEach(({ tag }) => {
      if (!languages.includes(tag)) {
        languages.push(tag);
      }
    });
  });

  return (
    <Router>
      <header>
        <select onChange={(e) => dispatch(changeLanguage(e.target.value))}>
          {languages.length > 0 ? languages.map((language) => (
            <option key={language}>{language}</option>
          ))
            : <option>ENG</option>}
        </select>
      </header>
      <Routes>
        <Route path="/" element={<Navigate to="/animals" />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/add" element={<AddAnimal />} />
        <Route path="/translations/:name" element={<Translations />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
};

export default App;
