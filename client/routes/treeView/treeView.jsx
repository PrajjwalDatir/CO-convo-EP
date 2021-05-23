import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import * as R from "ramda";

import { ChatContext } from "../../routes/chat/reducer";
import { UserContext } from "#/Provider";
import PropTypes from "prop-types";

import TreeItems from "./data";
import "./treeView.css";

const useStyles = makeStyles((theme) => ({
  parentButton: {
    fontSize: 16,
    padding: "25px 40px",
    marginLeft: 5,
    marginBottom: theme.spacing(4),
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
  childButton: {
    fontSize: 16,
    minWidth: "15vw",
    maxWidth: "50%",
    padding: "25px 15px",
    margin: theme.spacing(4),
    marginLeft: theme.spacing(16),
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
  },
  treeViewContainer: {
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(3.5),
    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(10),
    },
  },
}));

const TreeView = ({ channels, groupType, setTreeViewVisible }) => {
  const [state, dispatch] = React.useContext(ChatContext);
  const [user] = React.useContext(UserContext);
  const [parent, setParent] = useState(TreeItems);

  const changeChannel = React.useCallback(
    () => dispatch({ type: "change-channel", payload: { channels, user } }),
    [dispatch, user, channels]
  );

  const [backTrackArray, updateBackTrackArray] = useState([]);

  const onChildClick = (parent, child) => {
    if (child["children"].length !== 0) {
      backTrackArray.push(parent);
      updateBackTrackArray(backTrackArray);
      setParent(child);
    } else {
      // console.log("Open Chatbox", child.id);
      const channel = channels.find((temp) => temp._id === child.id);
      setTreeViewVisible(false);
      // console.log(channel);
      dispatch({ type: "change-channel", payload: { channel, user } }),
        [dispatch, user, channel];
      // changeChannel(channel);
      // state.fetchingChannel ? R.always() : changeChannel;
    }
  };

  const onParentClick = () => {
    if (backTrackArray.length !== 0) {
      setParent(backTrackArray.pop());
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.treeViewContainer}>
      <Button
        variant="contained"
        className={classes.parentButton}
        onClick={() => onParentClick()}
      >
        {parent["blockName"]}
      </Button>
      {parent["children"].map((children) => (
        <div>
          <div className="children">
            <Button
              variant="contained"
              className={classes.childButton}
              onClick={() => onChildClick(parent, children)}
            >
              {children["blockName"]}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

TreeView.propTypes = {
  channels: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    groupType: PropTypes.number,
  }).isRequired,
};

export default React.memo(TreeView);
