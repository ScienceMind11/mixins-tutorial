import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import logo from "./scenes/logo?scene";
import theory from "./scenes/theory?scene";

export default makeProject({
  scenes: [logo, theory, example],
});
