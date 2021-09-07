import React, { Component } from 'react'
import NavBar from './NavBar';
import {connect} from 'react-redux';
import {deleteproduct,gettotal} from './Action';
import {Button,Card,ListGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';
 
class Cart extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       total:0
    }
  }

  render() {
       var total1=0
       for (let i=0; i<this.props.products.length;i++)
       {
          total1=total1+this.props.products[i].product_totalprice
       }
       this.state.total=total1
       this.props.gtotal(total1)
       console.log(this.props.products)
    return (
      <div>
      <Helmet>
                <style>{'body { background-color: #f0f5f5; }'}</style>
            </Helmet>
            <NavBar />
           <h1>Item Details</h1>

<ListGroup horizontal style={{display:'flex',flexWrap:'wrap'}}>
           {this.props.products.map((veg,index)=>
              <ListGroup.Item key={index}>
                 <Card style={{ width: '16.6rem' }} >
                 {veg.product_name=='Onion'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img0.jpg"} />:null}
                  {veg.product_name=='Potato'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img1.jpg"} />:null}
                  {veg.product_name=='Lady Finger'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img2.jpg"} />:null}
                  {veg.product_name=='Brinjal'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img3.jpg"} />:null}
                  {veg.product_name=='Tomato'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img4.jpg"} />:null}
                  {veg.product_name=='Banana'?<Card.Img variant="top" 
                 src={process.env.PUBLIC_URL+"/img5.jpg"} />:null}
                 <Card.Body>
                   <div className="cartitem">
                   <Card.Title style={{color: "green"}}>Type:{veg.product_category}</Card.Title>
                   <Card.Text>{veg.product_name}</Card.Text>
                   <Card.Text>MRP Rs: {veg.product_price*veg.product_quantity} </Card.Text>
                   <Card.Text>Quantity: {veg.product_quantity} </Card.Text>
                   </div>
                   <Button type="button" variant="danger" 
                   onClick={()=>this.props.delete(veg.product_id)}>
                   DELETE</Button>
                   </Card.Body>
                  </Card>
                 </ListGroup.Item>
            )}
            </ListGroup>
            {
              this.state.total>0?<div className="total"><h6>Sub Total:{this.state.total}</h6><h6>Delivery Charge:30</h6><h6>Amount Payble:{this.state.total+30}</h6>
            </div>:<h1>Cart Empty</h1>
            }
            <Link to='/profile'>
            <Button className="cartbtn" type="button" variant="success">Place Order</Button>
            </Link>
           
            
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
const mapDispatchToProps = dispatch => {
  return {
    delete: (product_id) => dispatch(deleteproduct(product_id)),
    gtotal: (total) => dispatch(gettotal(total))
  }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(Cart);