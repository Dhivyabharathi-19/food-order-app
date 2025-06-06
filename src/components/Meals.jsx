
import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.js";

const requestConfig ={};

function Meals() {
    const {
      data: loadedMeals,
       isLoading, 
       error,
      } = useHttp('http://localhost:3000/meals' , requestConfig, []);

      

      if (isLoading) {
        return <p className="center">Fetching Meals...</p>;
      
      }

      if (error) {
         return <Error title="Failed to fetch meals" message={error}  />;
         
      }

      // if(!data) {
      //   return (
      //     <p>No Meals found</p>
      //   )
      // }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
       <MealItem  key={meal.id} meal={meal}/>
      ))}
    </ul>
  );
}

export default Meals;
