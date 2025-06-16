






const ServiceSection = ({ title, itemsCount }) => {
  return (
    <div className="m-10 ml-[2vw]">
      <h2 className="text-[16px] mb-4 text-black">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: itemsCount }).map((_, i) => (
          <div
            key={i}
            className="h-[294px] w-[225px] bg-white rounded-xl border border-gray-200"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSection;
