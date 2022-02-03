import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container } from 'reactstrap';

import Navbar from './partials/Navbar'

function Home() {
  return (
    <>
        <Navbar />
        <Container>
            <h1>Hello world</h1>
        </Container>
    </>
  );
}

export default Home;