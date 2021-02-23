import ObjectId from 'bson-objectid';

class SubmsnSubmtd {
    _id:  ObjectId      = new ObjectId();   // [id]
    acc:  ObjectId      = new ObjectId();   // -> acc
    file: ObjectId|null = null;   // -> file|null
};

class SubmsnTerm {
    _id:        ObjectId    = new ObjectId();   // [id]
    cabinet:    string      = '';
    date_beg:   Date        = new Date();
    date_end:   Date        = new Date();
    prsn_limit: number|null = null;
    submtd:     Array<SubmsnSubmtd> = [];
};

class Submsn {
    _id:       ObjectId  = new ObjectId();   // [id]
    name:      string    = '';
    term:      Array<SubmsnTerm> = [];
    created:   Date      = new Date();
    readonly:  Date|null = null;
    completed: Date|null = null;
};

export { Submsn, SubmsnTerm, SubmsnSubmtd };
