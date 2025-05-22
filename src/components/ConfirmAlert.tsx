import { IonAlert } from "@ionic/react";
import React from "react";

interface ConfirmAlertProps {
    header: string;
    isOpen?: boolean;
    onConfirm: () => void;
    trigger?: string;
    confirmButtonText: string;
}

export const ConfirmAlert: React.FC<ConfirmAlertProps> = ({ header, isOpen, onConfirm, trigger, confirmButtonText }) => {
    return (
        <IonAlert
            trigger={trigger}
            isOpen={isOpen}
            header={header}
            buttons={[
                {
                    text: confirmButtonText,
                    handler: onConfirm,
                },
                'Annulla',
            ]}
        ></IonAlert>
    );
}
