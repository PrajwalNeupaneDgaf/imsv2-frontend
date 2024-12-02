import React, { useState } from "react";
import Layout from "../Layout/Layout";
import PurchaseTable from "../Components/PurchaseTable";
import AddPurchase from "../Components/AddPurchase";
import UpdatePurchase from "../Components/UpdatePurchase";

const Sale = () => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseId, setPurchaseId] = useState('');
  const [trigger,setTrigger] = useState(true)

  const triggerMe = ()=>{
    setTrigger(!trigger)
  }

  return (
    <Layout loading={false}>
      {/* Sale Table */}
      <PurchaseTable
        trigger={trigger}
        triggerMe={triggerMe}
        setIsOpenEdit={setIsOpenEdit}
        setPurchaseId={setPurchaseId}
        setIsOpen={setIsOpen} // Pass the function to open the AddSale modal
      />

      {/* Add Sale Modal */}
      <AddPurchase
        triggerMe={triggerMe}
        isOpen={isOpen}
        onClose={()=>{
          setIsOpen(false);
        }}
      />

      {/* Update Sale Modal */}
      <UpdatePurchase
        triggerMe={triggerMe}
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false);
          setPurchaseId(null);
        }}
        purchaseId={purchaseId}
      />
    </Layout>
  );
};

export default Sale;
