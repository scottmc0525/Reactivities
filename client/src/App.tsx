import { Fragment, useEffect, useState } from "react";
import type { Activity } from "./lib/types";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/activities")
      .then((response) => {
        setActivities(response.data);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  const title = "Reactivities";

  return (
    <Fragment>
      <Typography variant="h3">{title}</Typography>
      <List>
        {activities.map((activity: Activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
}

export default App;
