import React from 'react';

const FilterButton = ({ filter, currentFilter, onSetFilter, count, children }) => {
  const isActive = filter === currentFilter;
  const baseClasses = "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200";
  const activeClasses = "bg-white/90 text-gray-900 shadow-md";
  const inactiveClasses = "bg-white/20 text-white hover:bg-white/30";

  return (
    <button
      onClick={() => onSetFilter(filter)}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children} ({count})
    </button>
  );
};

function FilterControls({ currentFilter, onSetFilter, counts }) {
  return (
    <div className="flex flex-wrap gap-3">
      <FilterButton filter="all" currentFilter={currentFilter} onSetFilter={onSetFilter} count={counts.all}>
        All
      </FilterButton>
      <FilterButton filter="completed" currentFilter={currentFilter} onSetFilter={onSetFilter} count={counts.completed}>
        Completed
      </FilterButton>
      <FilterButton filter="incomplete" currentFilter={currentFilter} onSetFilter={onSetFilter} count={counts.incomplete}>
        Incomplete
      </FilterButton>
    </div>
  );
}

export default FilterControls;