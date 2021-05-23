import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    backgroundColor: "rgba(155,255,155,1)",
    borderRadius: 0,
  },
});

const TabView = ({ groupType, setGroupType }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setGroupType(value);
  }, [value]);
  return (
    <Paper className={classes.root} elevation={5}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="ALL" value={0} />
        <Tab label="OFFICIAL" value={1} />
        <Tab label="UNOFFICIAL" value={2} />
      </Tabs>
    </Paper>
  );
};
export { TabView };
