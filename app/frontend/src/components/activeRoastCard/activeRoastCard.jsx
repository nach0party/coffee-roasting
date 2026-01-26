import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { RoastBar } from '../roastBar';
import './activeRoastCard.css';
import { Stopwatch } from '../stopwatch';
import { useEffect, useState } from 'react';

export const ActiveRoastCard = ({ roast }) => {
  let navigate = useNavigate();
  const theme = useTheme();
  const [timerRunning, setTimerRunning] = useState(false);

  const openRoast = (id) => {
    navigate(`/roast/${id}`);
  };

  // this logic is reused, consolidate
  useEffect(() => {
    if (roast) {
      if (roast.started_when && !roast.ended_when) {
        setTimerRunning(true);
      } else if (roast.started_when && !roast.ended_when) {
        setTimerRunning(false);
      }
    }
  }, [roast]);

  // TODO get the colors more in line with the styling...
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: `2px solid ${theme.palette.primary.dark}`,
      }}
      className={'active-roast-card'}
    >
      <CardActionArea
        onClick={() => {
          openRoast(roast.id);
        }}
      >
        <CardMedia
          component="img"
          height={100}
          image="/coffee-being-roasted.jpg"
        />
      </CardActionArea>
      <CardContent>
        <Typography variant="h6" component="div">
          {roast.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Status: {'In Progress'}
        </Typography>

        <Box>
          {/** Roast temp / time would be awesome, expected time and the expected temp */}
          <Typography variant="caption" color="primary">
            Target Temp: {roast.target_temperature || 'Unset'}
            <Stopwatch
              startTime={roast.started_when}
              endTime={roast.ended_when}
              run={timerRunning}
              setRun={setTimerRunning}
              // variant="h5"
            />
          </Typography>
          <RoastBar
            startedWhen={roast.started_when}
            targetWhen={roast.target_when}
            endedWhen={roast.ended_when}
          />
        </Box>
        {/** TODO draw out components out of the manage roast section for reuse */}
        {/* <Typography variant="body2">Total Time: {roast.time}</Typography> */}
      </CardContent>
    </Card>
  );
};
