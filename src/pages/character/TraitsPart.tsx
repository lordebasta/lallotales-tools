import { IonAlert, IonButton, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import { Character } from '../../services/character';
import './TraitsPart.css'
import { addOutline, createOutline, trash } from 'ionicons/icons';
import { ConfirmAlert } from '../../components/ConfirmAlert';

const TraitsPart: React.FC<{ char: Character, setStateChar: React.Dispatch<React.SetStateAction<Character>> }> = ({ char, setStateChar }) => {

    const [editTraitAlertState, setEditTraitAlertState] = useState<{ open: boolean, index: number }>({ open: false, index: -1 });
    const [deleteTraitAlertState, setDeleteTraitAlertState] = useState<{ open: boolean, index: number }>({ open: false, index: -1 });

    const confirmDeleteTrait = deleteTraitAlertState.open &&
        <ConfirmAlert
            isOpen={deleteTraitAlertState.open}
            header={"Eliiminare " + char.traits[deleteTraitAlertState.index].name + "?"}
            onConfirm={() => {
                const updated = { ...char };
                updated.traits = updated.traits.filter((_, i) => i !== deleteTraitAlertState.index);
                setStateChar(updated);
            }}
            confirmButtonText="Elimina"
        />

    const editTraitAlert = editTraitAlertState.open && <IonAlert
        isOpen={editTraitAlertState.open}
        header="Modifica Capacità"
        buttons={[
            {
                text: "Annulla",
                handler: () => {
                    setEditTraitAlertState({ open: false, index: -1 });
                }
            }, {
                text: 'Modifica',
                handler: (data) => {
                    const updatedTrait = {
                        name: data[0],
                        description: data[1],
                        cost: data[2],
                    };
                    const updated = { ...char };
                    const index = editTraitAlertState.index;
                    updated.traits[index] = updatedTrait;
                    setStateChar(updated);
                }
            }]}
        inputs={[
            {
                placeholder: 'Nome',
                value: char.traits[editTraitAlertState.index].name,
            },
            {
                type: 'textarea',
                placeholder: 'Descrizione',
                attributes: {
                    rows: 5,
                    autogrow: true,
                },
                value: char.traits[editTraitAlertState.index].description,
            },
            {
                type: 'number',
                placeholder: 'Costo (PE)',
                value: char.traits[editTraitAlertState.index].cost,
            },
        ]}
    ></IonAlert>

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
                        <IonRow style={{ display: 'flex' }} class='fillh'>
                            <IonCol style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <h4 style={{ margin: '0', color: "var(--orange)" }}>{trait.name}</h4>
                            </IonCol>
                            <IonCol size="auto" style={{ flex: 0, display: 'flex', alignItems: 'center' }}>
                                <div style={{ paddingBottom: 1 }}>PE: {trait.cost}</div>
                            </IonCol>

                            <IonCol size="auto" style={{ flex: 0, display: 'flex', alignItems: 'start' }}>
                                <button
                                    style={{ fontSize: 20 }}
                                    onClick={() => {
                                        setDeleteTraitAlertState({ open: true, index: index });
                                    }}>
                                    <IonIcon
                                        id="delete-trait"
                                        icon={trash}
                                    />
                                </button>
                                <button
                                    style={{ fontSize: 20 }}
                                    onClick={() => {
                                        setEditTraitAlertState({ open: true, index: index });
                                    }}>

                                    <IonIcon
                                        icon={createOutline}
                                    />
                                </button>
                            </IonCol>
                        </IonRow>
                        <p>{trait.description}</p>
                    </IonGrid>


                </div>
            ))}

            {editTraitAlert}
            {confirmDeleteTrait}
        </div>

    </div >
};

export default TraitsPart;