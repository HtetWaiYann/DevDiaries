# DevDiaries
DevDiaries is a platform to create blogs and articles. This project uses Node.js, Express and MySql. It uses Typescript instead of Javascript.

## Folder Structure
All the resoures are under the src foler. 
- api (routing)
- common (common functions)
- config
- interfaces
- loaders (server starter files)
- models (database models)
- sequelize (Sequelize set up)
- services (controllers)
- app.ts (main)


## How to run
Clone the repository and install dependencies.
```
npm i
```

Change the MySql config under src/config. Then run 

```
npm run
```

## How to test
You can find the test files under the test folder. Jest is used for testing in this project.
```
npm run test
```
