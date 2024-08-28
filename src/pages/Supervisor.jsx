import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilterSection from '../component/Supervisor/FilterSection';
import SearchAddSection from '../component/Supervisor/SearchAddSection';
import SupervisorTable from '../component/Supervisor/SupervisorTable';
import SupervisorDetails from '../component/Supervisor/SupervisorDetails';
import EditSupervisorForm from '../component/Supervisor/EditSupervisorForm';
import AddSupervisorForm from '../component/Supervisor/AddSupervisorForm';
import { fields, subFields, specializations } from '../constants/fields';
import Pagination from '../utils/Pagination';

// Static list of supervisors (replace with your actual data)
const initialSupervisors = [
  { id: 1, name: 'John Doe', field: 'Engineering', subField: 'Software', specialization: 'Backend', email: 'john.doe@example.com', phone: '123-456-7890', image: '' },
  { id: 2, name: 'Jane Smith', field: 'Marketing', subField: 'Digital', specialization: 'SEO', email: 'jane.smith@example.com', phone: '123-456-7891', image: '' },
  // Add more static supervisors as needed
];

const Supervisor = () => {
  const [supervisors, setSupervisors] = useState(initialSupervisors);
  const [filters, setFilters] = useState({
    field: '',
    subField: '',
    specialization: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [isAddingNewSupervisor, setIsAddingNewSupervisor] = useState(false);
  const [isEditingSupervisor, setIsEditingSupervisor] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredSupervisors = supervisors.filter(supervisor => {
    return (
      (!filters.field || supervisor.field === filters.field) &&
      (!filters.subField || supervisor.subField === filters.subField) &&
      (!filters.specialization || supervisor.specialization === filters.specialization) &&
      (!searchTerm || 
        supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        supervisor.field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const pageCount = Math.ceil(filteredSupervisors.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentSupervisors = filteredSupervisors.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAddSupervisor = (newSupervisor) => {
    setSupervisors([...supervisors, { ...newSupervisor, id: Date.now() }]);
    setIsAddingNewSupervisor(false);
  };

  const handleEditSupervisor = (editedSupervisor) => {
    setSupervisors(supervisors.map(supervisor => supervisor.id === editedSupervisor.id ? editedSupervisor : supervisor));
    setIsEditingSupervisor(false);
    setSelectedSupervisor(null);
  };

  const handleDeleteSupervisor = (id) => {
    setSupervisors(supervisors.filter(supervisor => supervisor.id !== id));
  };

  return (
    <div className="min-h-screen">
      <div className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6"
          style={{
            boxShadow: '0px 4px 10px 2px rgba(0, 117, 255, 0.11)' // Updated box-shadow color
          }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Supervisor Management</h1>
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            fields={fields}
            subFields={subFields}
            specializations={specializations}
          />
          <SearchAddSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddSupervisor={() => setIsAddingNewSupervisor(true)}
          />
          <SupervisorTable
            supervisors={currentSupervisors}
            onSupervisorClick={setSelectedSupervisor}
            onEditSupervisor={(supervisor) => { setSelectedSupervisor(supervisor); setIsEditingSupervisor(true); }}
            onDeleteSupervisor={handleDeleteSupervisor}
          />
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
          {selectedSupervisor && !isEditingSupervisor && (
            <SupervisorDetails
              supervisor={selectedSupervisor}
              onClose={() => setSelectedSupervisor(null)}
            />
          )}
          {isEditingSupervisor && (
            <EditSupervisorForm
              supervisor={selectedSupervisor}
              onSave={handleEditSupervisor}
              onClose={() => setIsEditingSupervisor(false)}
              fields={fields}
              subFields={subFields}
              specializations={specializations}
            />
          )}
          {isAddingNewSupervisor && (
            <AddSupervisorForm
              onSave={handleAddSupervisor}
              onClose={() => setIsAddingNewSupervisor(false)}
              fields={fields}
              subFields={subFields}
              specializations={specializations}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Supervisor;
