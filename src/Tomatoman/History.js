import React, { Component } from 'react'
import {Table} from 'react-bootstrap';
import axios from 'axios';
import NavBar from './NavBar';
import {Helmet} from 'react-helmet';
export default class History extends Component {

 constructor(props) {
   super(props)
   let mobile=localStorage.getItem("contact")
   this.state = {
     details:[],
     mobile
   }
 }
  
  componentDidMount(){
    let dic = {
      customer_id:this.state.mobile 
    }
    axios.post("http://tomatoman.pythonanywhere.com/items/order_api/mobile/",dic)
    .then(response => {
        console.log(response.data)
        let data = response.data
        // console.log(data)
        this.setState({
          details:data
        })
    }).catch(error => {
        console.log(error)
    })   
  }
    
  render() {
    return (
      
      <div style={{marginTop:60}}>
            <Helmet>
                <style>{'body { background-color: #f0f5f5; }'}</style>
            </Helmet>
           <NavBar />
           <div style={{border:'1px solid black',width:500,margin:'auto',
           backgroundColor:'#636161',color:'gainsboro'}}>
            <h1>History</h1>
           
              {this.state.details.map((h)=>
               <Table style={{backgroundColor:'#E8E8E8',color:'black'}}>
                    <tr>
                    <th>Order</th>
                    <td>{h.date} </td>
                  </tr>
                  <tr>
                    <th>Payment Mode:- </th>
                    <td>{h.payment_mode} </td>
                  </tr>
                  <tr>
                    <th>Payment Status:-</th>
                    <td>{h.payment_status} </td>
                  </tr>
                  <tr>
                    <th>Total Price in  Rs:-</th>
                    <td>{h.total_amount} </td>
                  </tr>
                  </Table>
              )}
        </div>
      </div>
    )
  }
}
