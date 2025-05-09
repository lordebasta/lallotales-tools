import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './DiceRollerPage.css';
import { useState } from 'react';

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

      <IonContent fullscreen >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dice Roller</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="fillv v-flex-list justify-center align-center">
          <div style={{ flex: 1 }} className='center'>
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
          <div style={{ flex: 0 }} className='center'>
            <IonGrid style={{ paddingBottom: '40px' }}>
              <IonRow>
                {buttons.map((value: number) => {
                  return <IonCol>
                    <IonButton expand="full" onClick={() => {
                      setRolls(rollDice(value))
                    }}>
                      <IonText style={{ fontSize: 18 }}>
                        {value.toString()}d6
                      </IonText>
                    </IonButton>
                  </IonCol>
                })}
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default DiceRollerPage;
