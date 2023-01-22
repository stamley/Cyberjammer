# Cyberjammer

Cyberjammer is an "online-beatmaker" where the user can make beats together with their friends 
using different instruments such as a synth, drums or piano. 

## To-do
 * ~~Make the sequencer work, i.e play the selected notes.~~ 
 * ~~Add other instruments.~~
 * ~~Implement co-operation between users.~~
 * Download the created song.
 * Front end features
   * ~~Backdrop (starry night)~~
   * ~~Nice buttons~~
   * ~~Logotype implementation~~
   * ~~Credits~~
   * ~~Sign in/Registration~~
   * ~~Highlighting active notes~~
   * ~~Clear current beat~~

## Project file-structure
### src
* assets = containing logos, fonts, backdrop and some css classes.
* router/index.js = Initialization and description for the routing of the websites
* Views 
  * views/SynthView.vue = View for the synth.
  * views/ButtonView.vue = 
  * views/DrumView.vue = View for the drums.
  * views/MembranewView.vue = View for the synth.
  * views/SignIn.vue = View for the signing in process.
  * views/RegisterUser.vue = View for the registration process.
  * views/JammerFeed.vue =
* Presenters   
  * presenters/synthPresenter.vue = Presenter for the instruments.
  * presenters/accountPresenter
* App.vue = Creating the synthpresenter and initializing a JammerModel.
* Models
  * firebaseModel = Initialization for the app with firebase as hosting.
  * JammerModel.js = The model for the app containing the business logic and data that other components in the project will have access to. 
* Sounds - containing waw audio files.  
* main.js = Mounts the app 
* remaining files in main folder are purely for configuration aswell as .vscode and .firebase.

## App Setup
 Node js
 ### NPM libraries
  * @babel/core@7.20.5
  * @babel/eslint-parser@7.19.1
  * @vue/cli-plugin-babel@5.0.8
  * @vue/cli-plugin-eslint@5.0.8
  * @vue/cli-service@5.0.8
  * core-js@3.26.1
  * eslint-config-prettier@8.5.0
  * eslint-plugin-prettier@4.2.1
  * eslint-plugin-vue@8.7.1
  * eslint@7.32.0
  * firebase@9.15.0
  * p5@1.5.0
  * prettier@2.8.0
  * tone@14.7.77
  * vue-router@4.1.6
  * vue@3.2.45
### Config files to add
  * babelConfig.js
  * firebaseConfig.js
### At this stage the following command should setup a functional local server:
   * npm run serve
### Link to currently deployed app-version 
https://cyberjammer-40b7c.web.app/feed
