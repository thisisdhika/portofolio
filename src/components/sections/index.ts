import dynamic from 'next/dynamic'

import About from './about'
import Intro from './intro'
import Contact from './contact'

export default {
  Intro,
  About,
  Contact,
  Timeline: dynamic(() => import('./timeline'), {
    ssr: false,
  }),
}
