import config from '../conf/conf.js';
import {Client, Account,ID} from "appwrite";


export class AuthService{

    client = new Client();

    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);

        //this.ID= new 
    }

    async createAccount({email,password, name}){
        return this.account.create({
            userId: ID.unique(),
            email,
            password,
            name
        });
    }

    async login({email, password}){
        return this.account.createEmailPasswordSession({ email, password });
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(err){
            console.log("Appwrite service :: get current user :: ", err);
        }

        return null;
    }

    async logout(){
        return this.account.deleteSessions({ current: true });
    }
}

const authService = new AuthService();

export default authService;
