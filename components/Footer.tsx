import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
  })
);

export type Props = {
  title: string;
};

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className="footer">
      <Typography className={classes.title} variant="body1" noWrap>
        Material-UI
      </Typography>
    </footer>
  );
}
