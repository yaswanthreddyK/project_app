import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./FAQ.css"
const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const faqs = [
    { question: 'What is Lorem Ipsum?', answer: 'Lorem a dolor   erijeo rjeoi rjeo ijrioejoijorijeiorj eorjioej ojrejroijoi  rjir jijreoirjeoijrejrie jrej orej rioejroiejiorjeoi jrie jroiej oir jeli jrijeoirjejriej oirj esit amet, consectetur adipiscing  jrijeoirjejriej oirj esit amet, consectetur adipiscing elit.' },
    { question: 'Why do we use it?', answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' },
    { question: 'Where does it come from?', answer: 'Contrary to popular belief, Lorem Ipsum is not simply random text.' },
    { question: 'Where can I get some?', answer: 'There are many variations of passages of Lorem Ipsum available.' },
  ];

  return (
       <div className='faq-container'>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6} >
        <div className='faq-left'>
        <Typography variant="h3" ><span className='faq-heading'>Frequently Asked Questions</span></Typography>
        <Typography><span className='faq-message'>Not seeing your question here?<br /><button className='faq-chat-btn'>CHAT WITH US</button></span></Typography>
        </div>
      </Grid>
      <Grid item xs={12} md={6} sx={{marginTop: "3em", "@media (max-width: 900px)": {marginTop: "0.5em"}}}>
        {faqs.map((faq, index) => (
            <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
            >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><span className='faq-question'>{faq.question}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className='faq-answer'>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
        </div>
  );
};

export default FAQ;
