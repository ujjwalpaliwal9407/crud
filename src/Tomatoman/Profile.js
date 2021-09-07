import React, { Component } from 'react'
import {Button,Form} from 'react-bootstrap';
import NavBar from './NavBar';
import {Link} from 'react-router-dom'
import axios from 'axios';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
             fullname:"",
             contact:"",
             address:"",
             landmark:"",
             senddetails: []
        }
        this.onHandleChange=this.onHandleChange.bind(this);
        this.placeOrder=this.placeOrder.bind(this);
    }

    onHandleChange(e){
        const name=e.target.name;
        const value=e.target.value;
        this.setState({
            [name]:value
        })
    }

    componentDidMount(){
       console.log(this.props.products)
       let data = this.props.products
       let dic = {}
       for (let i=0; i<data.length; i++)
       {
           dic["item"]=data[i].product_name
           dic["price"]=data[i].product_totalprice
           dic["quantity"]=data[i].product_quantity
           this.state.senddetails.push(dic)
       }
       
       var fullname = localStorage.getItem("fullname");
       var contact = localStorage.getItem("contact");
       var address = localStorage.getItem("address");
       var landmark = localStorage.getItem("landmark");
       this.setState({
           fullname:fullname,
           contact:contact,
           address:address,
           landmark:landmark
       })
    }
    
  sendUserDetails(){
    let dic = {
      fullname: this.state.fullname,
      address: this.state.address,
      landmark:this.state.landmark,
      mobile: this.state.contact
          
      }
  axios.post("http://tomatoman.pythonanywhere.com/items/customer/",dic)
  .then(response => {
      console.log(response)
      this.placeOrderDetails()

  }).catch(error => {
      console.log(error)
  })
   
  this.setState(this.initialState)
  localStorage.setItem("fullname",this.state.fullname);
  // localStorage.setItem("contact",this.state.contact);
  localStorage.setItem("address",this.state.address);
  localStorage.setItem("landmark",this.state.landmark);
  }

  placeOrderDetails(){
    console.log(this.state.senddetails)
    let dic = {
      "order": {
      customer: this.state.contact,
      date: "2021-01-29T06:00:11Z",
      payment_mode: "Pay On Delivery",
      payment_status: "Received",
      total_amount: this.props.gtotal
  },
  "items": this.state.senddetails
  }
  axios.post("http://tomatoman.pythonanywhere.com/items/place_order/",dic)
  .then(response => {
      console.log(response.data)
      this.props.history.push('/history');
  }).catch(error => {
      console.log(error)
  })
  }


  placeOrder(e)
  {
      e.preventDefault()
      console.log(this.state)
      // user detail api
      this.sendUserDetails()
      alert("Your order is placed!!!!")
      
      
  }  
  render() {
    return (
      <div style={{marginTop:'60px',maxWidth:"500px"}} className="center container">
          <Helmet>
                <style>{'body { background-color: #f0f5f5; }'}</style>
            </Helmet>
          <NavBar />
          <Form onSubmit={this.placeOrder} style={{marginTop:65}}>
  <Form.Group controlId="formFullName">
    <>Full Name:</>
    <Form.Control type="text" placeholder="Enter full name" 
    name="fullname"
    value={this.state.fullname}
    onChange={this.onHandleChange} />
  </Form.Group>

  <Form.Group controlId="formContact">
    <>Contact:</>
    <Form.Control type="text" placeholder="Enter contact"
    name="contact"
    value={this.state.contact}
    onChange={this.onHandleChange} />
  </Form.Group>

  <Form.Group controlId="formAddress">
    <>Address:</>
    <Form.Control type="text" placeholder="Enter address" 
     name="address"
     value={this.state.address}
     onChange={this.onHandleChange} />
  </Form.Group>

  <Form.Group controlId="formAddress">
    <>Land Mark:</>
    <Form.Control type="text" placeholder="Enter landmark" 
    name="landmark"
    value={this.state.landmark}
    onChange={this.onHandleChange}/>
  </Form.Group>
  
 <Link to='payment'> 
 <Button variant="success" type="submit">
    Order
  </Button>
  </Link>
</Form>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
     products: state.VegetableReducer.productList,
     gtotal: state.totalReducer.total
  }
}
export default connect(mapStateToProps)(Profile);