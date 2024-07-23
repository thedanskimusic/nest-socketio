# Simple NestJS and Socket.io example

Use the version of Node 
```
nvm use
```

Now install dependencies
```
yarn install
```

Start the project and navigate to http://127.0.0.1:3000 in your browser
```
yarn start
```

To update your name in the chat room, use the command \update-name or \un, eg
```
\update-name Bandit
```

To update your font-color, use the command \update-color or \uc, eg
```
\update-name red
```
Only red, green, blue available; default black

# Includes REST API
This example also demonstrates running a WebSocketServer, Rest API and Static content service, from one server.
eg, http://127.0.0.1:3000/api/test will bypass the static content and use the TestController
This is achieved with the following setup in app.module.ts
```
@Module({
  imports: [
    EventsModule,
    MyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}
```

# Investigating Modules
Include a module, just for the purpose of seeing the difference between creating a module
See the app.modules now includes MyModule.
This module contains its own controllers and services folder, as opposed to running from /src