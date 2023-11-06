import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({name, email, password}) {
        const userAccount = await this.account.create(ID.unique, email, password, name);
        if( userAccount ) {
            this.login({email, password});
        } else {
            return userAccount;
        }
    }

    async login({email, password}) {
        return this.account.createEmailSession(email, password);
    }

    async getCurrentUser() {
        return await this.account.get();
    }

    async logout() {
        await this.account.deleteSessions();
    }

}

const authService = new AuthService;

export default authService;