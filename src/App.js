import './App.css';
import './index.css';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';
import video from './bread.mp4';
import icon from './icons8.png'
import MyRecipesComponent from './MyRecipesComponent';
import { LoaderPage } from './LoaderPage';
import Swal from 'sweetalert2';

function App(){

  const MY_ID = "fbf1aefa";
  const MY_KEY = "1c7e7a9e2f62ef5ccd608ced66f4e2c3";

  const [mySearch, setMySearch] = useState('');
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSubmitted, setWordSubmitted] = useState('bread');
  const [stateLoader, setStateLoader] = useState(false);

  
  
    const getNewRecipe = useCallback(async () => {
      setStateLoader(true)
      const responce = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
      const data = await responce.json();
      setMyRecipes(data.hits);
      setStateLoader(false)
    },[wordSubmitted])
    useEffect(() =>{
      getNewRecipe();
      }, [getNewRecipe])

  
  const myRecipeSearch = (e) => {
  setMySearch(e.target.value);
}
const finalSearch = (e) => {
  e.preventDefault();
  setWordSubmitted(mySearch);
}

const handleClick = () => {
  if(!mySearch) {
    setStateLoader(false);
    Swal.fire("Please enter your ingredients!")
  }
  else if(!wordSubmitted){
    setStateLoader(false);
    Swal.fire("Ingredients entered incorectly")
    return false
  }
}

  return(
    <div className="App">
      {stateLoader && <LoaderPage/>}

      <div className='container'>
        <video autoPlay muted loop>
          <source src={video} type="video/mp4"/>
        </video>
        <h1>Find your bread recipe</h1>
    </div>
      
      
      <div className='container heading'>
        <form onSubmit = {finalSearch}>
          <input className='search' type='text' placeholder='search...' onChange={myRecipeSearch} value={mySearch}></input>

        <div className='container'>
          <button className='btn' onClick={handleClick}>
            <img src={icon} width="35px" className='icons' alt='baking'/>
          </button>
          </div>
        </form>
      </div>
      
      <div>
        {myRecipes.map((element, index) => (
          <MyRecipesComponent 
          key={index}
          label = {element.recipe.label}
          cuisine = {element.recipe.cuisineType}
          image = {element.recipe.image}
          ingredients = {element.recipe.ingredientLines}
          calories = {element.recipe.calories}
          diet = {element.recipe.dietLabels}
          time = {element.recipe.totalTime}
          />
        ))}
      </div>
    </div>
  
  )
}
export default App;
