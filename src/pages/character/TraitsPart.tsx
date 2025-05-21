import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import React from 'react';
import { Character } from '../../services/character';
import './TraitsPart.css'
import { addOutline, createOutline, trash } from 'ionicons/icons';

const TraitsPart: React.FC<{ char: Character, setStateChar: React.Dispatch<React.SetStateAction<Character>> }> = ({ char, setStateChar }) => {


    return <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <IonRow style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, padding: '10px 0 10px 0' }}>Capacità</h2>
            <IonCol size="auto" style={{ display: 'flex', alignItems: 'center' }}>
                <IonButton id="new-trait">
                    <IonIcon
                        style={{ fontSize: 25 }}
                        icon={addOutline}
                    />
                </IonButton>
            </IonCol>
        </IonRow>
        <IonAlert
            trigger="new-trait"
            header="Nuova Capacità"
            buttons={['Annulla', {
                text: 'Crea',
                handler: (data) => {
                    const newTrait = {
                        name: data[0],
                        description: data[1],
                        cost: data[2],
                    };
                    setStateChar((prev: Character) => {
                        const updated = { ...prev };
                        updated.traits = [...updated.traits, newTrait];
                        return updated;
                    });
                }
            }]}
            inputs={[
                {
                    placeholder: 'Nome',
                },
                {
                    type: 'textarea',
                    placeholder: 'Descrizione',
                    attributes: {
                        rows: 5,
                        autogrow: true,
                    }
                },
                {
                    type: 'number',
                    placeholder: 'Costo (PE)',
                },
            ]}
        ></IonAlert>
        <div style={{ overflowY: 'auto', flex: 1 }}>
            {char.traits.map((trait, index) => (
                <div key={index} style={{ margin: '8px 0' }} >
                    <IonGrid style={{ padding: 0, margin: 0 }}>
                        <IonRow style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}>
                            <h3 style={{ margin: '0', flex: 1 }}>{trait.name}</h3>
                            <IonCol size="auto" style={{ display: 'flex', alignItems: 'end' }}>
                                <div style={{ paddingBottom: 1 }}>PE: {trait.cost}</div>
                            </IonCol>

                            <IonCol size="auto" style={{ display: 'flex', alignItems: 'end' }}>
                                <IonIcon
                                    id="delete-trait"
                                    style={{ fontSize: 20, cursor: 'pointer' }}
                                    icon={trash}
                                />
                            </IonCol>
                            <IonCol size="auto" style={{ display: 'flex', alignItems: 'end' }}>
                                <IonIcon
                                    id="edit-trait"
                                    style={{ fontSize: 20, cursor: 'pointer' }}
                                    icon={createOutline}
                                />
                            </IonCol>
                        </IonRow>
                        <p>{trait.description}</p>
                    </IonGrid>
                    <IonAlert
                        trigger="delete-trait"
                        header={"Eliiminare " + trait.name + "?"}
                        buttons={[
                            {
                                text: 'Elimina',
                                handler: () => {
                                    setStateChar((prev: Character) => {
                                        const updated = { ...prev };
                                        updated.traits = updated.traits.filter((_, i) => i !== index);
                                        return updated;
                                    });
                                }
                            },
                            'Annulla',
                        ]}
                    ></IonAlert>
                    <IonAlert
                        trigger="edit-trait"
                        header="Nuova Capacità"
                        buttons={[
                            'Annulla', {
                                text: 'Modifica',
                                handler: (data) => {
                                    const updatedTrait = {
                                        name: data[0],
                                        description: data[1],
                                        cost: data[2],
                                    };
                                    setStateChar((prev: Character) => {
                                        const updated = { ...prev };
                                        updated.traits[index] = updatedTrait;
                                        return updated;
                                    });
                                }
                            }]}
                        inputs={[
                            {
                                placeholder: 'Nome',
                                value: trait.name,
                            },
                            {
                                type: 'textarea',
                                placeholder: 'Descrizione',
                                attributes: {
                                    rows: 5,
                                    autogrow: true,
                                },
                                value: trait.description,
                            },
                            {
                                type: 'number',
                                placeholder: 'Costo (PE)',
                                value: trait.cost,
                            },
                        ]}
                    ></IonAlert>
                </div>
            ))}
        </div>

    </div >
};

export default TraitsPart;