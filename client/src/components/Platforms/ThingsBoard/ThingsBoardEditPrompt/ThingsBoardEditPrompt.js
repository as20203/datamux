import React, { useState, useEffect } from 'react';
import { EditForm } from 'components';
import { useForm } from 'CustomHooks';

const ThingsBoardEditPrompt = props => {
  const [disable, setDisable] = useState(false);
  const [message] = useState('');
  const [open, setOpen] = useState(false);
  const [
    editDevice,
    updateDevice,
    editDeviceHandler,
    checkBoxHandler,
    handleEndpointChange,
    addEndpoint,
    removeEndpoint
  ] = useForm({
    deviceUI: '',
    deviceType: '',
    AccessToken: '',
    endpoint: [],
    InclRadio: '',
    RawData: '',
    customer: ''
  });

  useEffect(() => {
    const setEndpoint = () => {
      const endpointType = props.rowData.Endpointtype.split('|');
      const endpointDest = props.rowData.Endpointdest.split('|');
      const endpoint = [];
      for (let i = 0; i < endpointType.length; i++) {
        endpoint.push({ endpointType: endpointType[i], endPointDest: endpointDest[i] });
      }
      return endpoint;
    };
    const newDevice = {
      deviceUI: props.rowData.Deviceeui,
      deviceType: props.rowData.Devicetype,
      AccessToken: props.rowData.AccessToken,
      endpoint: setEndpoint(),
      customer: props.rowData.Customer,
      InclRadio: props.rowData.InclRadio,
      RawData: props.rowData.RawData
    };
    updateDevice(newDevice);
  }, [props, updateDevice]);

  const onSubmit = e => {
    e.preventDefault();
    setDisable(true);
    const endPointDest = editDevice.endpoint
      .map(endpoint => endpoint.endPointDest.trim())
      .join('|')
      .trim();
    const endpointType = editDevice.endpoint
      .map(endpoint => endpoint.endpointType.trim())
      .join('|')
      .trim();
    const updatedDevice = {
      Deviceeui: editDevice.deviceUI,
      Devicetype: editDevice.deviceType,
      Endpointdest: endPointDest,
      Endpointtype: endpointType,
      InclRadio: editDevice.InclRadio,
      Customer: editDevice.customer,
      RawData: editDevice.RawData,
      AccessToken: editDevice.AccessToken,
      checked: props.rowChecked ? true : false
    };
    props.setData(data => {
      const updatedData = [...data];
      updatedData[props.rowIndex] = updatedDevice;
      return updatedData;
    });
  };
  return (
    <EditForm
      editDevice={editDevice}
      updateDevice={updateDevice}
      editDeviceHandler={editDeviceHandler}
      checkBoxHandler={checkBoxHandler}
      handleEndpointChange={handleEndpointChange}
      addEndpoint={addEndpoint}
      removeEndpoint={removeEndpoint}
      disable={disable}
      message={message}
      onSubmit={onSubmit}
      open={open}
      setOpen={setOpen}
    />
  );
};
export { ThingsBoardEditPrompt };
