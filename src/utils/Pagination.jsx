import React from 'react';
import ReactPaginate from 'react-paginate';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'; // Importing icons from react-icons

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<MdChevronLeft className="w-5 h-5 text-blue-500" />} // Using react-icons
      nextLabel={<MdChevronRight className="w-5 h-5 text-blue-500" />} // Using react-icons
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={onPageChange}
      containerClassName={'pagination flex flex-wrap justify-center items-center mt-8 gap-2'}
      pageClassName={'flex'}
      pageLinkClassName={'px-3 py-2 rounded text-sm bg-blue-100 text-blue-500 hover:bg-blue-200 transition duration-300 flex items-center justify-center min-w-[32px]'}
      previousClassName={'flex'}
      previousLinkClassName={'px-2 py-2 rounded text-sm bg-blue-100 text-blue-500 hover:bg-blue-200 transition duration-300 flex items-center justify-center'}
      nextClassName={'flex'}
      nextLinkClassName={'px-2 py-2 rounded text-sm bg-blue-100 text-blue-500 hover:bg-blue-200 transition duration-300 flex items-center justify-center'}
      breakClassName={'flex'}
      breakLinkClassName={'px-3 py-2 rounded text-sm bg-blue-100 text-blue-500 hover:bg-blue-200 transition duration-300 flex items-center justify-center'}
      activeClassName={'!bg-blue-500 text-white'}
      disabledClassName={'opacity-50 cursor-not-allowed'}
    />
  );
};

export default Pagination;
