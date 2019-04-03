# Typescript & Node.js

A scaffold to initialize a project with Typescript & Node.js.

## TODO

The below list is for features that will be added in the future.

- Add authentication using JWT
- Add roles & permissions to users
- Add Express request validations
- Add mail with Nodemailer
- Add CRUD example
- Add Web Push to send push notifications

_You're encouraged to contribute to this project by adding new todos and fixing/adding new features from todo list._

## Setup

Copy `src/.env.example.ts` to `src/.env.ts` and fill it using your environment variables.

## Plugins

I strongly recommend you to use **Visual Studio Code** to work with this project because it has been initially developed with it.

To make use of all features I've used to develop this project, you ought to install the **Prettier** and **ES Lint** extensions.

After extrensions installed, you'll need to add some configs to your **settings.json**:

```json
"editor.formatOnSave": true,
"[typescript]": {
  "editor.formatOnSave": false
},
"[typescriptreact]": {
  "editor.formatOnSave": false
},
"eslint.autoFixOnSave": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "typescript",
    "autoFix": true
  },
  {
    "language": "typescriptreact",
    "autoFix": true
  }
]
```

## Run

```bash
$ yarn dev
```

## Build

```bash
$ yarn build
```

## License

MIT
