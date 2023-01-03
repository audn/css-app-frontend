function SearchBar() {
  return (
    <div className="relative flex items-center !mt-3">
      <div className="absolute left-4">
        <i className="fa-solid fa-magnifying-glass" />
      </div>
      <input
        type="text"
        className="px-6 pl-10 py-[0.5rem] placeholder:text-white/50 focus:outline-none focus:bg-types-150/80 rounded-full bg-types-100"
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
