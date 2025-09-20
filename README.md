# postAnote
[Live Demo](https://postanote.onrender.com/log-in)

postAnote is a simple social posting web application built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **EJS**. Users can sign up, log in, and share posts. Some features are exclusive to club members.  

---

## Features

- **User Authentication**
  - Users can **sign up** and **log in** securely.
  - **Logout** functionality to end the session.

- **Posting**
  - Users can **create posts** with a title and description.
  - Posts are visible to all users.

- **Club Membership**
  - Only **club members** can see the **author** and **timestamp** of each post.
  - To become a club member, users must enter the **secret passcode**: `topoftheworld`.
  - Non-members see only the post content without author information.

- **User Profile**
  - View personal information: name, username, and membership status.
  - Option to join the club (if not already a member).

- **Security & Validation**
  - Form inputs are **validated and sanitized**.
  - Passwords are securely hashed using **bcrypt**.

---

## Technologies Used

- Node.js & Express  
- TypeScript  
- PostgreSQL  
- EJS Templating Engine  
- Passport.js (for authentication)  
- Express-Validator (for validation & sanitization)  
- Express-Session & Connect-PG-Simple (for session management)  

---

## Club Membership

- Secret passcode required: **`topoftheworld`**  
- Provides additional access to post metadata (author & time).  

---

## Running the App

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd postAnote
   ```
2. Install Dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables in a .env file:
   ```bash
    DATABASE_URL=<your-postgres-connection-string>
    SESSION_SECRET=<your-session-secret>
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to:
   ```bash
    http://localhost:3000
   ```


