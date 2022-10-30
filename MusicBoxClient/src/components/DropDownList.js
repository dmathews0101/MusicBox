import React from "react";


class DropDownList extends React.Component {
    constructor(props){
        super(props)
    }

    render(){

        const option_list=[]

        for(const [index, one_item] of this.props.options.entries()){
            option_list.push(<option value={one_item.value}>{one_item.label}</option>)
        }

        return(
            <span>
                <label>{this.props.text}</label>
                <select name={this.props.name} id={this.props.id}>
                    {option_list}
                </select>
            </span>
        )
    }
}

export default DropDownList;