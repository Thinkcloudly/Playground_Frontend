import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './accordian.css';

export default function AccordianFlash({title, summary, payment }) {
  return (
    <div>
      <Accordion className='accord-container'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='row'>
          <div className='name'>{title}</div>
          <span  className={`dot  ${payment  === 'yes'  ? " green" : " red"}` }></span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {summary}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
