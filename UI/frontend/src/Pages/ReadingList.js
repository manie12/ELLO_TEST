import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function ReadingList({ addItem, doDeleteItem }) {
  const isEmptyItem = !addItem || Object.keys(addItem).length === 0;

  return (
    <>
      {!isEmptyItem && (
        <List>
          {addItem.map((book, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {book?.title}
                    </Typography>
                    <Typography>{book.author}</Typography>
                  </React.Fragment>
                }
              />
              <IconButton
                onClick={() => doDeleteItem(book)}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
