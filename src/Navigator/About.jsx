import React from 'react';
import Header from '../Components/Header';


function About() {
    return (
      <>  
      <Header />
     <p className='about-text lead'>And here a github link for this project</p>
     <a className='about-link' href='https://github.com/rajvinder21/todo' target='blank'>https://github.com/rajvinder21/todo</a>
     </>
    );
}

export default About ;