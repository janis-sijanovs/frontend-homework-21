import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import Animal from '../../models/models';
import { addAnimal } from '../../reducers/animalReducer';

/* eslint-disable jsx-a11y/label-has-associated-control */
const AddAnimal = () => {
  const initialState: Animal = {
    name: '',
    translation: [{ tag: 'ENG', name: '' }],
    image: null,
    species: '',
  };

  const existingAnimals = useSelector((state: RootState) => state.animal.animals);

  const existingSpecies = existingAnimals.reduce((previous, { species }) => (previous.includes(species)
    ? previous : [...previous, species]), [] as string[]);

  const [animalData, setAnimalData] = useState<Animal>(initialState);
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const validateAnimal = (animal:Animal) => {
    const newErrors = [];
    if (animal.name.length < 1) {
      newErrors.push('Animal Name Cannot Be Empty!');
    }
    if (animal.species.length < 1) {
      newErrors.push('Animal Species Cannot Be Empty!');
    }
    if (existingAnimals.find(({ name }) => (name.toLowerCase() === animal.name.toLowerCase()))) {
      newErrors.push('Animal Already In The List!');
    }
    return newErrors;
  };

  return (
    <div className="page">
      <h1 className="heading">Add</h1>
      <button onClick={() => navigate('/animals')} className="button">Go Back</button>

      <label>
        Name
        <input
          id="name"
          type="text"
          value={animalData.name}
          onChange={(e) => setAnimalData({
            ...animalData,
            name: e.target.value,
            translation: [{ tag: 'ENG', name: e.target.value }],
          })}
        />
      </label>

      <label>
        Species
        {existingSpecies.length > 0 && existingSpecies.map((species) => (
          <button key={species} onClick={() => setAnimalData({ ...animalData, species })}>{species}</button>
        ))}
        <input
          type="text"
          value={animalData.species}
          onChange={(e) => setAnimalData({
            ...animalData,
            species: e.target.value,
          })}
        />
      </label>

      <label>
        Picture
        <input type="file" accept="image/png, image/gif, image/jpeg" />
      </label>

      {/* <label>
        Picture
        <input
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            let file: File | null = null;
            if (e.target.files?.length === 1) {
              // eslint-disable-next-line prefer-destructuring
              file = e.target.files[0];
            }
            setAnimalData({
              ...animalData,
              image: file,
            });
          }}
        />
      </label> */}

      {errors && errors.map((error) => (
        <p key={error}>{error}</p>
      ))}

      <button onClick={() => {
        const currErrors = validateAnimal(animalData);
        if (currErrors.length < 1) {
          dispatch(addAnimal(animalData));
          navigate('/animals');
        } else {
          setErrors(currErrors);
        }
      }}
      >
        Add Animal
      </button>
    </div>
  );
};

export default AddAnimal;
