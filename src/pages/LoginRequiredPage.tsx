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
                <IonTitle></IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonButton onClick={handleGoogleLogin} style={{ marginTop: 16 }}>
                Accedi con Google
            </IonButton>
        </IonContent>
    </IonPage>
}

export default LoginRequiredPage;
