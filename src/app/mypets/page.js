import ProtectedRoute from "@/Components/ProtectedRoute"

import SearchBar from "@/Components/SearchBar"

const page = () => {
  return (

    <ProtectedRoute>
        <div className="">
             <SearchBar/>
        </div>
       
    </ProtectedRoute>
   
  )
}

export default page
