import React from "react";
import ReactDOM from 'react-dom';


const axios = require('axios');

var newtrackarray = [];

    axios.get('http://localhost:3001/track')
      .then(function (response) {
        // handle success
        console.log('-----<<<<---------')
        console.log(response);
        newtrackarray =response.data;
        console.log(newtrackarray)
        ReactDOM.render(<TracksB name="tracks" text="My Playlist" id = "tracks_div" options={newtrackarray} />, document.getElementById('root3'));
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Request was sent, some response received!")
      });


    class TracksB extends React.Component {
        constructor(props){
            super(props)
        }

        deleteclick = (id) => {
            console.log(id)
            console.log(id+'delete button is clicked')

            axios.delete('http://localhost:3001/track/'+id).then(function (response) {
                alert('Row Deleted Successfully')
                window.location.reload();
            })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                // always executed
                console.log("Delete Request")
              });
        }

        showclick = (uri) => {
            window.location.href='https://www.discogs.com'+uri
        }

        render(){

            console.log(this.props)
            console.log(this.props.options)

            const track_list=[]

            track_list.push(<tr><th>ID</th><th>Playlist_id</th><th>Title</th><th>URI</th><th>Master_id</th><th>Delete Row</th><th>Info</th></tr>)
            for(const [index, one_item] of this.props.options.entries()){
                track_list.push(<tr><td>{one_item.id}</td><td>{one_item.playlist_id}</td><td>{one_item.title}</td><td>{one_item.uri}</td><td>{one_item.master_id}</td><td><button className="btn btn-default" id = {"btn"+one_item.id} type="button" onClick={()=>this.deleteclick(one_item.id)}>Delete</button></td><td><button className="btn btn-default" type="button" onClick={()=>this.showclick(one_item.uri)}>Discogs link</button></td></tr>)
            }
            console.log(track_list);
            return(
                <div>
                    <fieldset className="darkgreytable">
                    <p>{this.props.text}</p>
                    <table className="greytable" name={this.props.name} id={this.props.id}>
                        {track_list}
                    </table>
                    </fieldset>
                </div>
            )
        }
    }

export default TracksB;