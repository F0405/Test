# BeesConsole

## Getting started

```bash
# clone the project
git clone -b dev git@github.com:ab-inbev-apac/BeesConsole.git

# enter the project directory
cd BeesConsole

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:8088

## Build

```bash
# build for production environment
npm run build:prod
```


## Setting

1. install extension: ESLint

2. add below script to `setting.json` :
> json path:
>
> win: C:\Users\user\AppData\Roaming\Code\User\settings.json
>
> mac: /Users/USER-NAME/Library/Application Support/Code/User/settings.json


``` bash
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```
