import { Injectable } from "@angular/core";

import * as moment from "moment";
import { User } from "../models/user";

@Injectable()
export class UserService {
  selectedUser: User = new User();

  location = {
    lat: null,
    lon: null
  };

  constructor() {
    this.getUsers();
  }

  getUsers() {

  }

  createUser(data: any) {

  }
  addData(data: any){

    data.location = this.location;
    data.createdOn = moment(new Date()).format("X");
    data.isAdmin = false;


      }
 isAdmin(emailId: string) {
   console.log('in is admin')





  }

  updateUser(user: User) {

  }

  setLocation(lat, lon) {
    this.location.lat = lat;
    this.location.lon = lon;
  }
}
