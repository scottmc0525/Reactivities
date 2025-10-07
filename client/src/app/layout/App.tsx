import { useState } from "react";
import type { Activity } from "../../lib/types";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import Navbar from "./Navbar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find((a) => a.id === id) || null);
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(null);
  };
  const handleOpenForm = (id?: string) => {
    if (id) handleSelectActivity(id);
    else handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleDelete = (id: string) => {
    // setActivities(activities!.filter((x) => x.id !== id));
    console.log(id);
  };

  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {!activities || isPending ? (
          <Typography variant="h3" color="primary">
            Loading activities...
          </Typography>
        ) : (
          <ActivityDashboard
            activities={activities}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            selectedActivity={selectedActivity ?? undefined}
            editMode={editMode}
            openForm={handleOpenForm}
            closeForm={handleFormClose}
            deleteActivity={handleDelete}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
