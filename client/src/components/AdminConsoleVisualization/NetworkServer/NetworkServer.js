import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

const NetworkServer = () => {
  const [message, setMessage] = useState('');
  const [completedMessage, setCompletedMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [csvFile, setcsvFile] = useState(null);
  const [csvData, setcsvData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [color, setColor] = useState('');
  const [errorDevices, setErrorDevices] = useState([]);
  const [deviceEuiError, setDeviceEuiError] = useState([]);
  const [authToken, setAuthToken] = useState('');
  let isMounted = useRef(true);

  const handleFileChange = event => {
    setcsvFile(event.target.files[0]);
    setUploadDisplay(true);
    setErrorDevices([]);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const retrieveUserSession = async () => {
    try {
      const credentials = {
        username: 'admin',
        password: 'fiwaredriver'
      };
      const {
        data: {
          result: { authToken }
        }
      } = await axios.post('/api/proxy', credentials, {
        params: { url: 'https://ns.talkpool.com/login' }
      });
      setAuthToken(authToken);
    } catch {}
  };

  useEffect(() => {
    retrieveUserSession();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    setDisable(true);
    let errorDevices = [];
    console.log(authToken);
    await Promise.all(
      csvData.map(async record => {
        try {
          if (isMounted.current)
            await axios.post('/api/proxy', record, {
              headers: { 'X-AUTH-TOKEN': `${authToken}` },
              params: { url: 'https://ns.talkpool.com/internal/devices' }
            });
        } catch ({ response }) {
          console.log(response);
          errorDevices.push({
            Deviceeui: record.deviceEui,
            Error: response.data.error.detailedErrorMessage
          });
        }
      })
    );
    if (errorDevices.length === 0 && isMounted.current) {
      setColor('success');
      setCompletedMessage('All Devices Added Successfully');
      setUploadMessage('');
      setDisable(false);
    } else {
      if (isMounted.current) {
        setErrorDevices(errorDevices);
        setColor('danger');
        setCompletedMessage(
          `Following ${errorDevices.length} Devices had Errors and remaining were added: -\n  `
        );
        setUploadMessage('');
        setDisable(false);
      }
    }
  };
  const importCSV = () => {
    if (!csvFile) {
      return;
    }
    Papa.parse(csvFile, {
      complete: updateData,
      header: true
    });
  };

  const updateData = result => {
    let data = result.data;
    console.log(data);
    const validCSV = data.every(
      item =>
        item.hasOwnProperty('deviceType') &&
        item.hasOwnProperty('deviceEui') &&
        item.hasOwnProperty('appEui') &&
        item.hasOwnProperty('appKey')
    );
    if (!validCSV) {
      setMessage('Invalid CSV format Follow Instructions');
      setcsvFile(null);
    } else {
      const errorData = data.filter(
        data => !/((([A-Z]|\d){2}-){7})([A-Z]|\d){2}/.test(data.deviceEui)
      );
      if (errorData.length === 0) {
        setcsvData(data);
        setColor('success');
        setUploadMessage('File upload successful');
      } else {
        setUploadMessage('Error:- Fix Deviceeui of below devices and reselect and upload');
        setColor('danger');
        setDeviceEuiError(errorData);
      }
    }
  };
  return (
    <Container>
      <Form style={{ margin: '15px auto', width: '70%' }} onSubmit={onSubmit}>
        <FormGroup inline={true}>
          {completedMessage ? <Alert color={color}>{completedMessage}</Alert> : null}

          {errorDevices.length > 0 ? (
            <ul
              style={{
                height: '80px',
                overflowY: 'scroll',
                listStyleType: 'square',
                fontFamily: 'Roboto',
                border: '1px solid #d3d3d3'
              }}
            >
              {errorDevices.map((errorDevice, index) => {
                return (
                  <li key={index}>
                    {errorDevice.Deviceeui} : - {errorDevice.Error}
                  </li>
                );
              })}
            </ul>
          ) : null}

          <Label for='exampleDevice'>Select CSV File</Label>
          <Alert
            style={{ display: 'flex', flexWrap: 'wrap', wordBreak: 'break-all' }}
            color='primary'
          >
            Header Format:deviceType,deviceEui,appEui,appKey
          </Alert>
          <div style={{ display: 'inline' }}>
            <Input
              required={true}
              style={{ display: 'inline', width: '25%' }}
              type='file'
              accept={'.csv'}
              onChange={handleFileChange}
              onClick={e => {
                e.target.value = null;
                setErrorDevices([]);
                setCompletedMessage('');
                setUploadMessage('');
                setMessage('');
                setDeviceEuiError([]);
              }}
              placeholder={null}
            />
            {message ? <Alert color='danger'>{message}</Alert> : null}

            {uploadDisplay ? <Button onClick={importCSV}> Upload now!</Button> : null}
            {uploadMessage ? (
              <Alert style={{ marginBottom: '0' }} color={color}>
                {uploadMessage}
              </Alert>
            ) : null}

            {deviceEuiError.length > 0 ? (
              <ul
                style={{
                  height: '80px',
                  overflowY: 'scroll',
                  listStyleType: 'square',
                  fontFamily: 'Roboto',
                  border: '1px solid #d3d3d3'
                }}
              >
                {deviceEuiError.map((errorDevice, index) => {
                  return <li key={index}>{errorDevice.Deviceeui} has invalid Deviceeui</li>;
                })}
              </ul>
            ) : null}
          </div>
        </FormGroup>
        {deviceEuiError.length === 0 ? (
          <Button
            disabled={disable}
            color='primary'
            type='submit'
            style={{ margin: '70px auto', display: 'block' }}
          >
            {disable ? 'Submitting' : 'Submit'}
          </Button>
        ) : null}
      </Form>
    </Container>
  );
};
export { NetworkServer };
