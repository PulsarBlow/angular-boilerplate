[![Build Status](https://travis-ci.org/PulsarBlow/angular-boilerplate.svg?branch=master)](https://travis-ci.org/PulsarBlow/angular-boilerplate) [![Gulp.js](http://img.shields.io/badge/built%20with-gulp.js-brightgreen.svg?style=flat-square)](http://gulpjs.com/) 

> A lightweight Angular application boilerplate, stripped to its bare minimum, powered by an optimized build system.
 
## What you get

- A project structure
- A ready to launch [Angular JS](http://angularjs.org) skeleton with [UI Router](http://angular-ui.github.io/ui-router/site)
- An optimized build system based on [Gulp](http://gulpjs.com/)


## Build system

- Lint your javascript files
- Optimize your HTML
- Preprocess and optimize your styles (css, less, sass)
- Optimize your images
- Optimize your fonts
- Auto-reload your changes (HTML, styles, JS) in your browser.

``` gulp ```
will pack a production ready version of your app into the *dist* directory. 

``` gulp serve ```
will serve the development version of your app (app dir)

``` gulp serve:dist ```
will serve the production version of your app (dist dir)

## How to install, use

### Install

###### Manual installation

The easiest method (but least advised), is to grap the [latest release](https://github.com/PulsarBlow/angular-boilerplate/releases/latest) source files and unzip it in a place of your choice.

###### Git installation

This is the prefered method. 
Use git to clone the repository in a directory of your choice. 
By using this method you will be able to fetch and merge futur commits (eg. bug fixes) directly in your project.

1. Start by cloning the repository  
``` git clone https://github.com/pulsarblow/angular-boilerplate MY_APP_NAME``` 

2. Rename the origin remote to upstream. Doing that you'll be able to reuse the origin remote name for your project.
``` git remote rename origin upstream```

### Use

1. Install node and bower packages
``` npm install ```
``` bower install ```

2. Configure your app settings in *app/scripts/app.config.js*

Run your local server and start coding

```gulp serve```


