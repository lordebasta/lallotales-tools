import React from 'react';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { Character, InventorySection, InventoryItem } from '../../services/character';
import { addOutline } from 'ionicons/icons';

const InventoryPart: React.FC<{ char: Character, setStateChar: React.Dispatch<React.SetStateAction<Character>> }> = ({ char, setStateChar }) => {
    return (
        <div style={{ padding: 16, height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>Inventario</h2>
            <IonButton expand="block" id="new-section" style={{ marginTop: 16 }}>
                <IonIcon icon={addOutline} slot="start" />
                Aggiungi Sezione
            </IonButton>
            <IonAlert
                trigger="new-section"
                header="Nuova Capacità"
                buttons={['Annulla', {
                    text: 'Crea',
                    handler: (data) => {
                        const newSection: InventorySection = {
                            name: data[0],
                            items: [],
                        };
                        setStateChar((prev: Character) => {
                            const updated = { ...prev };
                            updated.equipment = [...updated.equipment, newSection];
                            return updated;
                        });
                    }
                }]}
                inputs={[
                    {
                        placeholder: 'Nome',
                    },
                ]}
            ></IonAlert>
            <IonAccordionGroup>
                {char.equipment.map((section: InventorySection, idx: number) => (
                    <IonAccordion value={section.name} key={section.name + idx}>
                        <IonItem slot="header" color="light">
                            <IonLabel>{section.name}</IonLabel>
                        </IonItem>
                        <div slot="content">
                            <IonList>
                                {section.items.map((item: InventoryItem, i: number) => (
                                    <IonItem key={item.name + i}>
                                        <IonLabel>
                                            <strong>{item.name}</strong>
                                            <div>{item.description}</div>
                                            <div>Quantità: {item.quantity}</div>
                                        </IonLabel>
                                    </IonItem>
                                ))}
                            </IonList>
                            {/* Pulsante per aggiungere item (implementazione logica a piacere) */}
                            <IonButton size="small" fill="clear">
                                <IonIcon icon={addOutline} slot="start" />
                                Aggiungi Oggetto
                            </IonButton>
                        </div>
                    </IonAccordion>
                ))}
            </IonAccordionGroup>
        </div>
    );
};

export default InventoryPart;