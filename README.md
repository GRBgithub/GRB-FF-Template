# GRB F*** FRAMEWORK Quickstart ⚛️ 📦
> 

Starter template for server-side and client-side rendering 
Fully configurable serverside for seo & swap to client side when the website is loaded

## Features

- Async Transition
- Optimized SEO
- PWA
- SSR
- Auto Generated Code 
- Vercel Config
- Optimized Webpack
- Creative Developer Friendly
- Auto index of SCSS File


## Tech Stack

**Client:** React, Vanilla JS

**Server:** Node, Express


## Installation

Need to run dev command to code properly

```bash
  npm install 
  npm run build
  npm run dev
```
## Directory 

### `Views` 
 Create a Folder a page for your website with 3 Files

<img src="https://drive.google.com/uc?export=view&id=1d6OTLrtww-ufxUC6RmcFYY6tRtvspvSF" alt="drawing" width="300"/>

#### `Config`
Config is everything to run ServerSide 

`The const Route is the path to have this view`

<img src="https://drive.google.com/uc?export=view&id=1mcgY5O7KH8ZNPmy0C7bWgWNFBqlb2GFV" alt="drawing" width="500"/>

The Init function contains your ServerSide Api call metadata & a special HTML for SEO bot

<img src="https://drive.google.com/uc?export=view&id=143AFuKkElC051N0KmEMicUtbJWqfR7QA" alt="drawing" width="500"/>


#### `Index`
Index.js is the templating of the view

```javascript
import React from "react";
const Hello = ({ props }) => {
  return <h1 className="Hello">Hello</h1>;
};
export default Hello;
```

#### `Manager`
The Manager is a Vanilla JS who run 'in' & 'out' function everytime the page mount & unmount

every class in the Object 'Element' is accessible in 'in' & 'out" function with this.DOM.[name of you key object]

- 'In' function as a callback to call at the end of the transition of the view <br>
- 'Out' function as 2 callback 'NextShow' to render the next view and 'OutFinish' to call the end of the transition of the view

You have also 3 Functions

- TIME is a requestanimationframe function who run automatically <br>
- SIZE who run at the end of a resizing <br>
- DEBUG who run if he detect #DEBUG in the path of the url

<img src="https://drive.google.com/uc?export=view&id=103a9DM7N0VPhYwpeJAJ6mIWROkNnB3NL" alt="drawing" width="500"/>




## Optimizations

What optimizations did you make in your code? E.g. refactors, performance improvements, accessibility




## Support

For support, email pro.grb.studio@gmail.com .

