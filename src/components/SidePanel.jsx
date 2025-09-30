const SidePanel = ({ sidePanelRef }) => {
  return (
    <div
      ref={sidePanelRef}
      className={`fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-lg -translate-x-full transform transition-transform duration-500 ease-in-out`}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500">
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500">
              Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-500">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
