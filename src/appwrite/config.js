import conf from '../conf/conf.js';
import {Client,ID, Databases, Storage, Query} from "appwrite";


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

    async createPost({ title, slug, content, featuredImage, status, userId }){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    user_id: userId,
                    featuredImage,
                    status
                }
            )
        }catch(err){
            console.error("Appwrite createPost failed:", err);
            throw err;
        }
    }
    
    async updatePost(slug, {
                    title,
                    content,
                    featuredImage,
                    status
    }){
        try{
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,{
                title,
                content,
                status,
                featuredImage,

            })
        }catch(err){
            console.error("Appwrite updatePost failed:", err);
            throw err;
        }
        
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true; 
        }catch(err){
            console.log("error appwrite: deletePost: ", err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId, slug)
        }catch(err){
            console.log("error under getPost", err);
        }
    }

    async getPosts(queries = [Query.equal('status',"active")]){
        try{ 
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,conf.appwriteCollectionId, queries
            )
        }catch(err){
            console.log("appwrite error for getposts",err);
            return false;
        }

    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(),file)
        }catch(err){
            console.log("error under uploadFile", err);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
            return true;
        }catch(err){
            console.log("error under deleteFile", err);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
    }

}

const service = new Service()
export default service
