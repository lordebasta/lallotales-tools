import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonText,
  IonAlert,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { personCircleOutline, trash } from 'ionicons/icons';
import './Menu.css';
import { DiceRoller } from './DiceRoller';
import React, { useState, useRef, useEffect } from 'react';
import { auth, signInWithGoogle, signOut } from '../services/fireauth';
import { onAuthStateChanged } from 'firebase/auth';
import { FirestoreService } from '../services/firestore';
import { useSelector } from 'react-redux';
import { selectCharactersWithMap, setCharacters } from '../store/characterSlice';
import { store } from '../store/store';
import { jsonifyCharacters } from '../services/character';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  // {
  //   title: 'Dice Roller',
  //   url: '/dice-roller',
  //   icon: diceOutline,
  // },
];


const Menu: React.FC = () => {
  const location = useLocation();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean, characterIdx: number | null }>({ open: false, characterIdx: null });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const characters = useSelector(selectCharactersWithMap);

  const handleUserIconClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSignIn = () => {
    signInWithGoogle();
    setShowDropdown(false);
  };

  const handleSignOut = () => {
    signOut();
    setShowDropdown(false);
  };

  const handleNewCharacter = async () => {
    await FirestoreService.getInstance().createNewCharacter();
    const updated = await FirestoreService.getInstance().getCharacters();
    store.dispatch(setCharacters(jsonifyCharacters(updated)));
  }

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }
  );

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', padding: '16px 8px 0 8px', position: 'relative', zIndex: 2 }}>
          <div>
            <h1 style={{ marginTop: 0 }}>Lallotales App</h1>
          </div>
          <div
            ref={dropdownRef}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <IonButton style={{ margin: 0 }} fill="clear" onClick={handleUserIconClick}>
              {!isSignedIn || !auth.currentUser?.photoURL ? (
                <IonIcon style={{ fontSize: 40 }} icon={personCircleOutline} slot="icon-only" />
              ) : (
                <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                  <IonImg src={auth.currentUser.photoURL} />
                </div>
              )}
            </IonButton>
            {showDropdown && (
              <div
                style={{
                  position: 'absolute',
                  top: 48,
                  right: 0,
                  background: 'white',
                  border: '1px solid #ccc',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  minWidth: 120,
                  padding: 8,
                }}
              >
                {!isSignedIn ? (
                  <IonButton style={{}} onClick={handleSignIn}>
                    Sign in
                  </IonButton>
                ) : (
                  <IonButton style={{}} onClick={handleSignOut}>
                    Sign out
                  </IonButton>
                )}
              </div>
            )}
          </div>
        </div>

        {appPages.length > 0 && <IonList id="inbox-list">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" icon={appPage.icon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>}

        <IonList id="inbox-list">
          <IonListHeader>I miei personaggi</IonListHeader>
          {isSignedIn ?
            <div>
              <IonButton expand="block" onClick={handleNewCharacter} style={{ marginTop: 8 }}>
                <IonText style={{ textWeight: 'bold' }}>Nuovo Personaggio</IonText>
              </IonButton>
              {
                characters.map((character, index) => (
                  <IonMenuToggle key={index + 1} autoHide={false}>
                    <IonRow class='flexbox'>
                      <IonItem style={{ flex: 1, paddingRight: '10px' }} className={location.pathname === '/character' ? 'selected' : ''} routerLink={'/character/' + index} routerDirection="none" lines="none" detail={false}>
                        <IonLabel>{character.name}</IonLabel>
                      </IonItem>
                      <button
                        onClick={() => setConfirmDelete({ open: true, characterIdx: index })}
                      >
                        <IonIcon icon={trash} style={{ padding: '0px 5px 0px 5px', fontSize: 18 }} />
                      </button>
                    </IonRow>
                  </IonMenuToggle>
                ))
              }
            </div>
            :
            <IonButton onClick={handleSignIn} style={{ textAlign: 'start' }} fill="clear">
              Accedi per vedere i tuoi personaggi
            </IonButton>
          }
        </IonList>
        <IonAlert
          isOpen={confirmDelete.open}
          header="Conferma eliminazione"
          message="Sei sicuro di voler eliminare questo personaggio?"
          buttons={[
            {
              text: 'Annulla',
              role: 'cancel',
              handler: () => setConfirmDelete({ open: false, characterIdx: null })
            },
            {
              text: 'Elimina',
              role: 'destructive',
              handler: async () => {
                if (confirmDelete.characterIdx !== null) {
                  FirestoreService.getInstance().deleteCharacter(characters[confirmDelete.characterIdx].id);
                  const updated = await FirestoreService.getInstance().getCharacters();
                  store.dispatch(setCharacters(jsonifyCharacters(updated)));
                }
                setConfirmDelete({ open: false, characterIdx: null });
              }
            }
          ]}
          onDidDismiss={() => setConfirmDelete({ open: false, characterIdx: null })}
        />
      </IonContent>
      <div style={{ backgroundColor: "var(--ion-item-background, var(--ion-background-color, #fff)" }}>
        <DiceRoller />
      </div>
    </IonMenu >
  );
};

export default Menu;
