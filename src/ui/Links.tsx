const Links: React.FC = () => {
  return (
    <div
      className="absolute top-full mt-1 flex flex-col gap-1 bg-white w-1/2 
text-xs py-1 px-2 rounded-md border border-gray-500 shadow-lg z-[1000]"
    >
      <a href="https://tunga.platform.co.nl/" target="_blank">
        <span className="hover:underline">TIA - Dashboard</span>
      </a>
      <a href="https://www.linkedin.com/company/tunga" target="_blank">
        <span className="hover:underline">Tunga Linkedin</span>
      </a>
    </div>
  );
};

export default Links;
