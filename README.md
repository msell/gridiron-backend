# gridiron

a [Sails](http://sailsjs.org) application

## heroku
install [heroku toolbelt](https://toolbelt.heroku.com/)
heroku login

heroku git:remote -a rookies

git push heroku master

## environment variables
export GRIDIRON_DB=mongodb://localhost/gridiron

export GRIDIRON_AUTH_SECRET=supersecretpassphrase
## tasks

## broken windows
Using naitive mongo to destroy seed data breaks it in the case that you want to use a different database technology.
Should be able to accomplish the same thing using waterline .destroy()
