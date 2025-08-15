# RausNews24X7

**Your 24x7 News Posting & Review Platform**  
A full-stack web app for posting, browsing, and reviewing news articles with images, videos, and documents.

---

## Description

RausNews24X7 is a modern news platform where users can post news articles, attach media, browse by category, and leave reviews.  
It exists to provide a simple, interactive, and community-driven space for sharing and discussing news.

---

## Features

- **User Authentication:** Sign up, log in, and log out using Passport.js and sessions.
- **News Posting:** Authenticated users can create, edit, and delete news posts with images, videos, PDFs, or document attachments (uploaded to Cloudinary).
- **News Browsing:** Browse all news or filter by categories such as Trending, Entertainment, Sports, Technology, etc.
- **Reviews:** Authenticated users can leave reviews (with ratings and comments) on news posts. Owners can delete reviews.
- **Responsive UI:** Built with Bootstrap 5 and custom CSS for a modern, mobile-friendly interface.
- **Flash Messages:** Success, error, and delete messages are displayed using connect-flash.
- **SEO:** Includes `sitemap.xml` and `robots.txt` for search engine optimization.
- **Session Storage:** Sessions are stored in MongoDB using connect-mongo.
- **File Uploads:** Uses Multer and Cloudinary for secure file uploads.
- **Validation:** Joi is used for server-side validation of news and reviews.
- **Error Handling:** Centralized error handling for robust UX.

---


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Contributing](#contributing)
- [Contact](#contact)
- [Screenshots / Demo](#screenshots--demo)

---


## Project Structure

```
.
├── app.js
├── cloud_config.js
├── middleware.js
├── package.json
├── schema.js
├── controllers/
│   ├── news.js
│   ├── reviews.js
│   └── users.js
├── init/
│   ├── data.js
│   └── index.js
├── models/
│   ├── news.js
│   ├── newsReview.js
│   └── user.js
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── logos/
├── routes/
│   ├── news.js
│   ├── review.js
│   └── user.js
├── utils/
│   ├── expressErrors.js
│   └── wrapAsync.js
└── views/
    ├── includes/
    ├── layouts/
    ├── newsfiles/
    └── Users/
```


## Installation

**Requirements:**
- Node.js (v20+)
- MongoDB (local or Atlas)
- Cloudinary account

**Steps:**
1. Clone the repository:
   ```sh
   git clone https://github.com/CoderRaushan/RausNews24x7.git
   cd RausNews24X7
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```
   ATLASDB_URL=<your-mongodb-url>
   SECRET=<your-session-secret>
   CLOUD_NAME=<your-cloudinary-cloud-name>
   API_KEY=<your-cloudinary-api-key>
   SECRET_KEY=<your-cloudinary-api-secret>
   ```
4. (Optional) Seed the database:
   ```sh
   node init/index.js
   ```
5. Start the server:
   ```sh
   npm start
   ```
   Visit [http://localhost:8890](http://localhost:8890) in your browser.

---

## Usage

- **Home Page:** `/news` — View all news posts.
- **Sign Up:** `/signup` — Register a new user.
- **Log In:** `/login` — Log in to your account.
- **Post News:** `/news/new` — Create a new news post (must be logged in).
- **Edit News:** `/news/:id/edit` — Edit your own news post.
- **Delete News:** `/news/:id` (DELETE) — Delete your own news post.
- **View News:** `/news/:id` — View a single news post and its reviews.
- **Leave Review:** `/news/:id/reviews` — Post a review (must be logged in).
- **Delete Review:** `/news/:id/reviews/:reviewId` (DELETE) — Delete your own review.
- **Category Filters:** `/news/<Category>` — Filter news by category (e.g., `/news/Technology`).

---

## Features

- User registration & authentication
- News posting with media uploads (images, videos, docs)
- Category-based browsing
- Review system (ratings & comments)
- Edit/delete own posts and reviews
- Responsive Bootstrap UI
- SEO: sitemap.xml & robots.txt

---

## File Uploads

- Images, videos, PDFs, and documents are uploaded to Cloudinary.
- Supported formats: png, jpg, jpeg, webp, avif, gif, svg, mp4, mp3, docx, doc, xlsx, xls, ppt, pptx.

---


## Customization

- **Categories:** To add or remove news categories, update the `category` enum in [`models/news.js`](models/news.js) and the category list in the EJS forms.
- **Styling:** Modify [`public/css/style.css`](public/css/style.css) for custom styles.
- **Footer & Navbar:** Edit [`views/includes/footer.ejs`](views/includes/footer.ejs) and [`views/includes/navbar.ejs`](views/includes/navbar.ejs).

---

## Important Files

- **Main App:** [`app.js`](app.js)
- **News Model:** [`models/news.js`](models/news.js)
- **User Model:** [`models/user.js`](models/user.js)
- **Review Model:** [`models/newsReview.js`](models/newsReview.js)
- **Routes:** [`routes/news.js`](routes/news.js), [`routes/review.js`](routes/review.js), [`routes/user.js`](routes/user.js)
- **Controllers:** [`controllers/news.js`](controllers/news.js), [`controllers/reviews.js`](controllers/reviews.js), [`controllers/users.js`](controllers/users.js)
- **Views:** [`views/newsfiles/`](views/newsfiles/), [`views/Users/`](views/Users/)
- **Cloudinary Config:** [`cloud_config.js`](cloud_config.js)
- **Validation Schema:** [`schema.js`](schema.js)
- **Error Handling:** [`utils/expressErrors.js`](utils/expressErrors.js)

---

## Author

- [Raushan Kumar](https://github.com/CoderRaushan)

---

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Passport.js](http://www.passportjs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [Cloudinary](https://cloudinary.com/)
- [EJS](https://ejs.co/)
- [Font Awesome](https://fontawesome.com/)

## Technology Stack

- **Languages:** JavaScript (Node.js)
- **Backend:** Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5, CSS
- **Authentication:** Passport.js
- **File Uploads:** Multer, Cloudinary
- **Validation:** Joi
- **Session Storage:** connect-mongo
- **Other:** dotenv, connect-flash

---


## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

**Code Style:**  
- Use consistent indentation (2 or 4 spaces).
- Write clear commit messages.
- Follow existing file and folder structure.

---

## Contact

**Author:** Raushan Kumar  
- GitHub: [CoderRaushan](https://github.com/CoderRaushan)
- Email: raushankumar23082004@gmail.com
- LinkedIn: (https://www.linkedin.com/in/raushan-kumar-964a75255/)

---

## Screenshots / Demo

![Home Page](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Home.png)
![Register](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Signup.png)
![Login](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Signin.png)
![Create Post](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Create.png)
![Show Post](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Show.png)
![Review Post](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Review.png)
![News Category](https://github.com/CoderRaushan/RausNews24x7/blob/main/public/photos/Category.png)

<!-- Add your own screenshots in the public/screenshots/ folder and update the paths above
