import React, { useState } from 'react';

import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from '../../util/mypopup';

import axios from 'axios'

function DeleteCommentButton({ id, commentid }) {

  let token = localStorage.getItem('token')



  const [confirmOpen, setConfirmOpen] = useState(false);
  async function deletecomment() {
    setConfirmOpen(false);
    const data = {
      id: id,
      commentid: commentid,
      email: "kasireddysrikanth82@gmail.com"
    };
    const result = await axios.delete(
      "https://sri-socialize.herokuapp.com/post/deletecomment",
      {
        data,
        headers: {
          "Content-Type": "application/json",
          'authorization': token,
        },
      }
    );
    if (result) {

    } else {

    }
  }
  return (
    <>
      <MyPopup content="deletecomment">
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletecomment}
      />
    </>
  );
}
export default DeleteCommentButton;