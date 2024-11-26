const Filter=({handleFilter,filterName})=>{
  return(
    <div>
    filter shown with <input onChange={handleFilter} name="name" value={filterName.name}/>
    </div>
  )
}
export default Filter;
