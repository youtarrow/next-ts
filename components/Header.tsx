import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: "block",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    black: {
      color: "#fff",
      backgroundColor: "#000",
    },
  })
);

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.black}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">Material-UI</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
