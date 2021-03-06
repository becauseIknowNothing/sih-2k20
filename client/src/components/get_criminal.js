import React, { Component } from 'react'
import axios from './axios'
import CriminalCard from './Cards/CriminalCard';
import {Row,Container,Col} from 'react-materialize';
import {Link} from 'react-router-dom';
import _Header from './header';

/*
 {
     username: 
     id:
     status:
     name:
     mark:
 }
*/

export default class get_criminal extends Component {
    state = {
        criminals: []
    }

    componentDidMount(){
        axios.get('http://localhost:3001/login/get_criminal?username=abc').then(res => {
            this.setState({
                criminals : res.data.data
            })
        })
    }

    handleDelete = (id) =>{
        axios.get('http://localhost:3001/login/delete_criminal?id='+id)
        let temp = this.state.criminals.filter(criminal => id!=criminal.id)
        this.setState({
            criminals: temp
        })
    }

    render() {
        if(this.state.criminals.length === 0){
            return (
                <React.Fragment></React.Fragment>
            )
		}
		const columns = this.state.criminals.map( (criminal, i) =>{
			return (
				<Col l={4} m={4} s={12} key={i}>
                	<CriminalCard 
                        criminalName={criminal.name} 
                        criminalId={criminal.id} 
                        criminalStatus={criminal.status} 
                        criminalMark = {criminal.mark}
                        imgUrl={criminal.url}
                        i= {i}
                        handleDelete={this.handleDelete}
                    />
            	</Col>
			)
		})
		
		return (
            <>
            <_Header header="Criminals List" />
			<div className="criminalListBody">
				
				<Container>
					<Row>
						{columns}
					</Row>
				</Container>

                <Link to="/login/add_criminal" className="goToAdd">Add Criminals</Link>
			</div>
            </>
		);
    }
}
