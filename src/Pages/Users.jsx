import React from 'react'
import Layout from '../Layout/Layout'
import UserTable from '../Components/UsersTable'

const Users = () => {
  return (
    <Layout loading = {false}>
    <UserTable/>
</Layout>
  )
}

export default Users