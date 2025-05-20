import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect, useParams } from 'react-router';
import React, { useState } from 'react';
import { auth } from '../services/fireauth';
import { Character } from '../services/character';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import LoginRequiredPage from './LoginRequiredPage';
import { FirestoreService } from '../services/firestore';

import { setCharacter } from '../store/characterSlice';
import InfoPart from './InfoPart';
import TraitsPart from './TraitsPart';
import InventoryPart from './InventoryPart';



const CharacterPage: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const dispatch = useDispatch();

  const characters = useSelector((state: RootState) => state.character.characters);
  const [char, setStateChar] = useState<Character>(() => {
    if (characters.length < Number(index) + 1) {
      return {} as Character;
    }
    return characters[Number(index)];
  });

  const [maxPf] = useState<number>(0);
  const skillGrades = ['common', 'apprentice', 'expert', 'master', 'legendary'];

  const handleChange = (field: keyof Character, value: unknown) => {
    setStateChar(prev => ({ ...prev, [field]: value }));
  };

  const saveCharacter = async () => {
    dispatch(setCharacter({ index: Number(index), character: char }));
    try {
      await FirestoreService.getInstance().setCharacter(char);
      alert('Character saved successfully!');
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
      <IonContent>
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
                <TraitsPart />
              </div>
              <div style={{ flex: 1 }}>
                <InventoryPart />
              </div>
            </div>
          </div>
          {/* Skills column on the right */}
          <div style={{
            flex: 1,
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minWidth: 220,
            maxWidth: 300,
          }}>
            <strong style={{ marginBottom: 12, fontSize: 16 }}>Skills</strong>
            <div style={{ width: '100%' }}>
              {skillGrades.map((level) => (
                <div
                  key={level}
                  onDragOver={e => e.preventDefault()}
                  onDrop={() => handleDrop(level)}
                  style={{ marginBottom: 12 }}
                >
                  <strong style={{ display: 'block', marginBottom: 4, fontSize: 13 }}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </strong>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 4,
                    justifyItems: 'center'
                  }}>
                    {Array.from(char.skills.get(level)!).map((skill: string) => (
                      <IonButton
                        key={skill}
                        draggable
                        onDragStart={() => handleDragStart(level, skill)}
                        style={{
                          minWidth: 0,
                          fontSize: 12,
                          padding: '2px 8px',
                          borderRadius: 6,
                          border: '1px solid #ccc',
                          background: draggedSkill?.startGrade === level ? '#eee' : '#fafafa',
                          cursor: 'grab',
                          margin: 2,
                          height: 24,
                          lineHeight: '20px'
                        }}
                      >
                        {skill}
                      </IonButton>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CharacterPage;
