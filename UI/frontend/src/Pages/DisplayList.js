import { Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";


const DisplayList = ({
  searchQuery,
  setSearchQuery,
  handleSearchChange,
  handleClose,
  display,
  error,
  loading,
  doAddItem,
}) => {
  const filteredItems = display.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <List>
      {filteredItems.map((book, index) => (
        <ListItem alignItems="flex-start">
          <ListItemText
            key={index}
            primary="Brunch this weekend?"
            secondary={
              <Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {book.title}
                </Typography>
                {book.author}
              </Fragment>
            }
          />
          <Button
            onClick={() => {
              doAddItem(book);
            }}
          >
            Add
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default DisplayList;
