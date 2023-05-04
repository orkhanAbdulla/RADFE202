import logo from "./logo.svg";
import "./App.css";
import {
  Container,
  Row,
  Col,

} from "reactstrap";
import MyForm from "./componets/Form";
import ProductTable from "./componets/ProductTable";
import { useState } from "react";
function App() {
const [products,setProducts] = useState([])
let productObj ={
  name:undefined,
  price:undefined,
  count:undefined
} 
const [poductObj, setPoductObj] = useState(productObj);

///set inputs value func
const handleInputs=(value,type)=>{
  setPoductObj((oldData)=>({...oldData,[type]:value}))
}
///add product obj to products state
const addProduct=()=>{
  setProducts([...products,poductObj])
}

  return (
    <Container>
      <Row>
        <Col md={5}>
          <MyForm handleInputs={handleInputs} addProduct={addProduct}/>
        </Col>
        <Col md={5}>
          <ProductTable data={products} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
