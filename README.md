## URL

https://next-ts-youtarrow.vercel.app/

## Overview

Create a blog site using Next.js and TypeScript.

## Framework

<ul>
    <li><a href="https://reactjs.org/" target="_blank">https://reactjs.org/</a></li>
    <li><a href="https://nextjs.org/" target="_blank">https://nextjs.org/</a></li>
    <li><a href="https://www.typescriptlang.org/" target="_blank">https://www.typescriptlang.org/</a></li>
    <li><a href="https://material-ui.com/" target="_blank">https://material-ui.com/</a></li>
    <li><a href="https://vercel.com" target="_blank">https://vercel.com</a></li>
    <li><a href="https://microcms.io/" target="_blank">https://microcms.io/</a></li>
</ul>

## Development Environment

<ul>
    <li>・macOS</li>
    <li>・React@17.0.1</li>
    <li>・typescript@4.2.3</li>
    <li>・Material-UI</li>
    <li>・Vercel</li>
    <li>・MicroCMS</li>
</ul>

## Usage

Git clone

```
https://github.com/youtarrow/next-ts.git
```

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-typescript&project-name=with-typescript&repository-name=with-typescript)

## How to use it?

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example with-typescript with-typescript-app
# or
yarn create next-app --example with-typescript with-typescript-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.
