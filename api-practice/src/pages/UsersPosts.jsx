import { baseService } from "../axios/baseService";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { Pencil, Trash } from "react-bootstrap-icons";
import {
  Row,
  Col,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

import { Layout } from "../components/Layout";
import { CreateModal } from "../components/CreateModal";
import { EditModal } from "../components/EditModal";
import { initialState } from "../InitialDatas";

export const UsersPosts = () => {
  const [posts, setPosts] = useState(initialState);
  const { id } = useParams();
  const [isDelteLoading,setDeleteloading]=useState(false)
  const [isCreateModal, setCreateModal] = useState(false);
  const toggle = () => setCreateModal(!isCreateModal);
  const[editingPostId,setEditingPostId]=useState()
  const handlePostCreateSuccess=()=>{
    toast('Post has been created successufully',{type:'success'})
    setCreateModal(false)
    getPosts()
  }
  const handleCreateModalClick = () => {
    setCreateModal(true);
  };
  const getPosts=()=>{
    console.log("Azer emindu");
    baseService.getAll(`users/${id}/posts`)
      .then((data) => {
        setPosts((oldData) => ({
          ...oldData,
          data: data,
          loading: false,
          error: undefined,
        }));
      })
      .catch((err) => {
        setPosts({ data: undefined, loading: false, error: err.toString() });
      });
  }
  useEffect(() => {
    getPosts()
  }, []);

  const handleEditClick = (id) => {
    setEditingPostId(id)
  };
  const handleDeleteClick = (id) => { 
    if (window.confirm('Are you sure you want to delete this post?')) {
      setDeleteloading(true)
      baseService.delete('posts',`${id}`).then(()=>{
        toast('Post has been deleted successufully',{type:'success'})
        getPosts()
      }).catch(()=>{
        toast(`Unexpected error occured,please try again later ...`,{type:'error'})
      }).finally(()=>{
        setDeleteloading(false)
      })
    }
    
  };
  const renderBody = () => {
    if (posts.loading) {
      return <Spinner />;
    } else if (posts.error) {
      return <h4 className="text-danger">Unexpected error occured :(</h4>;
    } else {
      return posts.data?.map(({ id, title, body }) => (
        <Card key={id} className="mt-3">
          <CardHeader>{title}</CardHeader>
          <CardBody>{body}</CardBody>
          <CardFooter className="d-flex justify-content-end align-items-center">
            <Button
              disabled={isDelteLoading}
              onClick={() => handleEditClick(id)}
              className="btn btn-primary"
            >
              <Pencil />
            </Button>
            <Button
              disabled={isDelteLoading}
              onClick={() => handleDeleteClick(id)}
              className="btn btn-danger ms-3"
            >
              <Trash />
            </Button>
          </CardFooter>
        </Card>
      ));
    }
  };

  return (
    <Layout>
      <Row>
        <Col className="d-flex justify-content-end" xs={12}>
          <Button className="btn-success" onClick={handleCreateModalClick}>
            Create
          </Button>
        </Col>
      </Row>
      <Row>
        <Col ms={12}>{renderBody()}</Col>
      </Row>
      <ToastContainer />
      <CreateModal onPostCreateSuccess={handlePostCreateSuccess} isOpen={isCreateModal} toggle={toggle} />
      <EditModal id={editingPostId} isOpen={!!editingPostId} toggle={()=>setEditingPostId(undefined)}/>
    </Layout>
  );
};
