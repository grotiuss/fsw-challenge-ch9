import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import Navbar from './partials/Navbar'

class ProfilePage extends Component{
    render(){
  return (
    <>
<Navbar />
<Col>
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> */}

<div class="card">
  {/* <img src="img.jpg" alt="John" style="width:100%"> */}
  <h1 class="card-tittle">Fauzan</h1>
  <p class="title">Pro Player</p>
  <p>Harvard University</p>
  <a href="#"><i class="fa fa-dribbble"></i></a>
  <a href="#"><i class="fa fa-twitter"></i></a>
  <a href="#"><i class="fa fa-linkedin"></i></a>
  <a href="#"><i class="fa fa-facebook"></i></a>
  <p><button>Contact</button></p>
</div>
</Col>


</>)}}

export default ProfilePage;

