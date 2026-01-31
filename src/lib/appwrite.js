import { Client, Databases, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client);
export default client;

// Blog CRUD Operations
const BLOGS_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const BLOGS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID || import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const blogOperations = {
  // Get all published blog posts
  async getAllPublishedBlogs() {
    try {
      const response = await databases.listDocuments(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        [
          // Add query to filter only published posts when collection is set up
          // Query.equal('published', true),
          // Query.orderDesc('createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching published blogs:', error);
      throw error;
    }
  },

  // Get all blogs (including drafts) - for admin
  async getAllBlogs() {
    try {
      const response = await databases.listDocuments(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      throw error;
    }
  },

  // Get single blog post by slug
  async getBlogBySlug(slug) {
    try {
      const response = await databases.listDocuments(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        [
          // Query.equal('slug', slug)
        ]
      );
      return response.documents[0] || null;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  },

  // Get single blog post by ID
  async getBlogById(id) {
    try {
      const response = await databases.getDocument(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        id
      );
      return response;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  },

  // Create new blog post
  async createBlog(blogData) {
    try {
      const response = await databases.createDocument(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        'unique()',
        {
          ...blogData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update blog post
  async updateBlog(id, blogData) {
    try {
      const response = await databases.updateDocument(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        id,
        {
          ...blogData,
          updatedAt: new Date().toISOString(),
        }
      );
      return response;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete blog post
  async deleteBlog(id) {
    try {
      await databases.deleteDocument(
        BLOGS_DATABASE_ID,
        BLOGS_COLLECTION_ID,
        id
      );
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
};

