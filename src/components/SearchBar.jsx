const SearchBar = ({ value, onChange, onSubmit }) => (
  <form
    className="search-bar"
    onSubmit={(e) => {
      e.preventDefault()
      onSubmit()
    }}
  >
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search city"
    />
    <button type="submit">Search</button>
  </form>
)

export default SearchBar
