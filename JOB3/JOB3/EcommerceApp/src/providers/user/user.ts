import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { UserAccount } from '../../models/user/user-model';

const ITEMS_KEY = 'userAccount';

@Injectable()
export class UserProvider {

  defaultUserAccount: UserAccount = {
    id: Date.now(),
    username: "ionic",
    password: "ionic",
    position: "Software Engineer",
    phone: "085272217447",
    email: "ionic@gmail.com",
    affiliation: "Polbeng",
    modified: Date.now()
  };

  constructor(private storage: Storage) {
    console.log('Hello UserProvider Provider');
    this.addDefaultUserAccount();
  }

  addDefaultUserAccount(){
    return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
      let newUserAccount: UserAccount[] = [];
      if(!userAccounts || userAccounts.length == 0){
        newUserAccount.push(this.defaultUserAccount);
        console.log('Default userAccount created!');
        return this.storage.set(ITEMS_KEY, newUserAccount);
      }
      else
      {
        console.log('UserAccount available!');
        return this.storage.set(ITEMS_KEY, userAccounts);
      }
    });
  }
    
    addUserAccount(user: UserAccount): Promise<any>{
      return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
        if(userAccounts){
          userAccounts.push(user);
          console.log('Oh Yes!');
          return this.storage.set(ITEMS_KEY, userAccounts);
        }
        else
        {
          console.log('Oh No!');
          return this.storage.set(ITEMS_KEY,[user]);
        }
      });
    }

    getAllUserAccount(){
      return this.storage.get(ITEMS_KEY);
    }

    getUserAccount(search_id: number){
      return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
        if(!userAccounts || userAccounts.length == 0){
          return null;
        }
        for(let user of userAccounts){
          if(user.id == search_id){
            return user;
          }
        }
        return null;
      });
    }

    validateUserAccount(search_username: string, search_password: string){
      return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
        if(!userAccounts || userAccounts.length == 0){
          return null;
        }
        for(let user of userAccounts){
          if(user.username == search_username && user.password == search_password){
            return user;
          } 
        }
        return null;
      });
    }

    updateUserAccount(updatedUser: UserAccount){
      return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
        if(!userAccounts || userAccounts.length == 0){
          return null;
        }
        let newUserAccounts: UserAccount[]= [];
        for(let user of userAccounts){
          if(user.id == updatedUser.id){
            newUserAccounts.push(updatedUser);
        }
        else
        {
          newUserAccounts.push(user);
        }
      }
       return this.storage.set(ITEMS_KEY, newUserAccounts);   
      });
    }

    deleteUserAccount(search_id: number): Promise<UserAccount>{
      return this.storage.get(ITEMS_KEY).then((userAccounts: UserAccount[]) => {
        if(!userAccounts || userAccounts.length == 0) {
          return null;
        }
        let toKeep: UserAccount[]= [];
        for(let user of userAccounts){
          if(user.id !== search_id){
            toKeep.push(user);
          }
        }
        return this.storage.set(ITEMS_KEY, toKeep);
      });
      }
    }
