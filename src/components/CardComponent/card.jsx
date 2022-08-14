import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './card.css';

export default function CardComponent({image, title, description, handleConfirm, id, course, }) {
  return (
    <Card sx={{ maxWidth: 250 }} className='shadow'>
      <CardMedia
        component="img"
        alt={`${title}-image`}
        height="140"
        image={image}
      />
      <CardContent>
        <h3>
          {title}
        </h3>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" onClick={() => handleConfirm(course)}>Start Learning</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
