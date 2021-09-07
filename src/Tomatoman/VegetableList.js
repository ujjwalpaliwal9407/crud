import React, { Component } from 'react'
import axios from 'axios';
import Stepper from './Stepper';
import {  Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {addproduct} from './Action';
import {Button,Card,ListGroup,Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Data from './Data.json';
// var update = require('immutability-helper');

 class VegetableList extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null)
        {
            loggedIn = false
        }
        else
        {
            console.log(token)
        }

        this.state = {
             vegetables:[],
             quantity:0,
             total:[],
             state1:[],
             loggedIn
        }
    }
    parentHandler=(count)=>{
      this.state.quantity=count
      console.log(this.state.quantity);
      return this.state.quantity;
  }

    componentDidMount()
    {
       
        console.log("calling componentDidMount",this.props.products)
        axios.get("http://tomatoman.pythonanywhere.com/items/items/").then(response =>{
            //console.log(response.data)
            this.setState({
                vegetables:response.data
            })
        }).catch(error =>{
            console.log(error)
        })
    }
    submitHandler = (veg) => {
      // console.log(veg)
     
      let total = (veg.price*this.state.quantity);
      // this.state.total.push(total)
      
        const data = {
          product_name: veg.name,
          product_price: veg.price,
          product_category: veg.category,
          product_quantity: this.state.quantity,
          product_totalprice: total
      }
      console.log("Total:",total)
      this.props.add(data)
      
  } 
    
  render() {
    console.log("12182738127398172")
    if(this.state.loggedIn === false)
    {
        console.log(this.state.loggedIn)
        return <Redirect to ='/vegetable' />
    }
    return (
      <div >
            <Navbar bg="dark" expand="lg" fixed="top">
                    <Navbar.Brand href="#home" style={{ color: 'white', fontSize: 22 }}>TomatoMan</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                            <Nav.Link href="/vegetable" style={{ color: 'white', fontSize: 20 }}><b>Menu</b></Nav.Link>
                            <Nav.Link href="/profile" style={{ color: 'white', fontSize: 20 }}><b>Profile</b></Nav.Link>
                            <Nav.Link href="/history" style={{ color: 'white', fontSize: 20 }}><b>History</b></Nav.Link>
                            <Nav.Link href="/cart" style={{ color: 'white', fontSize: 20 }}><b>Cart</b></Nav.Link>
                            {/* <Nav.Link href="/payment" style={{ color: 'white', fontSize: 20 }}><b>Payments</b></Nav.Link> */}
                            <Nav.Link className="logout" href="/logout" style={{ color: 'white', fontSize: 20, float: 'right' }}><b>Logout</b></Nav.Link>
                                    {/* <Nav.Link href="" style={{ marginRight: 20 }}>
                      <Link to='/cart' style={{ color: 'white', fontSize: 20, textDecoration: 'none' }}>
                        <b>Cart</b>
                      </Link>
                    </Nav.Link> */}
                            </Nav>
                            </Navbar.Collapse>
                        </Navbar>
            <ListGroup horizontal style={{display:'flex',flexWrap:'wrap',marginTop:60}}>
           {Data.map((veg,index)=>
              <ListGroup.Item key={index}>
                 <Card className="card" style={{ width: '16.6rem' }} >
                 {index===0?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img0.jpg"} />:null}
                  {index===1?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img1.jpg"} />:null}
                  {index===2?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img2.jpg"} />:null}
                  {index===3?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img3.jpg"} />:null}
                  {index===4?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img4.jpg"} />:null}
                  {index===5?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img5.jpg"} />:null}
                 {console.log(index)}
                 <Card.Body>
                   <div className="edit">
                   <Card.Title style={{color: "green"}}>Type:{veg.category}</Card.Title>
                   <Card.Text>{veg.name}</Card.Text>
                   <Card.Text>MRP Rs. {veg.price}</Card.Text>
                   <Stepper className="add" clickHandler={this.parentHandler}/>
                   </div>
                  
                   <Button type="button" variant="primary" 
                   onClick={()=>this.submitHandler(veg)}>
                   ADD TO CART</Button>
                   </Card.Body>
                  </Card>
                 </ListGroup.Item>
            )}
            </ListGroup>
            <Link to="/cart">
            <Button variant="secondary" style={{marginBottom:10}}>Go To Cart</Button>{' '}
            </Link>
           </div>
    )
  }
}

function mapStateToProps(state){
     return {
    products: state.VegetableReducer.productList
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    add: (data) => dispatch(addproduct(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(VegetableList);

