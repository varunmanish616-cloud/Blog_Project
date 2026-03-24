import conf from '../conf/conf.js' 
import {Client,Account,ID} from 'appwrite'

export class AuthServices{
    client=new Client();
    account;
    constructor() {
    this.client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject('691dbdac003104a75d7d')

  this.account = new Account(this.client)
}
   
    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //call another function
                return this.login({email,password})
            }
            }catch(e){
                throw e
            }

        }
    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password)
        }catch(e){
            throw e;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }
    async logOut(){
        try {
        await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

}

const authServices=new AuthServices()

export default authServices;