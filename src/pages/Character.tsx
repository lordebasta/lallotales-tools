import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import { auth, signInWithGoogle } from '../services/firebase';

const Character: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const handleGoogleLogin = () => {
    signInWithGoogle()
  };

  if (!auth.currentUser) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Character</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>Please login to see your character</h1>
          <IonButton onClick={handleGoogleLogin} style={{ marginTop: 16 }}>
            Login with Google
          </IonButton>
        </IonContent>
      </IonPage >
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Character</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Character</h1>
        <h2>{name}</h2>
        <p>Welcome to your character page!</p>
        <p>Your character name is: {name}</p>
        <p>Your email is: {auth.currentUser?.email}</p>
        <p>Your UID is: {auth.currentUser?.uid}</p>
        <p>Your display name is: {auth.currentUser?.displayName}</p>
        <p>Your photo URL is: {auth.currentUser?.photoURL}</p>
        <p>Your phone number is: {auth.currentUser?.phoneNumber}</p>
        <p>Your provider ID is: {auth.currentUser?.providerData[0].providerId}</p>
      </IonContent>

    </IonPage>
  )

};

export default Character;
