import dynamic from 'next/dynamic'

import Work from './work'
import About from './about'
import Intro from './intro'
import Contact from './contact'

export default {
  Work,
  About,
  Intro,
  Contact,
  Timeline: dynamic(() => import('./timeline'), {
    ssr: false,
  }),
}
