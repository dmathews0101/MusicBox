import React from "react";

import MainHeading from "./components/MainHeading";
import InputSearch from "./components/InputSearch.js";
import PostgresAlbums from "./components/PostgresAlbums.js";
import Albums from "./components/Albums.js";

import './App.css';



const token = "yUnnVXRpRpCAvYADxUYaAjKDVjWoPjhuZKyPWHJh";

const genre = [{
    key: "1",
    value: "Default"
    }, {
    key: "2",
    value: "Acoustique"
    }, {
    key: "3",
    value: "Classique"
    }, {
    key: "4",
    value: "Country"
    }, {
    key: "5",
    value: "Metal"
    }, {
    key: "6",
    value: "Pop/Dance"
    },{
    key: "7",
    value: "Rock"
}]


class App extends React.Component {
    state = {
        id: undefined,
        playlist_id: undefined,
        title: undefined,
        uri:undefined,
        master_id:undefined,
        error:""
    }

    getTracks = async (e) => {
        e.preventDefault();
        const searchinput = e.target.elements.searchinput.value;
        const genreinput = e.target.elements.genreinput.value;

        let genrenumberinput = 0
        genre.forEach(function(obj) { if(obj.value===genreinput)genrenumberinput = obj.key });

        const api_call = await fetch(`https://api.discogs.com/database/search?q=${searchinput}&genre=${genreinput}&per_page=5&page=1&token=${token}`)
        const data = await api_call.json();
        if(searchinput&&data.results[0]){
            this.setState({
                id: data.results[0].id,
                playlist_id: genrenumberinput,
                title: data.results[0].title,
                uri:data.results[0].uri,
                master_id:data.results[0].master_id,
                error:""
            });
        } else {
            this.setState({
                id: undefined,
                playlist_id: undefined,
                title: undefined,
                uri:undefined,
                master_id:undefined,
                error:"Enter Data"
            });
            alert("Please enter another input")
        }
    }

    render(){
        return(
            <div>
                <MainHeading />
                <InputSearch getTracks={this.getTracks}/>
                <PostgresAlbums
                id={this.state.id}
                playlist_id={this.state.playlist_id}
                title={this.state.title}
                uri={this.state.uri}
                master_id={this.state.master_id}
                error={this.state.error}
                />
            </div>
            );
        }
};

export default App;