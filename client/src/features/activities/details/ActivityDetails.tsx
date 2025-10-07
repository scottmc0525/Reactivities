import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, isLoadingActivity } = useActivities(id);

  if (isLoadingActivity) return <Typography>Loading...</Typography>;

  if (!activity) return <Typography>Loading...</Typography>;

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
        <Button component={Link} to={`/manage/${activity.id}`} color="primary">
          Edit
        </Button>
        <Button onClick={() => navigate("/activities")} color="inherit">
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}
