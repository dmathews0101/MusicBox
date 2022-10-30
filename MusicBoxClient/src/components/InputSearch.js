import React from "react";


const OPTIONS = [{
    label: "Default",
    value: "1"
    }, {
    label: "Acoustique",
    value: "2"
    }, {
    label: "Classique",
    value: "3"
    }, {
    label: "Country",
    value: "4"
    }, {
    label: "Metal",
    value: "5"
    }, {
    label: "Pop",
    value: "6"
    },{
    label: "Rock",
    value: "7"
    }]

    class SelectList extends React.Component {
        constructor(props){
            super(props)
        }

        render(){
            const option_list=[]

            for(const [index, one_item] of this.props.options.entries()){
                option_list.push(<option value={one_item.label}>{one_item.label}</option>)
            }

            return(
                <div>
                    <select name={this.props.name} id={this.props.id}>
                        {option_list}
                    </select>
                </div>
            )
        }
    }

class InputSearch extends React.Component {
    render(){
        return (
            <div>
            <fieldset className="darkbluetable"><p><h4>Search on discogs</h4></p>
            <form onSubmit={this.props.getTracks}>
                        <div className="bluetable">
                            <div><input className="form-control" type ="text" name="searchinput" placeholder="Search..." /></div>
                            <div><SelectList name="genreinput" text=" " id = "genre_div" options={OPTIONS} /></div>
                            <div><button className="btn btn-default"><span className="glyphicon glyphicon-search"></span> Search</button></div>
                        </div>
            </form>

            </fieldset>
            </div>
        );
    }
};

export default InputSearch;