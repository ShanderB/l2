import { AbstractControl, FormControl } from "@angular/forms";

export interface Game {
    id?: string;
    name: string;
    price?: number;
    boxHeight: number;
    boxWidth: number;
    boxLength: number;
    description?: string;
    coverImage?: string;
}
export interface GameFormControls {
    name: FormControl<string>;
    price: FormControl<number>;
    boxLength: FormControl<number>;
    boxWidth: FormControl<number>;
    boxHeight: FormControl<number>;
    description: FormControl<string>;
    coverImage: FormControl<string>;
}