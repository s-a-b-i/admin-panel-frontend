import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FilterSection from '../component/Members/FilterSection';
import SearchAddSection from '../component/Members/SearchAddSection';
import MemberTable from '../component/Members/MemberTable';
import MemberDetails from '../component/Members/MemberDetails';
import EditMemberForm from '../component/Members/EditMemberForm';
import AddMemberForm from '../component/Members/AddMemberForm';
import { fields, subFields, specializations, experienceLevels } from '../constants/fields';
import Pagination from '../utils/Pagination';

// Static list of members (replace with your actual data)
const initialMembers = [
  { id: 1, name: 'John Doe', field: 'Engineering', subField: 'Software', specialization: 'Backend', experienceLevel: 'Senior', email: 'john.doe@example.com', phone: '123-456-7890', image: '' },
  { id: 2, name: 'Jane Smith', field: 'Marketing', subField: 'Digital', specialization: 'SEO', experienceLevel: 'Junior', email: 'jane.smith@example.com', phone: '123-456-7891', image: '' },
  // Add more static members as needed
];

const MemberPage = () => {
  const [members, setMembers] = useState(initialMembers);
  const [filters, setFilters] = useState({
    field: '',
    subField: '',
    specialization: '',
    experienceLevel: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [isEditingMember, setIsEditingMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredMembers = members.filter(member => {
    return (
      (!filters.field || member.field === filters.field) &&
      (!filters.subField || member.subField === filters.subField) &&
      (!filters.specialization || member.specialization === filters.specialization) &&
      (!filters.experienceLevel || member.experienceLevel === filters.experienceLevel) &&
      (!searchTerm || 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        member.field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });

  const pageCount = Math.ceil(filteredMembers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentMembers = filteredMembers.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleAddMember = (newMember) => {
    setMembers([...members, { ...newMember, id: Date.now() }]);
    setIsAddingMember(false);
  };

  const handleEditMember = (editedMember) => {
    setMembers(members.map(member => member.id === editedMember.id ? editedMember : member));
    setIsEditingMember(false);
    setSelectedMember(null);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
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
          <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Member Management</h1>
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            fields={fields}
            subFields={subFields}
            specializations={specializations}
            experienceLevels={experienceLevels}
          />
          <SearchAddSection
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddMember={() => setIsAddingMember(true)}
          />
          <MemberTable
            members={currentMembers}
            onMemberClick={setSelectedMember}
            onEditMember={(member) => { setSelectedMember(member); setIsEditingMember(true); }}
            onDeleteMember={handleDeleteMember}
          />
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
          {selectedMember && !isEditingMember && (
            <MemberDetails
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />
          )}
          {isEditingMember && (
            <EditMemberForm
              member={selectedMember}
              onSave={handleEditMember}
              onClose={() => setIsEditingMember(false)}
              fields={fields}
              subFields={subFields}
              specializations={specializations}
              experienceLevels={experienceLevels}
            />
          )}
          {isAddingMember && (
            <AddMemberForm
              onSave={handleAddMember}
              onClose={() => setIsAddingMember(false)}
              fields={fields}
              subFields={subFields}
              specializations={specializations}
              experienceLevels={experienceLevels}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MemberPage;
