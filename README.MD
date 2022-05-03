we will have to use npm

npm init - to initialize a project

for custom npm do: npm run start-server

for installing 3-rd party packages:
npm install nodemon --save-dev

or-g  = save globally
npm install -g nodemon

npm install = will install all your current packages with the latest version

Express is a library for managing req and res
```
const app = express();

// use allows us to register other middleware functions
// it will be executed for every incoming request
// next - is a function that has to be executed to pass the request to the next middleware
app.use((req, res, next) => {
    console.log("In the middleware!");
    next();
});
```