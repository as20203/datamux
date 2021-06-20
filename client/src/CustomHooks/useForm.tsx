import { useState, ChangeEvent, Dispatch } from 'react';

interface Endpoint {
  endpointType: string;
  endPointDest: string;
}
const useForm = <T,>(
  formValues: T
): [
  T,
  Dispatch<React.SetStateAction<T>>,
  (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  (event: ChangeEvent<HTMLInputElement>) => void,
  (event: ChangeEvent<HTMLInputElement>, index: number, endpoint: Endpoint[]) => void,
  (endpoint: Endpoint[]) => void,
  (endpoint: Endpoint[]) => void
] => {
  const [state, setState] = useState(formValues);
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    event.persist();
    setState(state => ({ ...state, [event.target.name]: event.target.value }));
  };

  const addEndpoint = (endpoint: Endpoint[]) => {
    setState(state => ({
      ...state,
      endpoint: [...endpoint, { endpointType: '', endPointDest: '' }]
    }));
  };

  const checkBoxHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setState(state => ({ ...state, [event.target.name]: event.target.checked }));
  };

  const handleEndpointChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
    endpoint: Endpoint[]
  ) => {
    event.persist();
    const [name] = [event.target.name];
    const updatedEndpoint = [...endpoint];
    updatedEndpoint[index][name as keyof Endpoint] = event.target.value;
    setState(state => ({ ...state, endpoint: updatedEndpoint }));
  };
  const removeEndpoint = (endpoint: Endpoint[]) => {
    const updatedEndpoints = [...endpoint];
    updatedEndpoints.pop();
    setState(state => ({ ...state, endpoint: updatedEndpoints }));
  };

  return [
    state,
    setState,
    handleChange,
    checkBoxHandler,
    handleEndpointChange,
    addEndpoint,
    removeEndpoint
  ];
};

export { useForm };
