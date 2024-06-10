import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DisplayList from "./Pages/DisplayList";
import ReadingList from "./Pages/ReadingList";
import TopBar from "./Pages/TopBar";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const theme = useTheme(); // Use theme
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showReading, setShowReading] = useState(false);
  const [ setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addItem, setAddItem] = useState([]);
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000", {
          query: `
         {
              books {
                 author
                 coverPhotoURL
                 readingLevel
                 title
                    }
            }
          `,
        });

        setDisplay(response.data.data.books);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const doAddItem = (item) => {
    setAddItem((prevList) => {
      if (!prevList.some((prev) => prev.title === item.title)) {
        return [...prevList, item];
      }
      return prevList;
    });
  };
  const doDeleteItem = (itemToDelete) => {
    setAddItem((prevList) => {
      return prevList.filter((item) => item.title !== itemToDelete.title);
    });
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleClose = () => setOpen(false);

  const toggleShowReading = () => {
    setShowReading((prev) => !prev);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <TopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchChange={handleSearchChange}
          handleClose={handleClose}
          display={display}
          error={error}
          loading={loading}
          doAddItem={doAddItem}
        />
        <Box sx={{ flexGrow: 1, height: "100%" }}>
          {isMobile && (
            <Button
              variant="contained"
              color="primary"
              onClick={toggleShowReading}
              sx={{ marginBottom: 2 }}
            >
              {showReading ? "Show List of Books" : "Show Reading List"}
            </Button>
          )}

          <Grid container spacing={2}>
            {isMobile && !showReading && (
              <Grid xs={12} sm={6}>
                <Item>
                  <DisplayList
                    handleClosf={handleClose}
                    display={display}
                    error={error}
                    loading={loading}
                    doAddItem={doAddItem}
                    searchQuery={searchQuery}
                  />
                </Item>
              </Grid>
            )}
            {isMobile && showReading && (
              <Grid xs={12} sm={6}>
                <Item>
                  <ReadingList
                    addItem={addItem}
                    doDeleteItem={doDeleteItem}
                    searchQuery={searchQuery}
                  />
                </Item>
              </Grid>
            )}
            {!isMobile && (
              <>
                <Grid xs={12} sm={6}>
                  <Item>
                    <DisplayList
                      handleClosf={handleClose}
                      display={display}
                      error={error}
                      loading={loading}
                      doAddItem={doAddItem}
                      searchQuery={searchQuery}
                    />
                  </Item>
                </Grid>
                <Grid xs={12} sm={6}>
                  <Item>
                    <ReadingList
                      addItem={addItem}
                      doDeleteItem={doDeleteItem}
                      searchQuery={searchQuery}
                    />
                  </Item>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}
export default App;
