import React from "react";

const axios = require('axios');

class Track extends React.Component{
    AddToDb = () => {
            console.log('Button Clicked')
            axios.post('http://localhost:3001/track', {
                playlist_id:this.props.playlist_id,
                title:this.props.title,
                uri:this.props.uri,
                master_id:this.props.master_id
              })
              .then(function (response) {
                console.log(response);
                alert('Row Added Successfully')
                window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });
      }

    render(){
        return(
           <div>
           {this.props.id && <fieldset className="darkcoraltable"> <div className={"coraltable"}><p>Track Details</p>
           {this.props.id && <p>id: {this.props.id}</p>}
           {this.props.playlist_id && <p>Playlist_id:  {this.props.playlist_id }</p>}
           {this.props.title && <p>Title: { this.props.title }</p>}
           {this.props.uri && <p>uri: { this.props.uri }</p>}
           {this.props.master_id && <p>master_id: { this.props.master_id }</p>}
           {this.props.error && <p>{this.props.error}</p>}

           <button type="button" className="btn btn-default" onClick={this.AddToDb} >Add to Db</button>
           </div>
           </fieldset>}
       </div>
        );
    }
};

export default Track;