<a href="https://flotiq.com/">
    <img src="https://editor.flotiq.com/fonts/fq-logo.svg" alt="Flotiq logo" title="Flotiq" align="right" height="60" />
</a>

Gatsby Starter - Recipes
========================

This is a [Gatsby](https://gatsbyjs.org) starter project for a recipes website. It's configured to pull recipe data from [Flotiq](https://flotiq.com) and can be easily deployed to your cloud hosting - Heroku, Netlify, Gatsby Cloud, etc.

Live Demo: https://flotiq-starter-recipes.herokuapp.com

Screenshot

<img src="https://github.com/flotiq/gatsby-starter-recipes/raw/master/docs/flotiq-starter-recipes.png" width=480 />

## Quick start

1. **Start project from template using Gatsby CLI**
    
    ```bash
    gatsby new gatsby-starter-recipes https://github.com/flotiq/gatsby-starter-recipes.git
    ```
1. **Setup "Recipe" Content Type in Flotiq**

   Create your [Flotiq.com](https://flotiq.com) account. Next, create the `Recipe` Content Type:

   ![Recipe content type in flotiq](docs/create-definition-recipe.png)
    
   _Note: You can also create `Recipe` using [Flotiq REST API](https://flotiq.com/docs/API/)._ 

1. **Configure application**

    The next step is to configure our application to know from where it has to fetch the data.
       
    You need to create a file called `.env` inside the root of the directory, with the following structure:

    ```
    GATSBY_FLOTIQ_BASE_URL=https://api.flotiq.com
    FLOTIQ_API_KEY=YOUR FLOTIQ API KEY
    ```

1.  **Start developing**

    Navigate into your new site’s directory and start it up.

    ```sh
    cd gatsby-starter-recipes
    npm install
    gatsby develop
    ```
    
    If you wish to import example recipes to your account, before running `gatsby develop` run:
    
    ```sh
    node ./example/importExample.js
    ```
    
    It will add 4 images and 2 recipes to your Flotiq account.
    
    _Note: You need to put your Read and write API key in `.env` for import to work. You don't need Recipe content type in your account. If you already have recipes with ids `recipe-1` and `recipe-2` they will be overwritten._
   
1.  **Open the source code and start editing!**
    
    Your site is now running at [http://localhost:8000](http://localhost:8000)!
    
    _Note: You'll also see a second link: _[http://localhost:8000/___graphql](http://localhost:8000/___graphql)`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._
    
    Open a project directory in your code editor of choice and edit `src/templates/index.js`. Save your changes and the browser will update in real time!

1. **Manage your recipes using Flotiq editor**
      
    You can now easily manage your recipes using [Flotiq editor](https://editor.flotiq.com)
    
    ![Managing recipes using Flotiq](docs/manage-recipes.png)

## Deploy

  You can deploy this project to Heroku in 3 minutes:

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/flotiq/gatsby-starter-recipes)
  
  Or to Netlify:
  
  [![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/flotiq/gatsby-starter-recipes)
  
## Collaborating

   If you wish to to talk with us about this project, feel free to hop on our [discord server](https://discord.gg/FwXcHnX).
   
   If you found a bug, please report it in [issues](https://github.com/flotiq/gatsby-starter-recipes/issues).
