import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const DashContext = createContext()

const DashboardContext = ({children}) => {

    const [clientProducts, setClientProducts] = useState([])

    const getArticles = ()=>{
            axios.get("http://localhost/product_project/server/userarticles.php?q=get_user_products").then((res)=>{
              if(res.data.check){
                setClientProducts(res.data["data"])
              }
            })
    }

    
  
  return (
    <DashContext.Provider value={{clientProducts, getArticles}}>{children}</DashContext.Provider>
  )
}

export {DashboardContext, DashContext}