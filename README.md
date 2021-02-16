
# parakeet-wp

The wrapper for your favourite Wordpress based sites that allows you to view them in one place.

  

## Starting app

1. yarn install (if you are running app for the first time)
2. expo start
3. install expo on your device or start android/ios emulator
4. if you have installed app scan qr code in order to open application
5. if you have started emulator click on "run on android" or "run on ios"

## Essential packages
- Expo
- Redux with redux-thunk (boilerplate without redux toolkit)
- Yarn (to increase performance we are using it instead of npm)
- Axios (makes api requests easier)
- React-native-web, react-native-webview, @formidable-webview/webshell (displaying wordpress posts with scallable webwiev)
- Eslint, husky, lint-staged

## Adding new Packages
### Normal Dependencies
1. Think if we really need it
2. Make research about it (look for alternatives, find pros and cons of using it)
3. Ask admin (@Vendari) if we can use it
4. Install it with `expo install <package name> --yarn`
### Dev dependencies
1. Think if we really need it
2. Make research about it (look for alternatives, find pros and cons of using it)
3. Ask admin (@Vendari) if we can use it
4. Install it with `yarn add <package name> -D`

## Recommended vscode extenstions
- Eslint
- VS Code ES7 React/Redux/React-Native/JS snippets

## How to use redux
-  `import { connect } from 'react-redux';`
- import your desired action from actions folder
- create mapStateToProps function where state is 'main redux object' and then access desired parametes by returning an object with them
- export your component with pattern: `export default connect(mapStateToProps, {<put  your  imported  actions  here>})(<component>);`
- after this you can call your actions with `this.props.<name of action>`
- and you can access your imported from redux state parameters with `this.props.<name of parameter>`
