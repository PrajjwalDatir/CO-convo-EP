import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import TreeIcon from "@material-ui/icons/AccountTree";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      bottom: theme.spacing(10),
      right: theme.spacing(2),
    },
    [theme.breakpoints.up("sm")]: {
      bottom: theme.spacing(10),
      left: theme.spacing(1),
    },
  },
}));

const FAB = ({ treeViewVisible, setTreeViewVisible }) => {
  const classes = useStyles();

  const handleClick = () => {
    setTreeViewVisible(!treeViewVisible);
  };

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <TreeIcon />
      </Fab>
    </div>
  );
};

export default FAB;
