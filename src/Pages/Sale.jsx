import React, { useState } from "react";
import Layout from "../Layout/Layout";
import SaleTable from "../Components/SaleTable";
import AddSale from "../Components/AddSale";
import UpdateSale from "../Components/UpdateSale";
import { useDisclosure } from "@chakra-ui/react";

const Sale = () => {
  const { isOpen: isAddOpen, onClose: onAddClose } = useDisclosure();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [saleData, setSaleData] = useState({});
  const [Isopen, setIsOpen] = useState(false);
  const [trigger,setTrigger]= useState(true)

  const triggerme = ()=>{
    setTrigger(!trigger)
  }

  return (
    <Layout loading={false}>
      {/* Sale Table */}
      <SaleTable
        triggerme={triggerme}
        trigger={trigger}
        setIsOpenEdit={()=>{
          setIsOpenEdit(true);
        }}
        setSaleData={setSaleData}
        setIsOpen={setIsOpen} // Pass the function to open the AddSale modal
      />

      {/* Add Sale Modal */}
      <AddSale
        triggerme={triggerme}
        isOpen={Isopen}
        onClose={()=>{
          setIsOpen(false);
        }}
      />

      {/* Update Sale Modal */}
      <UpdateSale
        triggerme={triggerme}
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false);
          setSaleData(null);
        }}
        saleData={saleData}
      />
    </Layout>
  );
};

export default Sale;
