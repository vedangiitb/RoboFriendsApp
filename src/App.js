import React, {Component} from "react";
import CardList from "./card-list";
import SearchBox from "./SearchBox";
import { robots } from "./robots";
import './App.css';
import Scroll from './Scroll';
import ErrorBoundry from "./ErrorBoundry";
class App extends Component {
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>{response.json();})
        .then(users =>{this.setState({robots:robots})})
    }

    onSearchChange = (event)=> {
        this.setState({searchfield: event.target.value})
    }
    render(){
        const filterRobots = this.state.robots.filter(robots =>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length===0){
            return <h1>Loading</h1>
        }else{
        return (
            <div className="tc">
            <h1 className="f2">RoboFriends</h1>
            <SearchBox searchChange = {this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
            <CardList robots={filterRobots}/>
            </ErrorBoundry>
            </Scroll>
            </div>
        );
        }
    }

}

export default App;