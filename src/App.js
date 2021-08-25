import {useState} from 'react'
import RanNumList from './RanNumList'

const App = () => {
  const [num, setNum] = useState(Math.floor(Math.random()*90))
  const [lastNum, setLastNum] = useState([])

  //---------------------------------------METHOD FOR CHANGE THE ARRAYS--------------------------------------------------
  const splitArray = (list, type) => {
    if(list.length > 1){ 
        const half = Math.floor(list.length/2) 
        const left = list.slice(0, half); 
        const right = list.slice(half);
        const sortedLeft = splitArray(left, type);
        const sortedRight = splitArray(right, type);
        return merge(sortedLeft, sortedRight, type);
    } else {
        return list;
    }
}

const merge = (left, right, type) => {
    let sortedArray = []; 
    let indexLeft = 0; 
    let indexRight = 0;

    console.log(type)
    while(indexLeft < left.length && indexRight < right.length)
    { 
      if(type === 'ASC'){
        if(left[indexLeft] < right[indexRight]){
            sortedArray.push(left[indexLeft]); 
            indexLeft++; 
        }else{
            sortedArray.push(right[indexRight]);
            indexRight++; 
        }
      }     

      if(type === 'DESC'){
        if(left[indexLeft] > right[indexRight]){
            sortedArray.push(left[indexLeft]); 
            indexLeft++; 
        }else{
            sortedArray.push(right[indexRight]);
            indexRight++; 
        }
      } 
        
    }

    return sortedArray.concat(left.slice(indexLeft).concat(right.slice(indexRight)));
}

const sort = (type) => {
  console.log(type)
  setLastNum(splitArray(lastNum, type));
}

  //----------------------------------------RESET----------------------------------------------------

  const reset = () => {
    setLastNum([])
  }

  //--------------------------------------ELIMINATE DUPLICATED NUMBERS---------------------------------
  const uniqSort = function(arr) {
    const breadcrumbs = {}; 
    const result = []; 

    for(let i = 0; i < arr.length; i++) {
        if(!breadcrumbs[arr[i]]) { 
            console.log(`There is no other ${arr[i]} in the array, saving...`)
            result.push(arr[i]); 
            breadcrumbs[arr[i]] = true; 
                                        
        } 
    }
     setLastNum(result.sort((a,b) => a - b)); 
}

  const RandomNum = () => {
    AddRandomNum();
    setNum(Math.floor(Math.random()*90));
  }

  const AddRandomNum = () => {
   setLastNum([...lastNum, num])
  }

  console.log(lastNum)
 

  return(
    <div className="min-h-screen px-32 py-10 text-center 
    bg-gradient-to-r from-blue-800 via-purple-800 to-green-500 ">
      <div className="flex justify-center">
        <div className=" box-border h-50 w-40 p-4 border-4 border-black shadow-lg mb-3 bg-gradient-to-r from-blue-300 to-purple-400">
          <h2 className="font-bold subpixel-antialiased" >Random:</h2>
          <h3 className="py-4 text-4xl pt-1">{num}</h3>
          <button className="pt-2 bg-transparent hover:border-white text-black font-semibold 
          hover:text-white py-2 px-2 border border-black rounded" 
          onClick={RandomNum}>New num</button>
        </div>
      </div>
  
      <div className="p-5 border-4 border-black shadow-lg bg-gradient-to-r from-blue-300 to-purple-400 ">
        <h2 className="font-bold subpixel-antialiased">Numbers Register:</h2>
        <h3><RanNumList list={lastNum}/></h3>
        <div className="flex justify-center ">
          <button className="pt-2 bg-transparent hover:border-white text-black font-semibold
          hover:text-white py-2 px-2 mx-2 border border-black rounded" 
          onClick={() => sort('ASC')}>Sort Items ASC</button>

          <button className="pt-2 bg-transparent hover:border-white text-black font-semibold
          hover:text-white py-2 px-2 mx-2 border border-black rounded" 
          onClick={() => sort('DESC')}>Sort Items DESC</button>

        <button className="pt-2 bg-transparent hover:border-white text-black font-semibold
          hover:text-white py-2 px-2 mx-2 border border-black rounded" 
          onClick={() => uniqSort(lastNum)}>Delete duplicates</button>


          <button className="pt-2 bg-transparent hover:border-white text-black font-semibold
          hover:text-white py-2 px-2 mx-2 border border-black rounded" 
          onClick={reset}>Reset</button>
        </div> 
      </div>
    </div>
  )
    
}

export default App;
