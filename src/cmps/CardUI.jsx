import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

export function CardUI({imgId, txt, btn, data, isLight}) {

  //Fetching icon image per card
  const handleIconId = (iconId) => {
    iconId = iconId.toString()
    if (iconId.length === 1) {
      iconId = ('0' + iconId);
    }
    const imgUrl = `https://developer.accuweather.com/sites/default/files/${iconId}-s.png`
    return imgUrl
  }

  //Card component//
  return (
    <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: '#ffffff57'}}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={handleIconId(imgId)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color={!isLight && 'white'}>
          {txt.txt1}
        </Typography>
        <Typography variant="subtitle2" color={!isLight && 'white'}>
          {txt.txt2}
        </Typography>
        <Typography variant="subtitle2" color={!isLight && 'white'}>
          {txt.txt3}
        </Typography>
      </CardContent>
      {btn && <CardActions>
        <Button size="small" onClick={(ev)=> btn(ev, data.cityKey)}><DeleteForeverTwoToneIcon fontSize={'large'}/></Button>
      </CardActions>}
    </Card>
  );
}