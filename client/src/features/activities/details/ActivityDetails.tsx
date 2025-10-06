import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { Activity } from "../../../lib/types";

type Props = {
  activity: Activity;
  cancelSelectActivity?: () => void;
  openForm: (id: string) => void;
};
export default function ActivityDetails({
  activity,
  cancelSelectActivity,
  openForm,
}: Props) {
  const imgPath = `/images/categoryImages/${activity.category.toLowerCase()}.jpg`;
  const fallback = `/images/placeholder.png`;

  return (
    <Card sx={{ borderRadius: 3, p: 2, mb: 2 }}>
      <CardMedia
        component="img"
        image={imgPath}
        alt={activity.title}
        onError={(e) => {
          // If the image fails to load, show a generic placeholder
          const target = e.currentTarget as HTMLImageElement;
          if (target.src?.includes("placeholder.png")) return;
          target.src = fallback;
        }}
      />
      <CardContent>
        <Typography variant="h5" color="primary">
          {activity.title}
        </Typography>
        <Typography variant="subtitle1" fontWeight="light">
          {activity.date}
        </Typography>
        <Typography variant="body1">{activity.description}</Typography>
        <Typography variant="body2">
          {activity.city}, {activity.venue}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => openForm(activity.id)} color="primary">
          Edit
        </Button>
        <Button onClick={cancelSelectActivity} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
