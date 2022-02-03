# Why CMD+K?

CMD+K (pronounced "command k") is a tooling environment. Front-end web dev has Chrome Dev Tools and a host of Dev Tools plugins, but sometimes you need to build your tooling directly into your app. Browser extensions development can be quite limiting, especially with it's iffy distribution model.

CMD+K can be injected directly into your app or dropped in via the Dev Tools console.

It lets you fire off and control plugins that have full access to your app and it's dev environment. CMD+K is not recommended for use in production environments, because it does introduce an attack vector for your site. It's one thing to fall victim to an XSS attack in your dev environment. It's an entirely different thing to introduce XSS vulnerabilities to prod.

The plugins are easy-ish to develop. Bootstrapping them into the CMD+K pane and building out basic views and controls isn't too bad. The trick is in making fully-featured, sophisticated plugins. CMD+K helps a lot, but you'll need to know JavaScript (and probably React or Vue) quite well.

## Environment

This repo can be built and run directly on your native OS or wsl2 in Windows;
however, it's designed to run inside of a VSCode Container.

To run in a container with `docker-compose` use `docker-compose up -d` to bring up the containers, and `docker-compose down` to take them down. Use VSCode's `Remote-Containers: Reopen in Container` command from the `cmd+shift+P` panel to open VSCode within the running container.

## Development

Once the environment is set up, use `yarn && yarn dev` to develop the app.

`yarn build` will build it.

`yarn export` will export it and create the docs folder for GitHub Pages.

## Non-Environment Scripts

Sometimes you just want to build and release with a single command.

`yarn docs` will do that. It should be run outside of VSCode's Remote Container environment, because it builds it's own Docker container and runs the build process inside that isolated container. The result is an updated `/docs` folder.

Commit and push that fresh `/docs` folder to deploy to GitHub Pages.

## Built using Turborepo

See [Turborepo starter notes](https://github.com/vercel/turborepo/tree/main/create-turbo/templates/yarn)
