import React from "react";
import moment from "moment";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PostCard = ({
  post: { body, id, username, createdAt, likeCount, commentCount, likes },
}) => {

    const likePost = () => {
        console.log('like')
    }

    const commentOnPost = () => {
        console.log('comment')
    }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
            
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentOnPost}>
          <Button color="teal" basic>
            <Icon name="comment" />
            
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
