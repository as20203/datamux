import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Container, Button, FormGroup, InputLabel } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Color } from '@types';
import { ParseResult, parse } from 'papaparse';
import axios from 'instance';
interface ErrorDevices {
  deviceeui: string;
  error: string;
}

interface CSVData {
  Deviceeui: string;
  Devicetype: string;
  Endpointtype: string;
  Endpointdest: string;
  InclRadio: string;
  RawData: string;
  AccessToken: string;
  Customer: string;
}

const MultipleDevices = () => {
  const [message, setMessage] = useState('');
  const [completedMessage, setCompletedMessage] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [csvFile, setcsvFile] = useState<File | null>(null);
  const [csvData, setcsvData] = useState<CSVData[]>([]);
  const [disable, setDisable] = useState(false);
  const [uploadDisplay, setUploadDisplay] = useState(false);
  const [color, setColor] = useState<Color | undefined>();
  const [errorDevices, setErrorDevices] = useState<ErrorDevices[]>([]);
  const [deviceEuiError, setDeviceEuiError] = useState<CSVData[]>([]);
  let isMounted = useRef(true);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) setcsvFile(event.currentTarget.files[0]);
    setUploadDisplay(true);
    setErrorDevices([]);
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);
    let errorDevices: ErrorDevices[] = [];
    await Promise.all(
      csvData.map(async record => {
        const updatedRecord = {
          ...record,
          InclRadio: record.InclRadio.toLowerCase() === 'true' ? true : false,
          RawData: record.RawData.toLowerCase() === 'true' ? true : false,
          AccessToken:
            record.AccessToken !== ''
              ? record.AccessToken
              : Math.random().toString(32).substr(2, 10).toUpperCase()
        };
        try {
          if (isMounted.current) {
            await axios.post('/devices/add', updatedRecord);
          }
        } catch (error) {
          errorDevices.push({ deviceeui: record.Deviceeui, error: error.response });
        }
      })
    ).then(() => {
      if (errorDevices.length === 0 && isMounted.current) {
        setColor('success');
        setCompletedMessage('All Devices Added Successfully');
        setUploadMessage('');
        setDisable(false);
      } else {
        if (isMounted.current) {
          setErrorDevices(errorDevices);
          setColor('error');
          setCompletedMessage(
            `Following ${errorDevices.length} Devices had Errors and remaining were added: -\n  `
          );
          setUploadMessage('');
          setDisable(false);
        }
      }
    });
  };
  const importCSV = () => {
    if (!csvFile) {
      return;
    }
    parse<CSVData>(csvFile, {
      complete: updateData,
      header: true
    });
  };

  const updateData = (result: ParseResult<CSVData>) => {
    let data = result.data;
    const validCSV = data.every(
      item =>
        item.hasOwnProperty('Deviceeui') &&
        item.hasOwnProperty('Devicetype') &&
        item.hasOwnProperty('Endpointtype') &&
        item.hasOwnProperty('Endpointdest') &&
        item.hasOwnProperty('InclRadio') &&
        item.hasOwnProperty('RawData') &&
        item.hasOwnProperty('AccessToken') &&
        item.hasOwnProperty('Customer')
    );
    if (!validCSV) {
      setMessage('Invalid CSV format Follow Instructions');
      setcsvFile(null);
    } else {
      const errorData = data.filter(
        data => !/((([A-Z]|\d){2}-){7})([A-Z]|\d){2}/.test(data.Deviceeui)
      );
      if (errorData.length === 0) {
        setcsvData(data);
        setColor('success');
        setUploadMessage('File upload successful');
      } else {
        setUploadMessage('Error:- Fix Deviceeui of below devices and reselect and upload');
        setColor('error');
        setDeviceEuiError(errorData);
      }
    }
  };
  return (
    <Container>
      <form style={{ margin: '15px auto', width: '70%' }} onSubmit={onSubmit}>
        <FormGroup>
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
                return <li key={index}>{errorDevice.error}</li>;
              })}
            </ul>
          ) : null}

          <InputLabel>Select CSV File</InputLabel>
          <Alert style={{ display: 'flex', flexWrap: 'wrap', wordBreak: 'break-all' }} color='info'>
            Header Format:-
            Deviceeui,Devicetype,Endpointtype,Endpointdest,InclRadio,RawData,AccessToken,Customer
          </Alert>
          <div style={{ display: 'inline' }}>
            <input
              required={true}
              style={{ display: 'inline', width: '25%' }}
              type='file'
              accept={'.csv'}
              onChange={event => handleFileChange(event)}
              onClick={event => {
                if (event.currentTarget) event.currentTarget.value = '';
                setErrorDevices([]);
                setCompletedMessage('');
                setUploadMessage('');
                setMessage('');
                setDeviceEuiError([]);
              }}
            />
            {message ? <Alert color='error'>{message}</Alert> : null}

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
      </form>
    </Container>
  );
};
export { MultipleDevices };
