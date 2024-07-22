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

# Includes REST API
This example also demonstrates running a WebSocketServer, Rest API and Static content service, from one server.
eg, http://127.0.0.1:3000/api/test will bypass the static content and use the TestController
This is achieved with the following setup in app.module.ts
```
@Module({
  imports: [
    EventsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
  ],
  controllers: [TestController],
  providers: [UserSocketService]
})
export class AppModule {}
```
