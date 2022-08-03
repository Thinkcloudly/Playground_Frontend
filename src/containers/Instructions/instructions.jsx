import axios from 'axios'
import React, { useEffect, useState } from 'react'
import rd from './ins.md';
import Markdown from 'markdown-to-jsx';
import './instructions.css';
import { useParams } from 'react-router-dom';
const aws = require('../../static/instructions/aws.md');

const Instructions = () => {

  const [instructions, setInstructions] = useState('');
  const { courseId } = useParams();

  useEffect(() => {
    fetchMarkDownFileContent()
  }, [])

  const fetchMarkDownFileContent = async () => {
    try {
      const file = require(`../../static/instructions/${courseId}.md`);
      const response = await fetch(file);
      const markdown = await response.text()
       setInstructions(markdown)
    } catch (e) {
      console.error("Error while fetching mark-down component", e);
      setInstructions(`*** No Instructions found for ${courseId} ***`);

    }
  }

  return (
    <div className='center'>
    <h2>Instructions</h2>
    <hr/>
    <Markdown children={instructions}/>
</div>
  )
}

export default Instructions;