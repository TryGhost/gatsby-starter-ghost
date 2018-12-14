# Gastby Starter Ghost

A starter template to build lightning fast websites with [Ghost](https://ghost.org) & [Gatsby](https://gatsbyjs.org)


## Installing

```bash
# With Gatsby CLI
gatsby new gatsby-starter-ghost https://github.com/TryGhost/gatsby-starter-ghost.git
```

```bash
# From Source
git clone git@github.com:TryGhost/gatsby-starter-ghost.git
cd gatsby-starter-ghost
```

Then install dependencies

```bash
yarn
```


## Running 

Start the development server. You now have a Gatsby site pulling content from headless Ghost.

```bash
gatsby develop
```

By default, the starter will populate content from a default Ghost install located at https://gatsby.ghost.io.

To use your own install, edit the `.ghost.json` config file with your credentials. You can find your `clientSecret` by viewing source of your Ghost homepage, located in the `<head>`.

Because of how Gatsby/GraphQL work, at least 1 copy of every object/field must exist in Ghost for things to function correctly. That means you must have at least 1 post, author, tag, etc - with every single field populated - for the queries to work properly.

As a shortcut, you can download and import this 👉🏼 [data-stub.json](https://gist.github.com/AileenCGN/172ed94bcd18a328034e0259dbf3e702) - which will automatically populate all the required fields, and then be excluded from the Gatsby build.


## Optimising

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Gatsby front-end becomes the source of truth for SEO. 


## Extra options

```bash
# Run a production build, locally
gatsby build

# Serve a production build, locally
gatsby serve
```

Gatsby `develop` uses the `dev` config in `ghost.json` - while Gatsby `serve` uses the `production` config. 


# Copyright & License

Copyright (c) 2013-2018 Ghost Foundation - Released under the [MIT license](LICENSE).
