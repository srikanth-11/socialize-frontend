import React, { useState } from 'react';

import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from '../../util/mypopup';

import axios from 'axios'

function DeleteButton ({id}) {
 const [confirmOpen, setConfirmOpen] = useState(false);
 
let token = localStorage.getItem('token')
 async function deletedata() {
  setConfirmOpen(false);
  const data = {
    id: id,
  };
  const result = await axios.delete(
    "https://sri-socialize.herokuapp.com/post/deletepost",
    {
      data,
      headers: {
        "Content-Type": "application/json",
        'authorization': token,
      },
    }
  );
  if (result) {
   window.location.reload();
  } else {
   
  }
}

 return (
  <>
    <MyPopup content="deletepost">
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
      onConfirm={deletedata}
    />
  </>
);
}
export default DeleteButton;