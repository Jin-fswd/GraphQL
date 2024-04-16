"use strict";

import { randomUUID } from "crypto";

export const schema = `
  type Post {
    id: ID!
    title: String!
    content: String!
    tag: Tag!
  }

  input PostCreate {
    title: String!
    content: String!
    tagId: ID!
  }

  input PostUpdate {
    title: String
    content: String
  }

  type Tag {
    id: ID!
    name: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(id: ID!): Post
    getPostByTitle(title: String!): [Post!]!
    getTags: [Tag!]!
    getPostsByTag(tagId: ID!): [Post!]!
  }

  type Mutation {
    createPost(newPost: PostCreate!): Post!
    deletePost(id: ID!): Post
    updatePost(id: ID!, changes: PostUpdate!): Post!
    createTag(name: String!): Tag!
  }
`;

export const resolvers = {
  Query: {
    getPosts: (_parent, args, { app }) => {
      return app.db.posts;
    },
    getPost: (_parent, args, { app }) => {
      const { id } = args;
      return app.db.posts.find((post) => post.id === id);
    },
   
    getPostByTitle: (_parent, args, { app }) => {
      const { title } = args;
      return app.db.posts.filter(post => post.title.includes(title));
    },
    getTags: (_parent, _args, { app }) => {
      return app.db.tags;
    },
    getPostsByTag: (_parent, { tagId }, { app }) => {
      return app.db.posts.filter(post => post.tag && post.tag.id === tagId);
    }
    
  },
  Mutation: {
    createPost: (_parent, { newPost }, { app }) => {
      const { title, content, tagId } = newPost;
      const tag = app.db.tags.find(tag => tag.id === tagId);
      if (!tag) {
        throw new Error("no Tag");
      }
      const post = {
        id: randomUUID(),
        title,
        content,
        tag
      };
      app.db.posts.push(post);
      return post;
    },
    deletePost: (_parent, { id }, { app }) => {
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        return null;
      }
      const deletedPost = app.db.posts.splice(postIndex, 1);
      return deletedPost[0];
    },
    updatePost: (_parent, { id, changes }, { app }) => {
      const postIndex = app.db.posts.findIndex((post) => post.id === id);
      if (postIndex === -1) {
        return null;
      }
      const post = app.db.posts[postIndex];
      const updatedPost = { ...post, ...changes };
      app.db.posts[postIndex] = updatedPost;
      return updatedPost;
    },
    createTag: (_parent, { name }, { app }) => {
      const newTag = {
        id: randomUUID(),
        name
      };
      app.db.tags.push(newTag);
      return newTag;
    }
    
  },
};

export const loaders = {};
