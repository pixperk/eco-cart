import { FC } from 'react'
import { generateAICart } from './actions'
import AICartGenerator from './AICartGenerator'

interface pageProps {
  
}

const page: FC<pageProps> = async({}) => {
    
    async function genCart(desc : string) {
        "use server"
        await generateAICart(desc)
    }
  return <AICartGenerator genCart={genCart}/>
}

export default page