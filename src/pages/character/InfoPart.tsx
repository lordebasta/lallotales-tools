import React from 'react';
import { IonLabel, IonInput, IonTextarea } from '@ionic/react';
import { Character } from '../../services/character';
import './InfoPart.css'

interface InfoPartProps {
    char: Character;
    maxPf: number;
    handleChange: (field: keyof Character, value: unknown) => void;
}

const InfoPart: React.FC<InfoPartProps> = ({
    char,
    maxPf,
    handleChange,
}) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
            gap: '16px',
            padding: 16,
        }}
    >
        {/* Name | Level */}
        <div style={{ gridColumn: '1/4' }}>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput value={char.name} onIonChange={e => handleChange('name', e.detail.value!)} />
        </div>
        <div >
            <IonLabel position="stacked">Level</IonLabel>
            <IonInput type="number" value={char.level} onIonChange={e => handleChange('level', Number(e.detail.value))} />
        </div>

        <div>
            <IonLabel position="stacked">Current PF</IonLabel>
            <IonInput type="number" value={char.currentPf} onIonChange={e => handleChange('currentPf', Number(e.detail.value))} />
        </div>
        <div>
            <IonLabel position="stacked">Max PF</IonLabel>
            <IonInput type="number" value={maxPf} />
        </div>
        {/* Description */}

        <div style={{ gridColumn: '1/5' }}>
            <IonLabel position="stacked">Health State</IonLabel>
            <IonInput value={char.healthState} onIonChange={e => handleChange('healthState', e.detail.value!)} />
        </div>

        {/* Current PF | Max PF | Movement | Fatique */}
        <div>
            <IonLabel position="stacked">Movement</IonLabel>
            <IonInput type="number" value={char.movement} onIonChange={e => handleChange('movement', Number(e.detail.value))} />
        </div>
        <div>
            <IonLabel position="stacked">Fatique</IonLabel>
            <IonInput type="number" value={char.fatique} onIonChange={e => handleChange('fatique', Number(e.detail.value))} />
        </div>

        {/* Health State */}
        <div style={{ gridColumn: '1/7' }}>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={char.description} onIonChange={e => handleChange('description', e.detail.value!)} rows={5} />
        </div>
    </div>
);

export default InfoPart;