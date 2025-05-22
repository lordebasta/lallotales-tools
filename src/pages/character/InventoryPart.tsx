import React, { useState } from 'react';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonButton, IonIcon, IonAlert, IonPopover, IonCol, IonRow, IonGrid } from '@ionic/react';
import { Character, InventorySection, InventoryItem } from '../../services/character';
import { addOutline, createOutline, trash } from 'ionicons/icons';
import { ConfirmAlert } from '../../components/ConfirmAlert';

const InventoryPart: React.FC<{ char: Character, setStateChar: React.Dispatch<React.SetStateAction<Character>> }> = ({ char, setStateChar }) => {
    interface SectionPopoverState {
        open: boolean;
        sectionIdx: number;
    }

    interface EditItemState {
        open: boolean;
        sectionIdx: number;
        itemIdx: number;
    }
    const [sectionPopoverState, setSectionPopoverState] = useState<SectionPopoverState>({ open: false, sectionIdx: 0 });
    const [confirmAlertState, setConfirmAlertState] = useState<{ open: boolean, sectionIdx: number, itemIdx?: number }>({ open: false, sectionIdx: 0 });
    const [editSectionAlert, setEditSectionAlert] = useState<SectionPopoverState>({ open: false, sectionIdx: 0 });
    const [newItemAlertState, setNewItemAlertState] = useState<SectionPopoverState>({ open: false, sectionIdx: 0 });
    const [editItemAlertState, setEditItemAlertState] = useState<EditItemState>({ open: false, sectionIdx: 0, itemIdx: 0 });

    function closePopover() {
        setSectionPopoverState({ open: false, sectionIdx: -1 });
    }


    const NewSectionAlert = <IonAlert
        trigger="new-section"
        header="Nuova Sezione"
        buttons={['Annulla', {
            text: 'Crea',
            handler: (data) => {
                const newSection: InventorySection = {
                    name: data[0],
                    items: [],
                };
                const updated = { ...char };
                updated.equipment = [...updated.equipment, newSection];
                setStateChar(updated);
            }
        }]}
        inputs={[
            {
                placeholder: 'Nome',
            },
        ]}
    ></IonAlert>;

    const EditItemAlert =
        editItemAlertState.open && <IonAlert
            isOpen={editItemAlertState.open}
            header="Modifica Elemento"
            onDidDismiss={() => setEditItemAlertState({ open: false, sectionIdx: -1, itemIdx: -1 })}
            buttons={['Annulla', {
                text: 'Modifica',
                handler: (data) => {
                    const updated = { ...char };
                    updated.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].name = data[0];
                    updated.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].description = data[1];
                    updated.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].quantity = data[2];
                    setStateChar(updated);
                }
            }]}
            inputs={[
                {
                    placeholder: 'Nome',
                    value: char.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].name,
                },
                {
                    type: 'textarea',
                    placeholder: 'Descrizione',
                    attributes: {
                        rows: 5,
                        autogrow: true,
                    },
                    value: char.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].description,
                },
                {
                    type: 'number',
                    placeholder: 'Quantità',
                    value: char.equipment[editItemAlertState.sectionIdx].items[editItemAlertState.itemIdx].quantity,
                },
            ]}
        ></IonAlert>
        ;

    const EditSectionAlert = editSectionAlert.open && <IonAlert
        isOpen={editSectionAlert.open}
        header="Modifica Sezione"
        buttons={['Annulla', {
            text: 'Modifica',
            handler: (data) => {
                const updated = { ...char };
                updated.equipment[editSectionAlert.sectionIdx].name = data[0];
                setStateChar(updated);
            }
        }]}
        inputs={[
            {
                placeholder: 'Nome',
                value: char.equipment[editSectionAlert.sectionIdx].name,
            },
        ]}
    ></IonAlert>;


    return (
        <div style={{ padding: 16, height: '100%', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>Inventario</h2>
            <IonButton expand="block" id="new-section" style={{ marginTop: 16 }}>
                <IonIcon icon={addOutline} slot="start" />
                Aggiungi Sezione
            </IonButton>
            {NewSectionAlert}
            <IonAccordionGroup multiple>
                {char.equipment.map((section: InventorySection, idx: number) => (
                    <IonAccordion value={section.name} key={section.name + idx}>
                        <IonItem slot="header" color="light">
                            <IonLabel>{section.name}</IonLabel>
                        </IonItem>
                        <div slot="content" style={{ padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'stretch' }}>
                            <button
                                style={{
                                    backgroundColor: 'var(--orange)',
                                    color: 'black',
                                    fontSize: 16,
                                    borderRadius: '4px 4px 0 0'
                                }}
                                onClick={() => {
                                    setSectionPopoverState({ open: true, sectionIdx: idx });
                                }}
                            >
                                <IonIcon icon={createOutline} />
                                Modifica
                            </button>

                            <IonList>
                                {section.items.map((item: InventoryItem, i: number) => (
                                    <IonItem style={{ margin: 0, }} key={item.name + i}>
                                        <IonGrid style={{ padding: '4px 0px 4px 0px' }}>
                                            <IonRow class='fillh flexbox' style={{ alingItems: 'center' }}>
                                                <IonCol style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                                    <IonLabel>
                                                        <strong>{item.name}</strong> {item.quantity != 1 && "x" + item.quantity}
                                                    </IonLabel>
                                                </IonCol>
                                                <IonCol style={{ flex: 0 }}>
                                                    <button
                                                        style={{ fontSize: 18, color: "white" }}
                                                        onClick={
                                                            () => {
                                                                setEditItemAlertState({ open: true, sectionIdx: idx, itemIdx: i });
                                                            }
                                                        }
                                                    >
                                                        <IonIcon icon={createOutline} />
                                                    </button>
                                                </IonCol>
                                                <IonCol style={{ flex: 0 }}>
                                                    <button
                                                        style={{ fontSize: 18, color: "white" }}
                                                        onClick={() => {
                                                            setConfirmAlertState({
                                                                open: true,
                                                                sectionIdx: idx,
                                                                itemIdx: i,
                                                            })
                                                        }
                                                        }
                                                    >
                                                        <IonIcon icon={trash} />
                                                    </button>
                                                </IonCol>
                                            </IonRow>
                                            <IonRow>
                                                <div>{item.description}</div>
                                            </IonRow>
                                        </IonGrid>
                                    </IonItem>
                                ))}
                            </IonList>

                        </div>
                    </IonAccordion>

                ))}

            </IonAccordionGroup>
            <IonPopover
                isOpen={sectionPopoverState.open}
                onDidDismiss={closePopover}
            >
                <IonList>
                    <IonItem button onClick={() => {
                        setEditSectionAlert({ open: true, sectionIdx: sectionPopoverState.sectionIdx });
                        closePopover();
                    }}>
                        <IonLabel>Modifica</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        setConfirmAlertState({ open: true, sectionIdx: sectionPopoverState.sectionIdx });
                        closePopover();
                    }
                    }>
                        <IonLabel>Elimina</IonLabel>
                    </IonItem>
                    <IonItem button onClick={() => {
                        setNewItemAlertState({ open: true, sectionIdx: sectionPopoverState.sectionIdx });
                        closePopover();
                    }}>
                        <IonLabel>Aggiungi Elemento</IonLabel>
                    </IonItem>
                </IonList>
            </IonPopover>
            {EditSectionAlert}
            {EditItemAlert}
            {
                newItemAlertState.open && (
                    <ItemAlert
                        isOpen={newItemAlertState.open}
                        onDidDismiss={() => setNewItemAlertState({ open: false, sectionIdx: -1 })}
                        onConfirm={(data) => {
                            const arr = data as [string, string, number];
                            const newItem: InventoryItem = {
                                name: arr[0],
                                description: arr[1],
                                quantity: arr[2],
                            };
                            const updated = { ...char };
                            updated.equipment[newItemAlertState.sectionIdx].items = [
                                ...updated.equipment[newItemAlertState.sectionIdx].items,
                                newItem,
                            ];
                            setStateChar(updated);
                        }}
                    />
                )
            }
            {
                confirmAlertState.open && <ConfirmAlert
                    isOpen={confirmAlertState.open}
                    header={confirmAlertState.itemIdx !== undefined ?
                        "Eliminare elemento " + char.equipment[confirmAlertState.sectionIdx].items[confirmAlertState.itemIdx].name + "?" :
                        "Eliminare sezione " + char.equipment[confirmAlertState.sectionIdx].name + "?"
                    }
                    onConfirm={() => {
                        const updated = { ...char };
                        if (confirmAlertState.itemIdx !== undefined) {
                            updated.equipment[confirmAlertState.sectionIdx].items.splice(confirmAlertState.itemIdx, 1);
                        } else {
                            updated.equipment.splice(confirmAlertState.sectionIdx, 1);
                        }
                        setStateChar(updated);
                        setConfirmAlertState({ open: false, sectionIdx: -1 });
                    }}
                    confirmButtonText="Elimina"
                />
            }
        </div >
    );
};

const ItemAlert: React.FC<{
    isOpen: boolean,
    onConfirm: (data: unknown) => boolean | void,
    onDidDismiss: () => void
}> = ({ isOpen, onConfirm, onDidDismiss }) => {
    return (
        <IonAlert
            isOpen={isOpen}
            header="Nuovo Elemento"
            buttons={[
                'Annulla',
                {
                    text: 'Crea',
                    handler: onConfirm,
                }
            ]}
            inputs={[
                { placeholder: 'Nome', value: '' },
                { type: 'textarea', placeholder: 'Descrizione', attributes: { rows: 5, autogrow: true }, value: '' },
                { type: 'number', placeholder: 'Quantità', value: 1 },
            ]}
            onDidDismiss={onDidDismiss}
        />
    );
};

export default InventoryPart;