import { FC } from 'react'
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";

import { redirect } from 'next/navigation';

interface pageProps {
  
}

const page: FC<pageProps> = async({}) => {
   

const {isAuthenticated, getUser} = getKindeServerSession();
const isUserAuthenticated = await isAuthenticated();

if(isUserAuthenticated){
    const user = await getUser();
   return <>
   {user.given_name}{" "}{user.family_name}:{user.email}
   
<LogoutLink>Log out</LogoutLink>

   </> 
}

redirect('/')
}

export default page