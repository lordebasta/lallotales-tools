import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './DiceRollerPage.css';
import React, { useState } from 'react';

const DiceRollerPage: React.FC = () => {

  let buttons = [1, 2, 4, 6, 8, 10]
  const [rolls, setRolls] = useState<number[]>([])

  function rollDice(qty: number) {
    const randomNumberInRange = (min: number, max: number) => {
      return Math.floor(Math.random()
        * (max - min + 1)) + min;
    };

    let rolls = []
    for (let i = 0; i < qty; i++) {
      let res = randomNumberInRange(1, 6)
      rolls.push(res)
      while (res === 6) {
        res = randomNumberInRange(1, 6)
        rolls.push(res)
      }
    }
    return rolls
  }

  const Button = (value: number) =>
    <IonButton
      expand="full"
      onClick={() => {
        setRolls(rollDice(value))
      }}
      style={{ width: "5rem" }}
    >
      <IonText style={{ fontSize: 18 }}>
        {value.toString()}d6
      </IonText>
    </IonButton >


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
        <div className="center fillv" style={{ backgroundColor: "var(--bg-purple)" }}>
          <div>
            <div style={{ paddingBottom: 40 }} className='center'>
              <div className="v-flex-list align-center">
                <IonText color="primary" style={{ fontSize: 36 }}>
                  {rolls.reduce((partialSum, el) => partialSum + el, 0)}
                </IonText>
                <IonGrid>
                  {rolls.map((val: number) => {
                    return <IonCol>
                      {val === 6 && <IonText color="success">{val}</IonText>}
                      {val !== 6 && <IonText>{val}</IonText>}
                    </IonCol>
                  })}
                </IonGrid>
              </div>
            </div>
            <div style={{}} className='center'>
              <IonGrid style={{ paddingBottom: '40px' }}>
                <IonRow>
                  {buttons.slice(0, 3).map((value: number) => {
                    return <IonCol>
                      {Button(value)}
                    </IonCol>
                  })}
                </IonRow>
                <IonRow>
                  {buttons.slice(3, 6).map((value: number) => {
                    return <IonCol>
                      {Button(value)}
                    </IonCol>
                  })}
                </IonRow>
              </IonGrid>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default DiceRollerPage;
