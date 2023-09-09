"use client";
import React, { useState } from "react";
import { TableProps } from "./type";
import Text from "../Text";

const DataTable: React.FC<TableProps> = ({
  data,
  columns,
  totalData = 0,
  limit = 10,
  onPaginate,
  page,
}) => {
  const [currentPage, setCurrentPage] = useState(page || 1);

  const itemsPerPage = limit;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPaginate && onPaginate(page);
  };

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="max-w-full overflow-auto bg-white rounded-md">
      <table className="w-full divide-y divide-gray-200 overflow-auto">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                <Text weight="bold" color="gray" align="left">
                  {column.title}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {column?.render ? (
                    column.render(row[column.dataKey], row)
                  ) : (
                    <Text color="black" align="left">
                      {row[column.dataKey]}
                    </Text>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* no data text */}
      {data.length === 0 && (
        <div className="flex justify-center items-center h-16 border-t border-gray-200">
          <Text>No Data</Text>
        </div>
      )}
      {/* pagination */}
      {onPaginate && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalData)}
                </span>{" "}
                of <span className="font-medium">{totalData}</span> results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.707 3.293a1 1 0 010 1.414L6.414 9H15a1 1 0 010 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                {pageNumbers.map((page) => (
                  <a
                    key={page}
                    href="#"
                    className={`${
                      page === currentPage
                        ? "bg-blue-50 border-blue-500 text-blue-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </a>
                ))}
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.293 16.707a1 1 0 010-1.414L13.586 11H5a1 1 0 010-2h8.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
