# CatBot

This is an example of a full stack chatbot created with Amazon Lex, Loopback and React.

## Build and Run

Clone the repo and, in the root directory:

```bash
$ npm i
$ npm run build
$ touch .env
```

You'll need to connect to a chatbot built with Lex using your AWS credentials; put those credentials in `./.env`:

```
AWS_access_key_id=<your aws access key id here>
AWS_secret_access_key=<your aws secret access key here>
```

Update `common/models/utterance.js` to reflect your changes; specifically, `botAlias` and `botName` on lines 18-19 must match your bot's values.

Once you have that setup:

```bash
$ node .
```

Your bot should be up and running at localhost:3000.

## How it was made

View the article where I go through the whole process of building this chatbot on [Medium](https://medium.com/@jefferyshivers/create-a-chatbot-with-amazon-lex-loopback-and-react-5d034792b8d).
