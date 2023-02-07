import { ColorData } from "./colorData";
import { Label } from "./label";
import { Priority } from "./priority";
export interface Note {
    id: number;
    title: string;
    content: string;
    created: string;
    colorData: ColorData
    archived: boolean;
    priority: Priority;
    position: number;
    label?: string;
}