# gatsby-starter-ghost

A starter template to build lightning fast websites with Ghost and Gatsby

Install this starter (assuming Gatsby is installed) by running from your CLI:

```bash
gatsby new gatsby-starter-ghost https://github.com/TryGhost/gatsby-starter-ghost.git
```

## Running in development

For local development, it's easiest to run with a local Ghost installation. Here are the steps:

### 1. Setup local Ghost installation

Install a new local instance of Ghost 👉🏼 https://docs.ghost.org/install/local/

```bash
ghost install local
```

Go through the setup process for the local Ghost installation. Once done, you need to import a
data stub file, which is needed to create the Gatsby schema.

Download this file 👉🏼 [data-stub.json](https://gist.github.com/AileenCGN/172ed94bcd18a328034e0259dbf3e702)
Import via Labs from within your Ghost Admin.

### 2. Clone the starter:

```bash
git clone git@github.com:TryGhost/gatsby-starter-ghost.git
cd gatsby-starter-ghost
yarn
```

### 3. Setup the starter

Copy the existing `.ghost.json.example` and save as `.ghost.json`.
Add the `clientSecret` from your local install

### 4. Run in development

- `yarn dev` or `gatsby develop`

To run the actual production build, you can run
- `yarn build` or `gatsby build`
- `yarn serve` to create production build and serve it on port 9000

Note, that you will need to fill the `production` section in your `.ghost.json` file in order to run a production build.

To check for linting issues, run `yarn lint`.
