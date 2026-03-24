import conf from "../conf/conf";
import {ID,Client,Databases,Storage,Query} from 'appwrite'
 
export  class Service{
    client=new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setProject(conf.appwriteProjectId)
        .setEndpoint(conf.appwriteUrl)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    async createPost({title,slug,content,featuredImage,status,userId}){
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
            console.log(error)
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite :: UpdatePost:: error",error)
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
             )
             return true
        } catch (error) {
            console.log("Appwrite::delete post:: error",error)
            return false
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
            
        }
    }
    async getPosts(quries=[Query.equal("status","active")]){
        try {
           return  await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quries
            )
            
        } catch (error) { 
            console.log("Appwrite:: Get Posts :: Error",error)
            return false
        }
    }
    //UPload file
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return true
        } catch (error) {
            console.log("Appwrite :: UploadFile :: Error",error);
            
        }
    }
    async DeleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId)
                return true
        } catch (error) {
            console.log("appwrite :: delete file :: error",error)
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )
    }
}
const service=new Service()
export default service;

