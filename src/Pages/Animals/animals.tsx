import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';

const Animals = () => {
  const animals = useSelector((state: RootState) => state.animal.animals);
  const language = useSelector((state: RootState) => state.language.currentLanguage);
  const navigate = useNavigate();
  return (
    <div className="page">
      <h1 className="heading">Animals</h1>
      {animals.length > 0 ? animals.map((animal) => (
        <div key={animal.name}>
          <p>
            Animal:
            {animal.translation.find(({ tag }) => (tag === language))?.name
            || animal.name}
          </p>
          <p>
            Species:
            {animal.species}
          </p>
          <button onClick={() => navigate(`/translations/${animal.name}`)}>Translations</button>
        </div>
      )) : 'No Animals'}
      <button onClick={() => navigate('/add')} className="button">Add Animal</button>
    </div>
  );
};

export default Animals;
