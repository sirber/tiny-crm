import {Dispatch, SetStateAction} from "react";

export interface FollowUp {
    id: string;
    date: Date;
    title: string;
    comment: string;
}

export interface Link {
    id: string;
    date: Date;
    title: string;
    link: string;
}

export interface Note {
    id: string;
    date: Date;
    title: string;
    note: string;
}

export interface ExtraProps {
    followups: Array<FollowUp>;
    links: Array<Link>;
    notes: Array<Note>;
}

export interface ExtrasState {
    data: ExtraProps;
    setData: Dispatch<SetStateAction<ExtraProps>>;
}