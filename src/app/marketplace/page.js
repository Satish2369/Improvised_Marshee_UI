import ProtectedRoute from "@/Components/ProtectedRoute"
import Store from "@/Components/Store"

const page = () => {
  return (
   <ProtectedRoute>
    <div className="  w-[770px] ml-[4vw]">
      <Store/>
    </div>
    </ProtectedRoute>
  )
}

export default page;
