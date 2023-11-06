import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, content, slug, featuredImage, status, userId}) {
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId
            }
        )
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
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
    }

    async deletePost(slug) {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    }

    async getPost(slug) {
        return await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
    }

    async getPosts(query = [Query.equal('status', 'active')]) {
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            query
        )
    }

    async uploadFile(file) {
        return await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
        )
    }

    async deleteFile(fileId) {
        await this.storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    }

    async getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();

export default service;