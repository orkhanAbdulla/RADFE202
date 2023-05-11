import { useState,useEffect } from "react";
import { baseService } from "../axios/baseService";
import { initialState,initalCreateState } from "../InitialDatas";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Spinner,
} from "reactstrap";

export const EditModal = ({ isOpen, toggle, id }) => {
  const [postData, setPostData] = useState(initialState);
  const [editPostData,setEditPostData]=useState({})
  const [isEditLoading,setEditLoading]=useState(false)
 const getData=()=>{
  setPostData((oldData) => ({
    ...oldData,
    data: undefined,
    loading: true,
    error: undefined,
  }));
   baseService.getAll(`posts/${id}`).then((data) => {
    setEditPostData({...data});
    setPostData((oldData) => ({
      ...oldData,
      data: data,
      loading: false,
      error: undefined,
    }));
    
  }).catch((error)=>{
    setPostData({data:undefined,loading:false,error:error.toString()})
  })
 }

 useEffect(() => {
  if( Boolean(id)){
    getData()
  }
 }, [id])


  const handleInputChange=(ev,type)=>(
    setEditPostData((oldData)=>({...oldData,[type]:ev.target.value}))
  )
  const renderBody=()=>{
    if(postData.loading){
      return <Spinner/>
    }
    else if(postData.error){
      return <h4 className="text-danger">Error occured</h4>
    }
    else{
      return(
          <>
          <Input
            value={editPostData.title}
            onChange={(ev) => handleInputChange(ev, "title")}
            placeholder="Post tilte"
          />
          <Input
            value={editPostData.body}
            onChange={(ev) => handleInputChange(ev, "body")}
            className="mt-3"
            placeholder="Post body"
          />
          </>
      )
    }
  }
  const handlePostCreate=()=>{

  }
  return (
    <>
      <Modal centered isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Post</ModalHeader>
        <ModalBody>
        {renderBody()}
        </ModalBody>
        <ModalFooter>
          <Button
            // disabled={isCreateLoading}
            onClick={handlePostCreate}
            color="primary"
          >
            Edit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
