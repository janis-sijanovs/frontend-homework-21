/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { Translation } from '../../models/models';
import { addTranslation } from '../../reducers/animalReducer';

const initialState: Translation = {
  tag: '',
  name: '',
};

const Translations = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  if (name === undefined) {
    navigate('/animals');
    return (<></>);
  }
  const allAnimals = useSelector((state: RootState) => state.animal.animals);
  const targetAnimal = allAnimals.find((animal) => (name.toLowerCase() === animal.name.toLowerCase()));
  const [errors, setErrors] = useState<string[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [newTranslation, setNewTranslation] = useState<Translation>(initialState);

  useEffect(() => {
    if (name === undefined || targetAnimal === undefined) {
      navigate('/animals');
    }
  }, []);

  const validateTranslation = (translation:Translation) => {
    const newErrors = [];
    if (translation.name.length < 1) {
      newErrors.push("Name Can't Be Empty!");
    }
    if (translation.tag.length < 1) {
      newErrors.push('Language Tag Cannot Be Empty!');
    }
    if (targetAnimal?.translation.find(({ tag }) => (translation.tag.toUpperCase() === tag.toUpperCase()))) {
      newErrors.push('Translation In This Language Already Exists!');
    }
    return newErrors;
  };

  return (
    <div className="page">
      <h1 className="heading">Translations</h1>
      <button onClick={() => navigate('/animals')} className="button">Go Back</button>
      {targetAnimal?.translation && targetAnimal.translation.map((language) => (
        <p>
          {language.tag}
          :
          {' '}
          {language.name}
        </p>
      ))}

      <button onClick={() => setShowEdit(true)}>Add Language</button>
      {showEdit && (
      <div>

        <label>
          Language Tag
          <input
            type="text"
            onChange={(e) => setNewTranslation(({ ...newTranslation, tag: e.target.value.toUpperCase() }))}
          />
        </label>

        <label>
          Translation
          <input type="text" onChange={(e) => setNewTranslation(({ ...newTranslation, name: e.target.value }))} />
        </label>

        {errors && errors.map((error) => (
          <p key={error}>{error}</p>
        ))}

        <button onClick={() => {
          const currErrors = validateTranslation(newTranslation);
          if (currErrors.length < 1 && targetAnimal) {
            dispatch(addTranslation({ animal: targetAnimal, translation: newTranslation }));
            setErrors([]);
            setNewTranslation(initialState);
            setShowEdit(false);
          } else {
            setErrors(currErrors);
          }
        }}
        >
          AddTranslation
        </button>

      </div>
      )}

    </div>
  );
};

export default Translations;
