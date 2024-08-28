const SupervisorPopup = ({ supervisors, onSelect, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 w-80">
          <h3 className="text-lg font-bold mb-2">Select a Supervisor</h3>
          {supervisors.map((supervisor) => (
            <button
              key={supervisor.id}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded"
              onClick={() => onSelect(supervisor)}
            >
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getSupervisorColor(supervisor.id)}`}></span>
              {supervisor.name}
            </button>
          ))}
          <button
            className="block w-full text-center mt-4 bg-blue-500 text-white px-4 py-2 rounded-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  
  export default SupervisorPopup;