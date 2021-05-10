import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Style from "components/styles/siteTitle.module.scss";

export type Props = {
  pageTitle: string;
  subTitle: string;
  userImges: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(13),
      height: theme.spacing(13),
    },
  })
);

export const SiteTitle: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={Style.siteTitle}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <h1 className={Style.pageTitle}>{props.pageTitle}</h1>
          <h2 className={Style.subTitle}>{props.subTitle}</h2>
        </Grid>
        <Grid item>
          <Avatar
            alt="user icon"
            src={`${props.userImges}`}
            className={classes.large}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteTitle;
