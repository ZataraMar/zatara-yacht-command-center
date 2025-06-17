
import { useState, useMemo } from 'react';

interface UseSearchAndSortProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  defaultSortBy?: keyof T;
}

export const useSearchAndSort = <T extends Record<string, any>>({
  data,
  searchFields,
  defaultSortBy
}: UseSearchAndSortProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>(defaultSortBy as string || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return value && value.toString().toLowerCase().includes(searchLower);
        })
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        
        // Handle null/undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortOrder === 'asc' ? 1 : -1;
        if (bValue == null) return sortOrder === 'asc' ? -1 : 1;
        
        // Handle different data types
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        
        if (aValue instanceof Date && bValue instanceof Date) {
          return sortOrder === 'asc' 
            ? aValue.getTime() - bValue.getTime()
            : bValue.getTime() - aValue.getTime();
        }
        
        // Default string comparison
        const aStr = aValue.toString().toLowerCase();
        const bStr = bValue.toString().toLowerCase();
        
        if (sortOrder === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortBy, sortOrder, searchFields]);

  const clearSearch = () => setSearchTerm('');

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredAndSortedData,
    clearSearch
  };
};
