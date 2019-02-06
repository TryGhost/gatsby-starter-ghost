import PropTypes from 'prop-types'
import React from 'react'
import Img from 'gatsby-image'
import MobiledocReactRenderer from '@dailybeast/mobiledoc-react-renderer'

// const mobiledoc = { version: `0.3.1`,atoms: [],cards: [[`image`,{ src: `https://gatsby.ghost.io/content/images/2019/01/headless-ghost.png`,alt: ``,title: `` }],[`image`,{ src: `https://gatsby.ghost.io/content/images/2019/01/ghost-jamstack.png`,alt: ``,title: `` }]],markups: [[`a`,[`href`,`https://gatsbyjs.org`]],[`a`,[`href`,`https://jamstack.org`]],[`strong`],[`a`,[`href`,`https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/`]],[`a`,[`href`,`https://docs.ghost.org`]],[`a`,[`href`,`https://github.com/tryghost/gatsby-source-ghost`]],[`a`,[`href`,`https://github.com/tryghost/gatsby-starter-ghost`]],[`a`,[`href`,`https://docs.ghost.org/api/gatsby/`]],[`a`,[`href`,`https://docs.ghost.org/integrations/netlify/`]]],sections: [[1,`p`,[[0,[],0,`Use Ghost as a completely decoupled headless CMS and bring your own front-end written in `],[0,[0],1,`Gatsby.js`]]],[1,`h2`,[[0,[],0,`Build an API driven static-site`]]],[1,`p`,[[0,[],0,`There has been a lot of progress around static site generators, front end frameworks and API-centric infrastructure in recent years, which has generated some very cool products, like Gatsby. Since Ghost allows you to completely replace its default Handlebars theme layer in favour of a front-end framework, you can use Gatsby to build your site statically from the Ghost API.`]]],[10,0],[1,`h2`,[[0,[],0,`The headless-cms revolution`]]],[1,`p`,[[0,[],0,`Using a static site generator usually involves storing Markdown files locally in the code repository. This would involve using a code editor to write content and a GIT workflow to publish - which works fine for small sites or developers. However, it's not ideal for professional publishers that need to scale. This is where a headless CMS comes in!`]]],[1,`p`,[[0,[],0,`Instead, you can use Ghost for authoring, and then build out your front-end in Gatsby to pull content from the Ghost API. This provides several benefits for publishers: `]]],[3,`ul`,[[[0,[],0,`Developers can use their preferred stack`]],[[0,[],0,`Writers have their preferred editor & content management`]],[[0,[],0,`Performance is the maximum possible `]],[[0,[],0,`Security is the maximum possible `]],[[0,[],0,`Your site will be extremely scalable `]]]],[1,`p`,[[0,[],0,`Building sites in this way has become known as the `],[0,[1],1,`JAMstack`],[0,[],0,` - (as in `],[0,[2],1,`J`],[0,[],0,`avaScript, `],[0,[2],1,`A`],[0,[],0,`PIs, `],[0,[2],1,`M`],[0,[],0,`arkup). When you look at the bigger picture of `],[0,[3],1,`the content mesh`],[0,[],0,`, it really starts to feel like an inevitable future for building websites. `]]],[1,`h2`,[[0,[],0,`Official Gatsby.js Source Plugin + Starter`]]],[1,`p`,[[0,[],0,`We rebuilt our entire `],[0,[4],1,`Ghost Docs`],[0,[],0,` site with a front-end written in `],[0,[0],1,`Gatsby.js`],[0,[],0,` - which is a great example of what can be achieved with Ghost and Gatsby in the wild. We also shipped a few things to help others build their own sites using the same stack: `]]],[1,`h3`,[[0,[],0,`⚡ `],[0,[5],1,`gatsby-source-ghost`],[0,[],0,` plugin`]]],[1,`p`,[[0,[],0,`A straightforward Gatsby source plugin which wraps the Ghost API and makes it compatible with Gatsby and GraphQL, so it's quick and easy to load all your Ghost data into any Gatsby project.`]]],[1,`h3`,[[0,[],0,`⚡ `],[0,[6],1,`gatsby-starter-ghost`],[0,[],0,` `]]],[1,`p`,[[0,[],0,`An official `],[0,[6],1,`Gatsby starter repository`],[0,[],0,` which is pre-configured to get content from Ghost and output it in a clean, blog-style design. The fastest way to get up and running with Gatsby and Ghost is to fork this repository, and check out our `],[0,[7],1,`Gatsby docs`],[0,[],0,`.`]]],[1,`h2`,[[0,[],0,`Official Netlify Support`]]],[1,`p`,[[0,[],0,`Deploying a static site with Gatsby and Ghost should be easy - so we've partnered with Netlify, which we also use for Ghost Docs: `]]],[1,`h3`,[[0,[],0,`⚡`],[0,[8],1,`Netlify integration for Ghost`],[0,[],0,` `]]],[1,`p`,[[0,[],0,`The official integration guide for Netlify explains how to set up outgoing webhooks in Ghost to trigger a site rebuild on Netlify. This means that any time you publish, update or remove any content in Ghost, the front end will update.`]]],[1,`h2`,[[0,[],0,`Future-proof publishing`]]],[1,`p`,[[0,[],0,`Converging disparate technologies under a single front-end centralises otherwise decentralised services in a way which caters predominantly to the needs of the site owner, rather than the platform and fosters flexibility and scalability. `]]],[10,1],[1,`p`,[[0,[],0,`No more platform-specific plugins and extensions. Just one front-end, and many APIs; all connected together and served as a single site or application with Gatsby!`]]]] }

const image = {
    name: `image`,
    type: `html`,
    render({ payload }) {


        if (payload.imageNode.childImageSharp){
            return <Img fluid={payload.imageNode.childImageSharp.fluid} alt={ payload.alt }/>
        } else {
            return <img src={payload.imageNode.publicURL} alt={ payload.alt }/>
        }
    },
}
const code = {
    name: `code`,
    type: `html`,
    render({ payload }){
        return <pre>
            <code>{payload.code}</code>
        </pre>
    },
}

class Mobiledoc extends React.Component {
  static propTypes = {
      mobiledoc: PropTypes.string.isRequired,
      files: PropTypes.object.isRequired,
  };

  constructor(props) {
      super(props)

      const options = { atoms: [], cards: [image, code], markups: [] }

      this.renderer = new MobiledocReactRenderer(options)
  }

  render() {
      const mobiledoc = JSON.parse(this.props.mobiledoc)
      const files = this.props.files

      mobiledoc.cards.map(async (card) => {

          if (card[0] === `image`){
              function findFile(element) {
                  return element.node.id === card[1].imageNode
              }
              const i = await files.findIndex(findFile)


              const imageNode = files[i]

              if (imageNode){
                  card[1].imageNode = imageNode.node
              }
          }
          return card
      })

      return this.renderer.render(mobiledoc)
  }
}

export default Mobiledoc
