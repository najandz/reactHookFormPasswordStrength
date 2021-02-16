import React from "react";
import ReactDOM from "react-dom";
import useForm from 'react-hook-form';
import Form from './Form';

import "./styles.css";

function App() {
  return <Form />
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
