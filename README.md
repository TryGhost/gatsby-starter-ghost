# Gatsby Starter Ghost

A starter template to build lightning fast websites with [Ghost](https://ghost.org) & [Gatsby](https://gatsbyjs.org), based on [TryGhost/gatsby-starter-ghost](https://github.com/TryGhost/gatsby-starter-ghost).

This tutorial will guide you through the process of deploying and hosting a [Ghost CMS](https://ghost.org/) with [Gatsby](https://www.gatsbyjs.org/) front-end using the serverless approach.

> If you're completely new to Stackery, you may want to start with a smaller stack like any of the [Quickstarts](quickstart/quickstart-nodejs.md)

## What We're Building

By the end of the tutorial, you will have deployed into your AWS account:
* An AWS Fargate ECS cluster, service, and [Docker Task](api/nodes/DockerTask.md) for the Ghost CMS
* An AWS API Gateway HTTP API in front of the Ghost CMS service, using Cloud Map service discovery
* An AWS Aurora MySql Serverless [Database](api/nodes/Database.md) behind the Ghost CMS service
* An AWS EFS filesystem for persistent storage of images plus SQLite instead of Aurora in non-prod environments
* An AWS CodeBuild Project for Gatsby as a [Website Builder](api/nodes/Website.md)
* The Amazon S3 Bucket for Gatsby content to serve as a CDN origin [Object Store](api/nodes/ObjectStore.md)
* An Amazon CloudFront distribution that delivers your static web content to users quickly and securely as a [CDN](api/nodes/CDN.md)
* A Lambda [EdgeFunction](api/nodes/EdgeFunction.md) to assert secure headers in requests to CloudFront

You can deploy the whole infrastructure in minutes, resulting in a fully functional CMS-sourced static site available through a CDN. Custom domain support & email service integration are optional, but possible to add to this template. 

> __This stack is designed to be minimal but it's more than a hello world stack. Meaningful monthly AWS fees may apply. We suggest deploying for a while, have fun with the possibilities of the Serverless JAMstack, but don't forget to delete the CloudFormation stack when you're done and consider the long-term costs with https://calculator.aws__
>
> The brilliant thing about this architecture is that the relatively more costly Ghost infrastructure is only necessary when you're editing or building content. Once a build is delivered to the CDN, Ghost could be shut down. 

### Ghost CMS Architecture

Feel free to play around:

<iframe
  id='canvas'
  class='canvas'
  title='Stackery canvas of AWS SAM template'
  width='100%'
  height='500'
  frameBorder='0'
  src='https://app.stackery.io/editor/design?owner=stackery&repo=gatsby-starter-ghost&file=template.yaml'>
</iframe>

<br>

This stack demonstrates how to integrate a plethora of cloud-native managed services from AWS to run a mixed container and function architecture. It results in a fully-functional Ghost CMS site, backed by serverless MySQL or SQLite using ECS Fargate integrated with EFS and Cloud Map. AWS SAM and CloudFormation can deploy this infrastructure-as-code and there are zero servers to manage once it's running. 

### Gatsby Front-end Architecture

<iframe
  id='canvas'
  class='canvas'
  title='Stackery canvas of SAM template'
  width='100%'
  height='500'
  frameBorder='0'
  src='https://app.stackery.io/editor/design?owner=stackery&repo=gatsby-starter-ghost&file=gatsbyTemplate.yaml'>
</iframe>

This tutorial also deploys a second stack, a Gatsby static site with data sourced from the Ghost stack and deployed to a CDN via a CodeBuild job. 

## Setup

### Project Repository

The following repository is referenced throughout this tutorial:

- [Gatsby Starter - Ghost, with AWS SAM templates](https://github.com/stackery/gatsby-starter-ghost)

### Requirements and Assumptions

This guide makes the following assumptions:

- [Sign up](https://app.stackery.io/sign-up) for a Stackery account if you haven't already. 
- A Stackery environment named 'development' linked to an AWS account of your choosing. You can adjust the named environment in the `stackery deploy` commands provided, or by using the Web UI 
- The templates provided will create AWS infrastructure in your default VPC and default ECS Fargate cluster, etc.  

If you want to customize your Gatsby front-end, install the [Gatsby CLI](https://www.gatsbyjs.org/docs/quick-start#use-the-gatsby-cli) for local development but you can deploy a functional blog with content sourced from the Ghost CMS without it. 

### Deploy Ghost CMS

You can deploy each example stack into your own AWS account using these Stackery CLI commands or you can use the [Stackery Web UI](using-stackery/dashboard.md):

`stackery login` will authenticate your CLI to Stackery for use in the following commands. 


`stackery create` will initialize a new repo in your GitHub account, initializing it with the contents of the referenced blueprint repository.

```text
stackery create --stack-name 'jamstack-ghost' \
--git-provider 'github' \
--blueprint-git-url 'https://github.com/stackery/gatsby-starter-ghost'
```

`stackery deploy` will deploy the newly created stack into your AWS account.

```text
stackery deploy --stack-name 'jamstack-ghost' \
--env-name 'development' \
--git-ref 'master'
```

### Provide Ghost CMS API Details to Stackery Environments

Once deployed, you can visit the Ghost admin instance via the HTTP API URL provided by `stackery deploy` or view the ghostProxy resource in your deployment via https://app.stackery.io/deployments. It will look like https://i82w1gfu65.execute-api.us-west-2.amazonaws.com/ghost

> Known issue: The "🏠 View site" interface in Ghost's admin portal is not configured and will not work. 

If you want to go further and build a static Gatsby site from your Ghost blog:
* Generate an API token in the /ghost admin portal
* Note the fully qualified URL to your Ghost instance, e.g. https://i82w1gfu65.execute-api.us-west-2.amazonaws.com/
* Add this data as [Stackery Environment parameter data](https://docs.stackery.io/docs/using-stackery/environments/) for the Ghost stack to use when it deploys.  

Once you've signed up for the admin account, navigate to '/ghost/#/settings/integrations'. Here you'll add a custom integration named Gatsby. You'll want to retrieve the 'Content API Key' and 'API URL' which you'll use to create environment data similar to the following example. 

```code
{ 
"ghostApiUrl": "E.g. https://i82w1gfu65.execute-api.us-west-2.amazonaws.com/",
"ghostContentApiKey": "E.g. 4f784f0ae540569a0cc4f21c97"
}
```

Once saved into your Stackery environment, you can create and deploy the Gatsby stack. 

### Deploy Gatsby into CloudFront

`stackery create` will initialize a new repo in your GitHub account, initializing it with the contents of the referenced blueprint repository.

```text
stackery create --stack-name 'jamstack-gatsby' \
--git-provider 'github' \
--blueprint-git-url 'https://github.com/stackery/gatsby-starter-ghost'
```

`stackery settings` will adjust the created stack to reference the appropriate template from the repository. 

```text
stackery settings -n jamstack-gatsby --key templatePath --value gatsbyTemplate.yaml
```

`stackery deploy` will deploy the newly created stack into your AWS account.

```text
stackery deploy --stack-name 'jamstack-gatsby' \
--env-name 'development' \
--git-ref 'master'
```

The Website Builder resource in this stack will connect the Gatsby static site generator to the Ghost CMS, source content from it, and deliver that built content to an S3 bucket which serves as a CloudFront origin. 

### Next Steps

That's it! You're all done. At this point you can edit/add content in Ghost CMS, log into CodeBuild and re-run the stack-provisioned job to rebuild your site. Future revisions of this stack could include a webhook to automatically rebuild Gatsby when Ghost changes. 

A future update of this guide will break down the template into step-by-step explanations but you can reach us via the in-app chat to learn more about this stack and get advice on how create your own serverless infrastructure. 