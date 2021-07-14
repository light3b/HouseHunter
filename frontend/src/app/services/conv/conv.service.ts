import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ObjectId from 'bson-objectid';
import { ConvApiCall, ConvData, MsgData } from 'src/app/common/requests/conv.data';
import { Status } from 'src/app/common/types';
import { SeshService } from '../sesh/sesh.service';

@Injectable({
  providedIn: 'root'
})
export class ConvService {

  constructor(
    private http: HttpClient,
    private session: SeshService,
  ) { }

  // ------------------------------------------------------------- //
  // POST   async add( conv: ConvData ): Promise<[ Status, ObjectId?/*conv_id*/ ]>
  async add( conv: ConvData ): Promise<[ Status, ObjectId?/*conv_id*/ ]>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "add", conv );
      let res = await this.http.post( '/conv/add', conv ).toPromise() as [ Status, ObjectId? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // PUT   async delete( conv_id: ObjectId ): Promise<Status>
  async delete( conv_id: ObjectId ): Promise<Status>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "delete", conv_id );
      let res = await this.http.put( '/conv/delete', conv_id ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }

  // POST   async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]>
  async get( conv_id: ObjectId ): Promise<[ Status, ConvData? ]>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "get", conv_id );
      let res = await this.http.post( '/conv/get', conv_id ).toPromise() as [ Status, ConvData? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // POST   async list( is_archived: boolean ): Promise<[ Status, Array<ConvData>? ]>
  async list( is_archived: boolean ): Promise<[ Status, Array<ConvData>? ]>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "list", is_archived );
      let res = await this.http.post( '/conv/list', is_archived ).toPromise() as [ Status, Array<ConvData>? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }


  // ------------------------------------------------------------- //
  // PUT   async sendMessage( conv_id: ObjectId, text: string ): Promise<[ Status, MsgData? ]>
  async sendMessage( conv_id: ObjectId, text: string ): Promise<[ Status, MsgData? ]>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "sendMessage", conv_id, text );
      let res = await this.http.put( '/conv/sendMessage', conv_id ).toPromise() as [ Status, MsgData? ];
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return [ err ];
      throw err;
    }
  }

  // PUT   async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status>
  async markRead( conv_id: ObjectId, last_msg_dt: Date ): Promise<Status>
  {
    try
    {
      ConvApiCall.ensureValid( this.session.acc_type, "markRead", conv_id, last_msg_dt );
      let res = await this.http.put( '/conv/markRead', conv_id ).toPromise() as Status;
      return res;
    }
    catch( err )
    {
      if( err instanceof Status ) return err;
      throw err;
    }
  }
  
}
