import type { Component } from 'solid-js';

import Project from './collections/Project';
import About from './collections/About';

import { CMS } from "./plasticine"

const App: Component = () => <CMS collections={{ About, /* Project */ }} />

export default App;
