import React, { Component } from 'react'
// import { BrowserRouter as Router , Route, Link, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteproduct} from './Action';
import {Button,Card,ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
class Cards extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       getVeg : [],
       total:0
    }
  }
  componentDidMount(){
    this.setState({
      getVeg:this.props.products
    });
  }
  render() {
       console.log(this.props.products)
    return (
      <div>
           <h1>Item Details</h1>
      

<ListGroup horizontal style={{display:'flex',flexWrap:'wrap'}}>
           {this.props.products.map((veg,index)=>
              <ListGroup.Item key={index}>
                 <Card style={{ width: '18rem' }} >
                 <Card.Img variant="top" 
                 src={"https://www.wlns.com/wp-content/uploads/sites/50/2020/10/vegetables.jpg" } />
                 <Card.Body>
                   <Card.Title>Name:{veg.product_name}</Card.Title>
                   <Card.Text>Price in Rs: {veg.product_price*veg.product_quantity} per kg</Card.Text>
                   <Card.Text>category: {veg.product_category} </Card.Text>
                   <Card.Text>quantity: {veg.product_quantity} </Card.Text>
                   {/* {
                     this.state.total=this.state.total+(veg.product_price*veg.product_quantity)
                   } */}
                   {/* {console.log(this.state.total)} */}
                   {/* <Card.Text>status: {veg.product_status} </Card.Text> */}
                   <Button type="button" variant="danger" 
                   onClick={()=>this.props.delete(veg.product_id)}>
                   DELETE</Button>
                   </Card.Body>
                  </Card>
                 </ListGroup.Item>
            )}
            </ListGroup>
            <h1>total={this.state.total}</h1>
            <Link to='/Profile'>
            <Button type="button" variant="secondary">
                   Place Order</Button>
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
const mapDispatchToProps = dispatch => {
  return {
    delete: (product_id) => dispatch(deleteproduct(product_id))
  }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Cards);