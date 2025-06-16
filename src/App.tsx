import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Character from './pages/Character';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { auth } from './services/fireauth';
import LoginRequiredPage from './pages/LoginRequiredPage';
import { useEffect } from 'react';
import { FirestoreService } from './services/firestore';
import { setCharacters } from './store/characterSlice';
import { jsonifyCharacters } from './services/character';
import { DiceRoller } from './components/DiceRoller';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    // Initialize store with characters from Firestore
    const fetchCharacters = async () => {
      try {
        const characters = await FirestoreService.getInstance().getCharacters();
        store.dispatch(setCharacters(jsonifyCharacters(characters)));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            {window.location.pathname !== '/dice-roller' && <Menu />}
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                {auth.currentUser ? <Redirect to="/home" /> : <Redirect to="/login" />}
              </Route>
              <Route path="/login" exact={true}>
                <LoginRequiredPage />
              </Route>
              <Route path="/character/:index" exact={true}>
                <Character />
              </Route>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
              <Route path="/dice-roller" exact={true}>
                <div className="fillv" style={{ backgroundColor: "var(--bg-purple)" }}>
                  <DiceRoller />
                </div>
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
