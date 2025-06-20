


const Community = () => {
  return (
    <>
    
        <div className="w-full h-full bg-white rounded-[24px] p-8">
          <div className="bg-white rounded-[16px] w-[70vw] flex  border border-gray-200 flex-col justify-center items-center py-10 px-6 text-center mb-10 h-[17vw] ">
            <h2 className="text-[26px]  mb-2">
              Join the marshee pet community!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Select your causes close to your heart and start contributing
            </p>
            <button className="bg-yellow-300 hover:bg-yellow-300 text-black font-medium px-6 py-1.5 text-sm rounded-[8px]">
              Join
            </button>
          </div>

        
          <div className="grid grid-cols-3 gap-x-6 gap-y-6 w-[70vw]">
            {[
              "Blood Donation",
              "Search",
              "Feeding",
              "Fostering",
              "Adoption",
              "Dog Walks",
              "Pool Parties",
              "Dog Dating",
              "Pet Training",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-white rounded-[12px] p-2 flex flex-col justify-between h-[16vw] border border-gray-200"
              >
                <div className="text-[1vw] text-zinc-800-400 text-right mr-2">
                  50k mem
                </div>

                <div className="flex justify-between items-center text-black text-[12px]">
                   <div className="text-xl mt-[9.5vw] ml-2 text-zinc-600 ">{title}</div>
                  <div className="text-black  flex  justify-center items-center mt-[9.5vw] m-2">
                     <div className="text-xl">🖤</div>
                     <div>5k</div>
                    </div>
                </div>
              </div>
            ))}
          </div>

         
        
        </div>
      
    </>
  );
};

export default Community;
