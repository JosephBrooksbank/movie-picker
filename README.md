# Movie Picker
My friends and I have a semi-weekly movie night. This is a little website as a fun way to vote on what movie to watch next week

# How to run locally
* clone the project
* run `yarn install`
* run `yarn dev`
* website is now running at `localhost:5173`. You'll need to get a TMDB API key and copy `.env.example` to `.env` and fill in the APi key before it'll be useful, though.


## TODO
* ~~consolidate color scheme into css vars, consistency~~
* use stores rather than prop waterfalls
* algorithm for picking next movies to vote on
* (?) connect to mediaserver to find movie automatically
* add 'watched' field to movies
* review what data is being used where for what, consistency
* identify things that can be componentized
* (?) A11y warnings, keyboard navigation
* Don't allow selecting movies 
* Don't show movie posters unless there is an event scheduled