import { Dispatch, SetStateAction } from "react";

export interface PlaylistDialogProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    current: string;
}