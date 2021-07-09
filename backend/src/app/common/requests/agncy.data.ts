import ObjectId from 'bson-objectid';
import { Status } from '../types';

export class AgncyData {
    // ------------------------------------------------------------- <<< agency info
    _id:            null|ObjectId = null;   // [id]      # agency id, currently only one agency exists
    income:         null|ObjectId = null;   // ->acc
    credit_percent: null|number = null;     // number    # currently fixed at 20%
    rent_percent:   null|number = null;     // number
    sale_percent:   null|number = null;     // number
    admn_id:        null|ObjectId = null;   // ->acc


    static EnsureValid( acc_type: string, method: string, data?: AgncyData ): void {
        throw new Error('TODO');
    }
};

