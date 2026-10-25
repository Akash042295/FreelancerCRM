import { useState, useMemo } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const DataTable = ({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Search...',
  pageSize = 8,
  onRowClick,
  emptyMessage = 'No data found',
}) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Filter data
  const filteredData = useMemo(() => {
    if (!search) return data;
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.accessor];
        return val && String(val).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn] || '';
      const bVal = b[sortColumn] || '';
      if (sortDirection === 'asc') return String(aVal).localeCompare(String(bVal));
      return String(bVal).localeCompare(String(aVal));
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (accessor) => {
    if (sortColumn === accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(accessor);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-[#2a2a2a]/50 rounded-xl overflow-hidden">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-[#2a2a2a]">
          <div className="relative max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 placeholder:text-gray-500 rounded-lg px-4 py-2.5 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-200 pl-10 text-sm"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" bg-[#1a1a1a] text-gray-400 text-xs font-semibold uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  onClick={() => col.sortable !== false && handleSort(col.accessor)}
                  className={`px-4 py-3 text-left ${col.sortable !== false ? 'cursor-pointer hover:text-white' : ''}`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortColumn === col.accessor && (
                      <span className="text-orange-500">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-[#2a2a2a] hover:bg-[#1f1f1f]/50 transition-colors duration-150 ${onRowClick ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col) => (
                    <td key={col.accessor} className="px-4 py-3 text-sm text-gray-300">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-black-50">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1}{' '}
             of {sortedData.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-200 rounded disabled:opacity-30"
            >
              <FiChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-sm rounded ${
                  page === currentPage
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 text-gray-400 hover:text-white hover:bg-blue-200 rounded disabled:opacity-30"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
