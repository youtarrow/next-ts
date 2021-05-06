import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Style from "components/styles/siteTitle.module.scss";

export type Props = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  })
);

export const SiteTitle: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={Style.SiteTitle}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <h1 className={Style.pageTitle}>Portfolio Yu Ecchuya</h1>
          <h2 className={Style.subTitle}>Web Developer</h2>
        </Grid>
        <Grid item>
          <Avatar alt="user name" src="/user.jpg" className={classes.large} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteTitle;
