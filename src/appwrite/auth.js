import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client();
    account ;

    constructor(){

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);      

        this.account = new Account(this.client)

    }

    async createAccount ({email, password, name}){

        try {

            const userAccount= await this.account.create(ID.unique(),email, password, name);

            if(userAccount){
                //return a function for login
                return this.login({email, password})
            }
            else{
                return userAccount;
            }
            
        } catch (error) {
            console.log("Error on Create Account : ", error)
        }

    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Error on LogIn : ", error)
        }

    }

    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Error on Logout : ", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

}



const authService = new AuthService();

export default authService;