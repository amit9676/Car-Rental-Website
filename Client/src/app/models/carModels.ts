import { carManufactors } from './carManufactors';

export class carModels{

    public constructor(public id?: number,
        public manufactor?: carManufactors,
        public model?: string){

    }
}