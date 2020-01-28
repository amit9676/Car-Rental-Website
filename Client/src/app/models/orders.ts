import { users } from './users';
import { cars } from './cars';

export class orders{

    public constructor(
        public id?: number,
        public startDate?: Date,
        public endDate?: Date,
        public orderingUser?: users,
        public orderedCar?: cars,
        public orderStatus?: string,
        public price?: number,
        public actualEndDate?: Date
        )
    {
    }
}