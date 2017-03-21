<a href="https://gitfolio-f2c18.firebaseapp.com/">
  <img src="public/img/gitfolio-logo.png" height="61" width="143" />  
</a>

# What?

**[gitfolio](https://gitfolio-f2c18.firebaseapp.com/) bootstraps a simple one-page portfolio**, based on your github data.  


# How does it look like?

<a href="http://image.prntscr.com/image/4ab8317e755841b08d5c7edf8ff20002.png">
  <img src="http://image.prntscr.com/image/4ab8317e755841b08d5c7edf8ff20002.png" />
</a>

I wanted this to keep this dead-simple and easy to read. Hope it looks good to you as well!  


# Can I edit it?

This project comes with a few blocks for now, and most of them customizable. You can't reorganize the blocks order, **yet**, neither add ones using the interface.  

The main missing feature here would be a way to change the project's primary/secondary colors — I still pray, waiting for an amazing contributor who'd like to help me on this.


# How to start building?

`npm run start` will launch the development server, `npm run build` will update the `build` folder with a static version of the project.  
> Note: I didn't figure out how to generate a separate css file for every .scss file in this project using webpack.
Here's the reason why you must have noticed the gulp build file. **After building the project, you'll need to manually include a `link` tag for the `/build/static/css/all.min.css` stylesheet inside the `head` part of `index.html`.**
