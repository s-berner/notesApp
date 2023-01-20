import { ColorData } from "./colorData";
export interface Note {
    id: number;
    title: string;
    content: string;
    created: string;
    colorData: ColorData
    archived: boolean;
}