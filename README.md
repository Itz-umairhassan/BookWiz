# BookWiz Application 📚✨

BookWiz is a web application built with Express.js and React.js that allows users to manage folders and files, upload books, search public folders, clone folders locally, and chat with books.

## Features 🚀

1. **Folder and File Management**: Users can create folders and upload files within those folders. Folders and files can be managed, including renaming and deleting.

2. **Public Folder Search and Cloning**: Users can search public folders created by other users. Public folders can be cloned locally to the user's account.

3. **Book Management**: Users can upload books to the application. Uploaded books can be deleted when no longer needed.

4. **Book Chat and Training**: Users can chat with books that have been uploaded. One-time uploading is required to enable chat and training features.

## Technology Stack 🛠️

- **Frontend**:
  - Built with React.js, providing a responsive and interactive user interface.
  - Uses state management with Redux for centralized state management.

- **Backend**:
  - Developed using Express.js, providing robust and scalable API endpoints.
  - Utilizes MongoDB for storing folders, files, books, and user data.
  - Authentication and authorization handled with JWT tokens.

- **Database**:
  - MongoDB for storing structured data, including user information, folders, files, and books.

## Prerequisites 📋

- Node.js
- MongoDB
- npm or yarn
- React Js

## Installation 🔧

1. **Clone the repository**:
   ```bash
   git clone git@github.com:umair-hassan2/BookWiz.git
   cd BookWiz
2. **install dependencies**
   ```bash
   npm install
   cd client
   npm install
3. **run server**
   ```bash
   npm run
   cd client
   npm run dev
4. **test servers**
   - visit link in broswer to test the application
   - send request to 'localhost:3001/api/user/test' to check backend
