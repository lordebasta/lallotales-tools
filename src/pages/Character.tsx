import { IonButton, IonButtons, IonHeader, IonMenuButton, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, useParams } from 'react-router';
import React, { useState } from 'react';
import { auth } from '../services/fireauth';
import { Character, jsonifyCharacter } from '../services/character';
import { useSelector, useDispatch } from 'react-redux';
import LoginRequiredPage from './LoginRequiredPage';
import { FirestoreService } from '../services/firestore';

import { selectCharactersWithMap, setCharacter } from '../store/characterSlice';
import InfoPart from './character/InfoPart';
import TraitsPart from './character/TraitsPart';
import InventoryPart from './character/InventoryPart';


const CharacterPage: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const dispatch = useDispatch();

  const characters = useSelector(selectCharactersWithMap);
  const [char, setStateChar] = useState<Character>(() => {
    if (characters.length < Number(index) + 1) {
      return {} as Character;
    }
    return characters[Number(index)];
  });

  const [maxPf] = useState<number>(0);

  const handleChange = (field: keyof Character, value: unknown) => {
    setStateChar(prev => {
      const updated = { ...prev, [field]: value };
      return updated;
    });
  };

  const saveCharacter = async () => {
    dispatch(setCharacter({ index: Number(index), character: jsonifyCharacter(char) }));
    try {
      await FirestoreService.getInstance().setCharacter(char);
      console.log('Character saved successfully!');
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Failed to save character.');
    }
  };

  const [draggedSkill, setDraggedSkill] = useState<{ startGrade: string, skill: string } | null>(null);

  const handleDragStart = (grade: string, skill: string) => {
    setDraggedSkill({ startGrade: grade, skill: skill });
  };

  const handleDrop = (targetGrade: string) => {
    if (!draggedSkill || draggedSkill.startGrade === targetGrade) return;

    char.skills.get(targetGrade)!.add(draggedSkill.skill);
    char.skills.get(draggedSkill.startGrade)!.delete(draggedSkill.skill);

    setStateChar(char);
    setDraggedSkill(null);
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
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingRight: 20 }}>
            <IonTitle>
              {char.name}
            </IonTitle>
            <IonButton onClick={saveCharacter}>Save</IonButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          maxWidth: 1100,
          margin: '0 auto',
          height: '100%',
          minHeight: 600,
        }}
      >
        {/* Main content: InfoPart, TraitsPart, InventoryPart */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', borderRight: '1px solid #eee' }}>
          {/* InfoPart at the top */}
          <div style={{ borderBottom: '1px solid #eee' }}>
            <InfoPart
              char={char}
              maxPf={maxPf}
              handleChange={handleChange}
            />
          </div>
          {/* Traits and Inventory side by side */}
          <div style={{ display: 'flex', flex: 1, minHeight: 300 }}>
            <div style={{ flex: 1, borderRight: '1px solid #eee' }}>
              <TraitsPart char={char} setStateChar={setStateChar} />
            </div>
            <div style={{ flex: 1 }}>
              <InventoryPart char={char} setStateChar={setStateChar} />
            </div>
          </div>
        </div>
        {skillsPart(handleDrop, char, handleDragStart, draggedSkill)}
      </div>
    </IonPage >
  );
};

function skillsPart(handleDrop: (targetGrade: string) => void, char: Character, handleDragStart: (grade: string, skill: string) => void, draggedSkill: { startGrade: string; skill: string; } | null) {
  const skillGrades = ['common', 'apprentice', 'expert', 'master', 'legendary'];
  const skillNames = ['Comune', 'Apprendista', 'Esperto', 'Maestro', 'Leggendario'];

  return <div style={{
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
    minWidth: 220,
    maxWidth: 300,
  }}>
    <h2>Abilità</h2>
    <div style={{ width: '100%' }}>
      {skillGrades.reverse().map((level, index) => (
        <div
          key={level}
          onDragOver={e => e.preventDefault()}
          onDrop={() => handleDrop(level)}
          style={{ marginBottom: 12 }}
        >
          <h4 style={{ color: 'var(--orange)', marginBottom: 4 }}>
            {skillNames[skillNames.length - index - 1]}
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
            justifyItems: 'center'
          }}>
            {Array.from(char.skills.get(level)!).map((skill: string) => (
              <button
                key={skill}
                draggable
                onDragStart={() => handleDragStart(level, skill)}
                style={{
                  minWidth: 0,
                  padding: '6px 8px',
                  borderRadius: 6,
                  background: '#1e1e1e',
                  cursor: 'grab',
                  margin: 2,
                  lineHeight: '20px',
                  width: '100%',
                  color: 'white',
                  fontSize: 15
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>;
}


export default CharacterPage;