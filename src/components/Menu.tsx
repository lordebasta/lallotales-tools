import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { diceOutline } from 'ionicons/icons';
import './Menu.css';
import { DiceRoller } from './DiceRoller';

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

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Lallotales Tools</IonListHeader>
          <IonNote>made for Lallotales RPG</IonNote>
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
        </IonList>

        <IonList id="inbox-list">
          <IonListHeader>My characters</IonListHeader>

          <IonMenuToggle key={0} autoHide={false}>
            <IonItem className={location.pathname === '/character' ? 'selected' : ''} routerLink={'/character'} routerDirection="none" lines="none" detail={false}>
              <IonLabel>{"Character"}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
      <div style={{ backgroundColor: "var(--ion-item-background, var(--ion-background-color, #fff)" }}>
        <DiceRoller />
      </div>
    </IonMenu >
  );
};

export default Menu;
