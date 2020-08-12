---
title: Ghost CMS with Gatsby JAMstack
id: jamstack-ghostgatsby
---

This tutorial will guide you through the process of deploying and hosting a [Ghost CMS](https://ghost.org/) with [Gatsby](https://www.gatsbyjs.org/) front-end using the serverless approach.

## What We're Building

By the end of the tutorial, you will have deployed into your AWS account:
* An AWS Fargate ECS cluster, service, and [Docker Task](api/nodes/DockerTask.md) for the Ghost CMS
* An AWS ELB application load balancer in front of the Ghost CMS service
* An AWS Aurora MySql Serverless [Database](api/nodes/Database.md) behind the Ghost CMS service
* An AWS CodeBuild Project for Gatsby as a [Website Builder](api/nodes/Website.md)
* The Amazon S3 Bucket for Gatsby content to serve as a CDN origin [Object Store](api/nodes/ObjectStore.md)
* An Amazon CloudFront distribution that delivers your static web content to users quickly and securely as a [CDN](api/nodes/CDN.md)
* A Lambda [EdgeFunction](api/nodes/EdgeFunction.md) to assert secure headers in requests to CloudFront

You can deploy the whole infrastructure in minutes, resulting in a fully functional CMS-sourced static site available through a CDN. Modest template additions for a custom domain and ssl certificates are missing but otherwise this architecture suitable for real workloads. 

> __These are intricate stacks and more than the hello world template. Meaningful AWS fees may apply. We suggest deploying them for an hour to have fun with the possibilities of the Serverless JAMstack, but don't forget to delete the CloudFormation stack before considering the long-term costs with https://calculator.aws__
>
> The brilliant thing about this architecture is that the expensive Ghost infrastructure is only necessary when you're editing or building content. Once a build is delivered to the CDN, Ghost could be shut down. 

### Ghost CMS Architecture

Feel free to play around:

<iframe id='canvas'
  title='Stackery canvas of AWS SAM template'
  width='100%'
  height='500'
  frameBorder='0'
  src='https://app.stackery.io/editor/design?owner=ryanycoleman&repo=gatsby-starter-ghost&file=ghostTemplate.yaml'>
</iframe>

<br>
This stack provides the Ghost CMS web client and API through an Elastic Load Balancer. It's a heavyweight stack by serverless tutorial standards, providing a load-balanced container service and MySQL cluster. Because we're using AWS managed services, AWS SAM, and CloudFormation, everything can be replicated as infrastructure-as-code and there are zero servers to manage. 

### Gatsby Front-end Architecture

<iframe id='canvas'
  title='Stackery canvas of SAM template'
  width='100%'
  height='500'
  frameBorder='0'
  src='https://app.stackery.io/editor/design?owner=ryanycoleman&repo=gatsby-starter-ghost&file=gatsbyTemplate.yaml'>
</iframe>


## Setup

### Project Repository

The following repository is referenced throughout this tutorial:

- <a href="https://github.com/ryanycoleman/gatsby-starter-ghost" target="_blank" alt="GitHub repository">Gatsby Starter - Ghost, with AWS SAM templates</a>

### Requirements and Assumptions

The following software is used in this tutorial:

- <a href="https://www.gatsbyjs.org/docs/quick-start#use-the-gatsby-cli" target="_blank" alt="Gatsby Docs">You'll want to consider installing the Gatsby CLI for local development</a> but you can deploy a functional blog without it
- [Sign up](https://app.stackery.io/sign-up) for a Stackery account if you haven't already. This guide assumes an environment named 'development' linked to an AWS account of your choosing
- This guide will create AWS infrastructure in your default VPC and default ECS Fargate cluster, etc.  

#### Deploy Quick Start

You can deploy each example stack into your own AWS account using these three Stackery CLI commands:

`stackery create` will initialize a new repo in your GitHub account, initializing it with the contents of the referenced blueprint repository.

```text
stackery create --stack-name 'jamstack-ghost' \
--git-provider 'github' \
--blueprint-git-url 'https://github.com/ryanycoleman/gatsby-starter-ghost'
```

`stackery deploy` will deploy the newly created stack into your AWS account.

```text
stackery deploy --stack-name 'jamstack-ghost' \
--env-name 'development' \
--git-ref 'master'
```

Once this stack is deployed, you'll need to retrieve a few pieces of data from the AWS Console and provide them as [Stackery Environment parameter data](https://docs.stackery.io/docs/using-stackery/environments/) which will be used by the following Gatsby stack. 

First, identify the Elastic Load Balancer address in the AWS Console for EC2. It'll look like `http://ghostapilb-#number.#region.elb.amazonaws.com/`. 

You'll then setup your Ghost CMS via that URL /ghost but note that because this stack isn't configured with a custom domain, the ELB is not protecting your data over SSL. Use throwaway information for this step or refactor the SAM template to use a custom domain and SSL certificate. 

Once you've signed up for the admin account, navigate to '/ghost/#/settings/integrations'. Here you'll add a custom integration named Gatsby. You'll want to retrieve the 'Content API Key' and 'API URL' which you'll use to create environment data similar to the following example. 

```code
{ 
"ghostApiUrl": "API URL Here",
"ghostContentApiKey": "Content API Key Here"
}
```

Once saved into your Stackery environment, you can create and deploy the Gatsby stack. 

```text
stackery create --stack-name 'jamstack-ghost' \
--git-provider 'github' \
--blueprint-git-url 'https://github.com/ryanycoleman/gatsby-starter-ghost'
```

`stackery deploy` will deploy the newly created stack into your AWS account.

```text
stackery deploy --stack-name 'jamstack-ghost' \
--env-name 'development' \
--git-ref 'master'
```

The Website Builder resource in this stack will connect the Gatsby static site generator to the Ghost CMS, source content from it, and deliver that built content to an S3 bucket which serves as a CloudFront origin. That's it! You're all done. At this point you can edit/add content in Ghost CMS, log into CodeBuild and re-run the stack-provisioned job to rebuild your site. Future revisions of this stack could include a webhook to automatically rebuild Gatsby when Ghost changes. 