import FavoriteIcon from '@mui/icons-material/Favorite';
import { yellow } from '@mui/material/colors';

interface Props {
  rating: number;
}

const HealthCheckRatingIcon = ({rating}: Props) => {
  switch (rating) {
    case 1:
      return <FavoriteIcon color='success' />;
    case 2:
      return <FavoriteIcon sx={{ color: yellow[400] }} />;
    case 3:
      return <FavoriteIcon color='warning' />;
    default:
      return <FavoriteIcon color='error' />;
  }
};

export default HealthCheckRatingIcon;