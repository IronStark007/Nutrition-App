import React,{Component} from 'react'

export default class Food extends Component{

    constructor(props){
        super(props);

        this.state={
            foodArray:[],
            searchingFood:[],
            currentFood:{
                name:0,
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
                weight:100,
            }
        }
    }

    serchfood(value){
        if (value!==""){
            let searchArray=this.state.foodArray.filter((food,index)=>{
                return food.name.toLowerCase().includes(value.toLowerCase());
            })
            this.setState({searchingFood:searchArray});
        }
        else{
            this.setState({searchingFood:[]});
        }
        
    }

    selectfood(value){
        this.setState({currentFood:value});
    }

    calculateChanges(weight){
        let currfood=this.state.currentFood;
        if (weight !=="" && weight!==0){
            currfood.calories=Number((currfood.calories*weight)/currfood.weight);
            currfood.protein=Number((currfood.protein*weight)/currfood.weight);
            currfood.carbs=Number((currfood.carbs*weight)/currfood.weight);
            currfood.fats=Number((currfood.fats*weight)/currfood.weight);
            currfood.weight=Number(weight);
            this.setState({currentFood:currfood});
        }
    }
    
    componentDidMount(){
        fetch("http://localhost:8000/food")
        .then((response=>response.json()))
        .then((foodResponse)=>{
            console.log(foodResponse);
            this.setState({foodArray:foodResponse.Foods});
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    render(){
        return(
            <div className="container">
                <div className="form-group" style={{marginTop:"30px"}}>
                    <input type="text" className="form-control" placeholder="Search Food" onChange={(event)=>{
                        this.serchfood(event.target.value)
                    }}/>
                </div> 
                <div className="search-result">
                    {
                        this.state.searchingFood.map((food,index)=>(
                            <div className="result" style={{cursor:"pointer"}} onClick={()=>{this.selectfood(food)}} key={index}>
                                {food.name}
                            </div>
                        ))
                    }
                </div>
                <div className="product-display">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Calories</th>
                                <th>Protein</th>
                                <th>Carbs</th>
                                <th>Fat</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>{this.state.currentFood.name}</th>
                                <th>{this.state.currentFood.calories.toFixed(2)}</th>
                                <th>{this.state.currentFood.protein.toFixed(2)}</th>
                                <th>{this.state.currentFood.carbs.toFixed(2)}</th>
                                <th>{this.state.currentFood.fats.toFixed(2)}</th>
                                <th><input type="number" defaultValue={this.state.currentFood.weight} 
                                onChange={(event)=>{this.calculateChanges(Number(event.target.value));}}/> </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}