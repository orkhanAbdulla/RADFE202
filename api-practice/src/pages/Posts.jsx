import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import {
  Row,
  Col,
  Input,
  Card,
  CardHeader,
  CardBody,
  Spinner,
} from "reactstrap";
import { baseService } from "../axios/baseService";
import { initialState } from "../InitialDatas";
import { useNavigate } from "react-router-dom";
export const PostsPage = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(document.location.search);
  const searchId=searchParams.get("userId")
  const [selectedUserId, setSelectedUserId] = useState(searchId);
  const [usersData, setUserData] = useState(initialState);
  const [postsByUserId, setPostsByUserId] = useState(initialState);
  const getUsers = () => {
    setUserData((oldData) => ({
      ...oldData,
      loading: true,
      data: undefined,
      error: undefined,
    }));
    baseService
      .getAll("users")
      .then((data) => {
        setUserData((oldData) => ({
          ...oldData,
          loading: false,
          data: data,
          error: undefined,
        }));
        if (selectedUserId === null) {
          setSelectedUserId(data[0].id);
        }
      })
      .catch((response) => {
        setUserData((oldData) => ({
          ...oldData,
          loading: false,
          data: undefined,
          error: response.toString(),
        }));
      });
  };
  const getPostsByUserId = () => {
    if (Boolean(selectedUserId)) {
      setPostsByUserId((oldData) => ({
        ...oldData,
        loading: true,
        data: undefined,
        error: undefined,
      }));
      baseService
        .getAll(`posts?userId=${selectedUserId}`)
        .then((data) => {
          setPostsByUserId((oldData) => ({
            ...oldData,
            loading: false,
            data: data,
            error: undefined,
          }));
        })
        .catch((response) => {
          setPostsByUserId((oldData) => ({
            ...oldData,
            loading: false,
            data: undefined,
            error: response.toString(),
          }));
        });
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    getPostsByUserId();
  }, [selectedUserId]);

  const haldeUserIdChange = (ev) => {
    setSelectedUserId(ev.target.value);
    navigate(`?userId=${ev.target.value}`);
  };
  const renderSelectOption = () => {
    if (usersData.data) {
      return usersData.data.map(({ id, name }) => (
        <option value={id}>{name}</option>
      ));
    }
  };
  return (
    <Layout>
      <Row className="my-3">
        <Col xs={12}>
          <Input
            type="select"
            disabled={usersData.loading || usersData.error}
            value={selectedUserId}
            onChange={haldeUserIdChange}
          >
            {renderSelectOption()}
          </Input>
        </Col>
      </Row>
      <Row>
        {postsByUserId.loading && <Spinner />}
        {postsByUserId.error && <h5 color="red">Error occured ....</h5>}
        {postsByUserId.data &&
          postsByUserId.data.map(({ id, title, body }) => (
            <Col xs={12}>
              <Card key={id} className="mt-3">
                <CardHeader>{title}</CardHeader>
                <CardBody>{body}</CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </Layout>
  );
};
