import { IonButton, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useState } from "react";

export const DiceRoller: React.FC = () => {

    let buttons = [1, 2, 4, 6, 8, 10]
    const [rolls, setRolls] = useState<number[]>([])

    function rollDice(qty: number) {
        const randomNumberInRange = (min: number, max: number) => {
            return Math.floor(Math.random()
                * (max - min + 1)) + min;
        };

        let rolls = []
        for (let i = 0; i < qty; i++) {
            let res = randomNumberInRange(1, 6)
            rolls.push(res)
            while (res === 6) {
                res = randomNumberInRange(1, 6)
                rolls.push(res)
            }
        }
        return rolls
    }

    const Button = (value: number) =>
        <IonButton
            expand="full"
            onClick={() => {
                setRolls(rollDice(value))
            }}
            style={{ width: "5rem" }}
        >
            <IonText style={{ fontSize: 18 }}>
                {value.toString()}d6
            </IonText>
        </IonButton >

    return <div className="" style={{ padding: 15, margin: 10, borderRadius: 15, backgroundColor: "var(--bg-purple)" }}>
        <h2 style={{ fontWeight: "bold" }}>Lanciatore di dadi</h2>
        <div>
            <div style={{ paddingBottom: 20, paddingTop: 20 }} className='center'>
                <div className="v-flex-list align-center">
                    <IonText color="primary" style={{ fontSize: 36 }}>
                        {rolls.reduce((partialSum, el) => partialSum + el, 0)}
                    </IonText>
                    <IonGrid>
                        {rolls.length > 0
                            ? rolls.map((val: number, idx: number) => (
                                <IonCol key={idx}>
                                    {val === 6 ? <IonText color="success">{val}</IonText> : <IonText>{val}</IonText>}
                                </IonCol>
                            ))
                            : <IonText>0</IonText>
                        }
                    </IonGrid>
                </div>
            </div>
            <div style={{}} className='center'>
                <IonGrid style={{ paddingBottom: 20 }}>
                    <IonRow>
                        {buttons.slice(0, 3).map((value: number) => {
                            return <IonCol>
                                {Button(value)}
                            </IonCol>
                        })}
                    </IonRow>
                    <IonRow>
                        {buttons.slice(3, 6).map((value: number) => {
                            return <IonCol>
                                {Button(value)}
                            </IonCol>
                        })}
                    </IonRow>
                </IonGrid>
            </div>
        </div>
    </div>
}
