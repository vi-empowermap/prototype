import dynamic from 'next/dynamic'
 
const DynamicMiniMap = dynamic(() => import('./IntroMap'), {
  ssr: false,
})

export default DynamicMiniMap