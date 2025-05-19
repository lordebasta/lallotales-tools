import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './DiceRollerPage.css';
import React from 'react';
import { DiceRoller } from '../components/DiceRoller';

const DiceRollerPage: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dice Roller</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen  >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dice Roller</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="fillv">
          <DiceRoller />
        </div>
      </IonContent>
    </IonPage >
  );
};

export default DiceRollerPage;
