import { userGender } from './userGender';
import { userRank } from './userRank';

export class users{

    public constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public socialNumber?: string,
        public userName?: string,
        public dateOfBirth?: Date,
        public gender?: userGender,
        public email?: string,
        public password?: string,
        public image?: string,
        public rank?: userRank
        )
    {
    }
}