import FilterPersonalizacion from "./filter-origin";
type FiltersControlsCategoryProps = {
    setFilterOrigin:(orgin:string) => void
}


const FiltersControlsCategory = (props:FiltersControlsCategoryProps ) => {
  const {setFilterOrigin} = props
  return (
    
    <div className="sm:w-[350px] sm:mt-5 p-6  ">
      <FilterPersonalizacion setFilterOrigin={setFilterOrigin}/>
    </div>
  );
};

export default FiltersControlsCategory;
