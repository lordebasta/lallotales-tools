import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { signInWithGoogle } from '../services/fireauth';

const LoginRequiredPage: React.FC = () => {

    const handleGoogleLogin = () => {
        signInWithGoogle();
    };

    return <IonPage>
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
    </IonPage>
}

export default LoginRequiredPage;
