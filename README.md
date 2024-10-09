# Blog API

## Key Features

- **Separated Applications**
  - **2 User Frontends**
  - **An API Backend**
- **JWT User Authentication**
- **Cookies Management**
- **Deploy Management**

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - Prisma (ORM)
  - PostgreSQL (Database)
  - JWT (Authentication)
  - Railway (Deployment)
- **Frontend:**
  - React (Frameworks)
  - Netlify (Deployment)

## Cross Origin Configuration for Local Deployment

**Avoid Request Blocking by CORS Policy:**

- Configure the cors settings as follow to enable most cross-origin requests

```js
app.use(
  cors({
    origin: "http://frontend:url",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

**Include Cookies in Request:**

- Add credentials `true` to allow cookies be included in cross-origin requests.

```js
app.use(
  cors({
    credentials: true,
  })
);
```

```js
await axios.get(`http://someapi:url`, {
  withCredentials: true,
});
```

## Cross Origin Configuration for Remote Deployment

**Backend codes:**

- Railway requires the app to listen on `0.0.0.0` and Port `8080` for proper communication.

```js
app.listen(8080, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}!`);
});
```

- Railway requires setting up `sameSite: 'none'` for cookies to persist.

```js
res.cookie("accessToken", token, {
  sameSite: "none",
  // ...other options
});
```
