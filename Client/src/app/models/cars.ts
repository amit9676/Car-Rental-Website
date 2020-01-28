import { Branches } from './branches';
import { carManufactors } from './carManufactors';
import { carModels } from './carModels';
import { carGears } from './carGears';
import { carDesigns } from './carDesigns';

export class cars{

    public constructor(public id?: number,
        public manufactor?: carManufactors,
        public model?: carModels,
        public gear?: carGears,
        public design?: carDesigns,
        public carNum?: string,
        public branch?: Branches,
        public year?: number,
        public dailyRent?: number,
        public lateRent?: number,
        public kilometrage?: number,
        public functional?: boolean,
        public picture?: string){

    }
}