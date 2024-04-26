
## Project Setup

```sh
npm install
```

If you have Docker installed you can use 
```sh
docker-compose up -d
```
Create and .env file as example.env. 
If you use the docker container youcan use the same DB_URI, make sure to create motorola-test-db and a users document in it (you can use MOngo COmpass for that)  
###  Development

```sh
npm run dev
```

### Production

```sh
npm run build
```
```sh
npm run start
```
Use a tool like Postman to consume the api:

If running on your localhost baseURl= http://localhost:<YOUR_PORT or 80 by default>

- Register a new User POST `{baseURl}/api/auth/register`, with Body ```{
        usernam:"", email:"", password:""
    }```

- Login  POST `{baseURl}/api/auth/login`, with Body ```{
         email:"", password:""
    }```

- List Users  GET `{baseURl}/api/users`

- Get User by id  GET `{baseURl}/api/users/:id` accessible only With Authentication
- Delete User by id  DELETE `{baseURl}/api/users/:id` accessible only With Authentication a user can only delete himself
- Update User by id  PATCH `{baseURl}/api/users/:id` with Body ```{
        usernam:"", email:"", password:""
    }``` accessible only With Authentication


The deployed version is running on 
Base url `http://18.175.52.244` 