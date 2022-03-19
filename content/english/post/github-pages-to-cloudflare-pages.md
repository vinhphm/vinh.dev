+++
author = "Vinh Pham"
title = "Switched from GitHub Pages to Cloudflare Pages"
date = "2022-03-19T23:00:00+07:00"
description = "The biggest change I have made to my development progress so far"
tags = [
    "hosting",
    "blog",
    "web",
    "static",
    "jekyll",
    "cloudflare",
    "github",
    "hugo",
]
categories = [
    "Stories",
]
series = ["Making the changes"]
+++

That is a lot of "Pages". With the new domain, I have to make some changes to my blog. I have to rethink about how it show be, instead just a plain blogging site.

<!--more-->

I would like the new site to be a mimimalistic static site that has:

- [ ] Contact information
- [ ] Social media links
- [ ] Blog
- [ ] Portfolio

With that in mind, I looked for a new Jekyll template that ticks those boxes. It's actually not easy as it sounds. There are not many new templates for Jekyll than it used to be. The old templates are somewhat outdated and not maintained. It almost feels like Jekyll is not "the thing" anymore. Despite of saying that, GitHub Pages support out-of-the-box still helps Jekyll stay popular.

Previously, I used a Jekyll theme called "Chirpy". It's a fantastic theme if you plan to use it as a blog. And it requires CI/CD workflow to deploy to GitHub Pages since GitHub Pages does not support the latest version of Jekyll. So basically, Jekyll's advantage in deployment is no more. More and more developers are exploring other site generators like Hugo, Gatsby,... that breaks the infamous Jekyll - GitHub Pages combo.

Switching direction, I looked for templates for another site generators as well. With that, I also decided to leave GitHub Pages. Let's talk about the alternatives. There are Netlify, Vercel, Surge, Render,... but there is one that catches my eye, [Cloudflare Pages](https://pages.cloudflare.com).

## Cloudflare Pages vs. GitHub Pages

There are so many things to compare, but let's check out the differences on the key features for our hosting deployment purpose (Free Tier):

<center>

|  | Cloudflare Pages | GitHub Pages |
| --- | --- | --- |
| Instant rollbacks to any version | <center>✅</center> | <center>❌</center> |
| Site previews for every push | <center>✅</center> | <center>❌</center> |
| Compatible with all Static Site Generators | <center>✅</center> | <center>❌</center> |
| Build Cap | <center>500 builds / month</center> | <center>N/A</center> |
| Bandwidth | <center>Unlimited</center> | <center>100GB / month</center> |

</center>

It's important to note that since our .dev domain does not come with SSL certificate, we have to consider this when choosing hosting service. Luckily, like GitHub Pages, Cloudflare Pages comes with SSL certificate.

## The transition

The process of adding my new domain to Cloudflare Page is pretty simple. Since Cloudflare automatically copy our DNS records settings from Google Domains, all I have to do is go to Google Domains and switch to Cloudflare's name servers. Then, from now on, I can manage my domain with Cloudflare Dashboard.

## The build and deployment process

To get the build and deployment process working, we have to grant Cloudflare access to our GitHub repository to get the source code. Then we can choose the branch and setup the suitable build configurations.

{{< figure src="/images/2022/mar/cloudflare-pages-setup.jpg" alt="image" class="big" >}}

During the build process, you should mind the version of the tool on Cloudflare, their default version can be a little old and can cause some issues. You can tell Cloudflare to use special version by setting the environment variable. For example, I set ```HUGO_VERSION``` variable to ```0.94.2``` to use the latest version of Hugo.

So you probably can see that now I use Hugo instead of Jekyll. We will talk about this in another article...