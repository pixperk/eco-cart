import { FC } from 'react'
import { generateAICart } from './actions'
import AICartGenerator from './AICartGenerator'


const page: FC = async({}) => {
    
    async function genCart(desc : string) {
        "use server"
        await generateAICart(desc)
    }
  return <AICartGenerator genCart={genCart}/>
}

export default page