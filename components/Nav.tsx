import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export type Props = {
  value: number;
};

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Nav: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  // @ts-ignore TS6133: 'event' is declared but its value is never read.
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={props.value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="HOME" href={"/"} {...a11yProps(value)} />
          <Tab label="BLOG" href={"/blog/page/1/"} {...a11yProps(value)} />
          <Tab label="PROFILE" href={"/profile/"} {...a11yProps(value)} />
          <Tab label="CONTACT" href={"/contact/"} {...a11yProps(value)} />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default Nav;
