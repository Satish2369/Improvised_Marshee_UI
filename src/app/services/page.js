
import ProtectedRoute from "@/Components/ProtectedRoute";
import SearchBar from "@/Components/SearchBar";
import ServicesSection from "@/Components/ServicesSection";

const Page = () => {
  return (
<>
      <div >
           <SearchBar/>

           <ServicesSection title="Food" itemsCount={4} />
           <ServicesSection title="Pet Insurance" itemsCount={4} />
           <ServicesSection title="Preventive Health" itemsCount={4} />
           
      </div>
    </>
  )
}

export default Page;
