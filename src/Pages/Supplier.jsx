import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import SupplierTable from '../Components/SupplierTable'
import AddSupplier from '../Components/AddSupplier'
import { useDisclosure } from '@chakra-ui/react'
import UpdateSupplier from '../Components/UpdateSupplier'

const Supplier = () => {
    const {isOpen , onClose} = useDisclosure()
    const [IsOpen, setIsOpen] = useState(false)
    const [IsOpenEdit, setIsOpenEdit] = useState(false)
    const [SupplierData, setSupplierData] = useState({})
    const [trigger, settrigger] = useState(true)

  return (
    <Layout loading={false}>
        
        <SupplierTable trigger={trigger} setIsOpenEdit={setIsOpenEdit} setIsOpen={setIsOpen} setSupplierData={setSupplierData}/>
        <AddSupplier trigger={trigger} settrigger={settrigger} isOpen={IsOpen} onClose={()=>{
            setIsOpen(false)
        }}/>
        <UpdateSupplier trigger={trigger} settrigger={settrigger} isOpen={IsOpenEdit} onClose={()=>{
            setIsOpenEdit(false)
            setSupplierData(null)
        }}
        selectedSupplier={SupplierData}
        />
    </Layout>
  )
}

export default Supplier