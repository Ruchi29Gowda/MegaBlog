import { Client,  ID, Databases, Storage, Query} from "appwrite";
import conf from "../conf/conf";

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){

        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId); 
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({title,slug, content, status, featuredImage, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )
        } catch (error) {
            console.log("Error Creating Post : ", error)
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}){

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                } 
            )
        } catch (error) {
            console.log("Error Updating Post : ", error)
        }
    }

    async deletePost(slug){
        try {

            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
            
        } catch (error) {
            console.log("Error Deleting Post : ", error)
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error To Get Post : ", error)
            return false;
        }
    }

    async getpost(query= [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                query
            )
        } catch (error) {
            console.log("Error on Getting Posts : ", error);
            return false;
        }
    }

    async getMyPost({userId}){
        try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('userId', userId)
                ]
            )
            
        } catch (error) {
            console.log("Error on getMyPost: "+error)
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error on Uploading File : ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error on Deleting File : ", error);
            return false;
        }
    }

    previewFile(fileId){
        return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
        )
        
    }
}

const service = new Service();

export default service;