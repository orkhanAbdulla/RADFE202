import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { initalCreateState } from "../InitialDatas";
import axios from "axios";
export const CreateModal = (props) => {
  const [createPostData, setCreatePostData] = useState(initalCreateState);
  const [isCreateLoading,setCreateLoading]=useState(false)

  const handleInputChange=(ev,type)=>{
    setCreatePostData((oldData)=>({...oldData,[type]:ev.target.value}))
  }
  const handlePostCreate=()=>{
    setCreateLoading(true)
    axios.post('https://jsonplaceholder.typicode.com/posts',createPostData).then(()=>{
      props.onPostCreateSuccess()
      setCreatePostData(initalCreateState)
    }).catch(()=>{

    }).finally(()=>{
      setCreateLoading(false)
    })
  }
  return (
    <>
      <Modal centered {...props}>
        <ModalHeader toggle={props.toggle}>Create Post</ModalHeader>
        <ModalBody>
          <Input value={createPostData.title} onChange={(ev)=>(handleInputChange(ev,'title'))} placeholder="Post tilte" />
          <Input value={createPostData.body} onChange={((ev)=>handleInputChange(ev,'body'))}className="mt-3" placeholder="Post body" />
        </ModalBody>
        <ModalFooter>
          <Button disabled={isCreateLoading} onClick={handlePostCreate} color="primary">Create</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
