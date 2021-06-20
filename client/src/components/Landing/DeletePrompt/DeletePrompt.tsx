import React, { useState, FC } from 'react';
import { Button, Typography, Icon, Modal } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ComponentHandler, Device } from '@types';
import axios from 'instance';

interface DeletePromptProps {
  data: Device[];
  rowData: Device;
  setData: ComponentHandler<Device[]>;
}
const DeletePrompt: FC<DeletePromptProps> = ({ data, rowData, setData }) => {
  const [open, setOpen] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [disable, setDisable] = useState(false);

  const handleDelete = (deviceeui: string) => {
    setDisable(true);
    const endpoint = '/devices/delete/' + deviceeui;
    axios
      .delete(endpoint)
      .then(() => {
        const index = data.findIndex(d => d.Deviceeui === rowData.Deviceeui);
        const updatedDevices = [...data];
        updatedDevices.splice(index, 1);
        setOpen(open => !open);
        setDeleteMessage('');
        setDisable(false);
        setData(updatedDevices);
      })
      .catch(err => {
        setDeleteMessage('Cannot Delete Device');
        setDisable(false);
      });
  };

  return (
    <Modal
      onClose={
        !disable
          ? () => setOpen(open => !open)
          : () => {
              return;
            }
      }
      open={open}
      style={{ height: 'auto', top: 'auto', left: 'auto' }}
    >
      <>
        <Typography variant='h1'> Delete Device </Typography>
        <div>
          {deleteMessage !== '' ? (
            <Alert severity='warning' style={{ textAlign: 'center' }}>
              {deleteMessage}
            </Alert>
          ) : null}
          Are you sure you want to delete {rowData.Deviceeui}?
        </div>
        <Button onClick={() => setOpen(open => !open)} color='secondary'>
          {/* <Icon name='remove' /> No */} No
        </Button>
        <Button disabled={disable} onClick={() => handleDelete(rowData.Deviceeui)} color='primary'>
          {/* <Icon name='checkmark' /> Yes */} Yes
        </Button>
      </>
    </Modal>
  );
};

export { DeletePrompt };
