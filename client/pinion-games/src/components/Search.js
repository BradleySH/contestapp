export default function Search({searchQuery, setSearchQuery}){
    return (
        <form onSubmit={e => e.preventDefault()}>
        <label htmlFor="header-search">
            <span>Users</span>
        </label>
        <input
            type="text"
            placeholder="Search Users"
            name="searchQuery"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoComplete='off'
        />
        <button type="submit">Search</button>
    </form>
    )
}