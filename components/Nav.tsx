import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Nav() {
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
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="新着記事" {...a11yProps(0)} />
          <Tab label="記事一覧" {...a11yProps(1)} />
          <Tab label="タグ" {...a11yProps(2)} />
          <Tab label="プロフィール" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
    </div>
  );
}