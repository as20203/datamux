import React, { useState, useEffect } from 'react';
import './SendCommandPrompt.css';
import axios from 'instance';
import { SendCommandForm } from 'components';
import { useForm } from 'CustomHooks';

const SendCommandPrompt = props => {
  const [disable, setDisable] = useState(false);
  const [message] = useState('');
  const [open, setOpen] = useState(false);
  const [sendCommandForm, updateSendCommandForm, sendCommandFormHandler] = useForm({
    DeviceEui: '',
    value: '',
    Command: '',
    Server: '',
    AccessToken: '',
    Devicetype: ''
  });

  const onSubmit = async e => {
    try {
      e.preventDefault();
      setDisable(true);
      const result = await axios.post(`/devices/downlink`, {
        ...sendCommandForm,
        Command: Number(sendCommandForm.Command)
      });
      setDisable(false);
    } catch (error) {
      setDisable(false);
    }
  };
  const saveForBulk = async e => {
    try {
      e.preventDefault();
      const { Server, value, Command } = sendCommandForm;
      props.setData(data => {
        const updatedData = [...data];
        const foundIndex = updatedData.findIndex(
          ({ Deviceeui }) => Deviceeui === props.rowData.Deviceeui
        );
        if (foundIndex !== -1)
          updatedData[foundIndex] = {
            ...updatedData[foundIndex],
            checked: true,
            Server,
            value,
            Command
          };
        return updatedData;
      });
    } catch (error) {}
  };

  useEffect(() => {
    const { Deviceeui, AccessToken, Devicetype } = props.rowData;
    updateSendCommandForm(form => {
      return { ...form, DeviceEui: Deviceeui, AccessToken, Devicetype };
    });
  }, [props, updateSendCommandForm]);
  return (
    <SendCommandForm
      saveForBulk={saveForBulk}
      sendCommandForm={sendCommandForm}
      updateSendCommandForm={updateSendCommandForm}
      sendCommandFormHandler={sendCommandFormHandler}
      disable={disable}
      message={message}
      onSubmit={onSubmit}
      open={open}
      setOpen={setOpen}
    />
  );
};
export { SendCommandPrompt };
