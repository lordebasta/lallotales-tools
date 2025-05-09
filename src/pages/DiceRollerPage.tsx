import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './DiceRollerPage.css';

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

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Dice Roller</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="fillv v-flex-list justify-center align-center">
          <div style={{ flex: 1 }} className='center'>
            <IonText class='ion-textj'>
              Ciao
            </IonText>
          </div>
          <div style={{ flex: 1 }} className='center'>
            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>

              <IonButton expand="full">Button 1</IonButton>
              <IonButton expand="full">Button 1</IonButton>
              <IonButton expand="full">Button 1</IonButton>
              <IonButton expand="full">Button 1</IonButton>
              <IonButton expand="full">Button 1</IonButton>
            </div>
            <IonGrid style={{ flex: 1 }}>
              <IonRow>
                <IonCol>
                  <IonButton expand="full">Button 1</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 2</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 3</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 4</IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="full">Button 5</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 6</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 7</IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="full">Button 8</IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage >
  );
};

export default DiceRollerPage;
