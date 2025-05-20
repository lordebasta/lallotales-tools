import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonTextarea } from '@ionic/react';
import { Redirect, useParams } from 'react-router';
import { useState } from 'react';
import { auth } from '../services/fireauth';
import { Character } from '../services/character';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import LoginRequiredPage from './LoginRequiredPage';
import { FirestoreService } from '../services/firestore';

import { setCharacter } from '../store/characterSlice';

const CharacterPage: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const dispatch = useDispatch();

  const characters = useSelector((state: RootState) => state.character.characters);
  const [localCharacter, setLocalCharacter] = useState<Character>(() => {
    if (characters.length < Number(index) + 1) {
      return {} as Character;
    }
    return characters[Number(index)];
  });

  const handleChange = (field: keyof Character, value: unknown) => {
    setLocalCharacter(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof Character, index: number, value: string) => {
    setLocalCharacter(prev => {
      const arr = [...(prev[field] as string[])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const handleAddToArray = (field: keyof Character) => {
    setLocalCharacter(prev => {
      const arr = [...(prev[field] as string[]), ""];
      return { ...prev, [field]: arr };
    });
  };

  const handleRemoveFromArray = (field: keyof Character, index: number) => {
    setLocalCharacter(prev => {
      const arr = [...(prev[field] as string[])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const saveCharacter = async () => {
    dispatch(setCharacter({ index: Number(index), character: localCharacter }));
    try {
      await FirestoreService.getInstance().setCharacter(localCharacter);
      alert('Character saved successfully!');
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Failed to save character.');
    }
  };


  if (!auth.currentUser) {
    return <LoginRequiredPage />;
  }

  if (characters.length < Number(index) + 1) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Edit Character</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={localCharacter.name} onIonChange={e => handleChange('name', e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Level</IonLabel>
            <IonInput type="number" value={localCharacter.level} onIonChange={e => handleChange('level', Number(e.detail.value))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={localCharacter.description} onIonChange={e => handleChange('description', e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Languages</IonLabel>
            {localCharacter.languages.map((lang, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <IonInput
                  value={lang}
                  onIonChange={e => handleArrayChange('languages', idx, e.detail.value!)}
                  style={{ flex: 1 }}
                />
                <IonButton size="small" color="danger" onClick={() => handleRemoveFromArray('languages', idx)}>-</IonButton>
              </div>
            ))}
            <IonButton size="small" onClick={() => handleAddToArray('languages')}>Add Language</IonButton>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Movement</IonLabel>
            <IonInput type="number" value={localCharacter.movement} onIonChange={e => handleChange('movement', Number(e.detail.value))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Current PF</IonLabel>
            <IonInput type="number" value={localCharacter.currentPf} onIonChange={e => handleChange('currentPf', Number(e.detail.value))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Fatique</IonLabel>
            <IonInput type="number" value={localCharacter.fatique} onIonChange={e => handleChange('fatique', Number(e.detail.value))} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Health State</IonLabel>
            <IonInput value={localCharacter.healthState} onIonChange={e => handleChange('healthState', e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Image URL</IonLabel>
            <IonInput value={localCharacter.imageUrl} onIonChange={e => handleChange('imageUrl', e.detail.value ? new URL(e.detail.value) : undefined)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Monete</IonLabel>
            <IonInput type="number" value={localCharacter.monete} onIonChange={e => handleChange('monete', Number(e.detail.value))} />
          </IonItem>
          {/* Repeat similar blocks for leggendary, mastery, expert, apprentice, common if needed */}
        </IonList>
        <IonButton expand="block" style={{ marginTop: 16 }} onClick={saveCharacter}>
          Save Character
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CharacterPage;
