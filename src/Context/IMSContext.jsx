import { Center, Spinner, useToast } from '@chakra-ui/react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../axios'


const context = createContext()

const IMSContext = ({children}) => {

    const toast = useToast()

    const [isLoading, setisLoading] = useState(true)
    const [user, setuser] = useState({})
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const [isAuthorized, setisAuthorized] = useState(false)

    //Fetching The Data
   useEffect(()=>{
    setisLoading(true)
    api.get('/users/me')
    .then((res)=>{
        const data = res.data
        setisAuthenticated(true)
        setuser(data)
        if(data.role == 'admin'){
            setisAuthorized(true)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
    setisLoading(false)
   },[])
  return (
    <context.Provider value={{
        user,
        isAuthenticated,
        isAuthorized,
        isLoading
    }}>
       {
        isLoading?<>

        <Center bg={'grey.900'} h={'70vh'}>
            <Spinner color='white' size={'lg'}/>
        </Center>
        </>:<>
        {
            children
        }
        </>
       }
    </context.Provider>
  )
}

export default IMSContext

export const useIMS = ()=>{
 return useContext(context)
};