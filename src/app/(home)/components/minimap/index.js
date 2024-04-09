import dynamic from 'next/dynamic'
 
const DynamicMiniMap = dynamic(() => import('./MiniMap'), {
  ssr: false,
})

export default DynamicMiniMap