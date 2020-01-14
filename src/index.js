import * as React from 'react'
import { render } from 'react-dom'
import 'reset-css'

import { Game } from './App.js'

const rootElement = document.getElementById('root');
render(<Game />, rootElement);