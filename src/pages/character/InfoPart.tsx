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
            <IonLabel position="stacked">Nome</IonLabel>
            <IonInput value={char.name} onIonChange={e => handleChange('name', e.detail.value!)} />
        </div>
        <div >
            <IonLabel position="stacked">Livello</IonLabel>
            <IonInput type="number" value={char.level} onIonChange={e => handleChange('level', Number(e.detail.value))} />
        </div>

        <div>
            <IonLabel position="stacked">PF attuali</IonLabel>
            <IonInput type="number" value={char.currentPf} onIonChange={e => handleChange('currentPf', Number(e.detail.value))} />
        </div>
        <div>
            <IonLabel position="stacked">PF massimi</IonLabel>
            <IonInput type="number" value={char.maxPf} onIonChange={e => handleChange('maxPf', Number(e.detail.value))} />
        </div>
        {/* Description */}

        <div style={{ gridColumn: '1/4' }}>
            <IonLabel position="stacked">Stati Salute</IonLabel>
            <IonInput value={char.healthState} onIonChange={e => handleChange('healthState', e.detail.value!)} />
        </div>

        {/* Current PF | Max PF | Movement | Fatique */}
        <div>
            <IonLabel position="stacked">Monete</IonLabel>
            <IonInput type="number" value={char.coins} onIonChange={e => handleChange('coins', Number(e.detail.value))} />
        </div>
        <div>
            <IonLabel position="stacked">Movimento</IonLabel>
            <IonInput type="number" value={char.movement} onIonChange={e => handleChange('movement', Number(e.detail.value))} />
        </div>
        <div>
            <IonLabel position="stacked">Affaticato</IonLabel>
            <IonInput type="number" value={char.fatique} onIonChange={e => handleChange('fatique', Number(e.detail.value))} />
        </div>

        {/* Health State */}
        <div style={{ gridColumn: '1/7' }}>
            <IonLabel position="stacked">Descrizione</IonLabel>
            <IonTextarea value={char.description} onIonChange={e => handleChange('description', e.detail.value!)} rows={5} />
        </div>
    </div>
);

export default InfoPart;