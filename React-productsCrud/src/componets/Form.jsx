import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
function MyForm({ handleInputs,addProduct }) {

  return (
    <Form>
      <FormGroup>
        <Label for="ProductName">Product Name</Label>
        <Input type="text" id="ProductName" name="ProductName" onChange={(e)=>handleInputs(e.target.value.trim(),'name')} />
      </FormGroup>
      <FormGroup>
        <Label for="ProductPrice">Product Price</Label>
        <Input type="text" id="ProductPrice" name="ProductPrice"  onChange={(e)=>handleInputs(e.target.value.trim(),'price')}/>
      </FormGroup>
      <FormGroup>
        <Label for="ProductCount">Product Count</Label>
        <Input type="text" id="ProductCount" name="ProductCount" onChange={(e)=>handleInputs(e.target.value.trim(),'count')} />
      </FormGroup>
      <Button onClick={addProduct} color="primary" >Click Me</Button>
    </Form>
  );
}

export default MyForm;
