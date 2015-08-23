# gridiron

a [Sails](http://sailsjs.org) application

## deployment
code pushed to bitbucket master branch will automatically be deployed to azure

## heroku
install [heroku toolbelt](https://toolbelt.heroku.com/)
heroku login

heroku git:remote -a rookies

git push heroku master

## environment variables
export GRIDIRON_DB=mongodb://localhost/gridiron
export GRIDIRON_AUTH_SECRET=8gJ4ruitbBFZEA
## tasks

- create migrations for player / team data

Links for creating seed data:
https://gist.github.com/juanpasolano/5c7596d8629eeeb8debd#file-config-models-js
https://gist.github.com/fernandolguevara/75a2a3edc7e4f3244766

First step, might be to just create your own script, simular to meridian script.
Once fleshed out, consider requiring that script and adding it to bootstrap.js,


test deploy


# Doh!
Need to find a way maybe via Grunt to substitute apiUrl: 'https://rookies.herokuapp.com/', in angular config.  if only we could use the 
same var sails.config.url  .... hmmm