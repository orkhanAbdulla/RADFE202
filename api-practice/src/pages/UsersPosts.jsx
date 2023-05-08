import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Row, Col, Spinner, Card, CardHeader, CardBody } from "reactstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const UsersPosts = () => {
  let initialState = {
    data: undefined,
    error: undefined,
    loading: true,
  };
  const [posts, setPosts] = useState(initialState);
  const { id } = useParams();
  useEffect(() => {
    console.log("Azer emindu");
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then(({ data }) => {
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
  }, [id]);
  const renderBody=()=>{
    if(posts.loading){
        return <Spinner/>
    }
    else if(posts.error){
        return <h4 className="text-danger">Unexpected error occured :(</h4>
    }
    else{
        return(
            posts.data?.map(({title,body})=>(
                <Card className="mt-3">
                     <CardHeader>{title}</CardHeader>
                     <CardBody>{body}</CardBody>
                </Card>
             ))
        )
    }
  }

  return (
    <Layout>
      <Row>
        <Col ms={12}>
        {renderBody()}
        </Col>
      </Row>
    </Layout>
  );
};
