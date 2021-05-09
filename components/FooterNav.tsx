import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Style from "components/styles/footerNav.module.scss";

export const FooterNav: React.FC = () => {
  return (
    <div className={Style.footerNav}>
      <Typography color="textPrimary" component="div">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={Style.list}
        >
          <Grid item className={Style.listItem}>
            <Link color="inherit" href="/">
              Home
            </Link>
          </Grid>
          <Grid item className={Style.listItem}>
            <Link color="inherit" href="/profile/">
              Manager
            </Link>
          </Grid>
          <Grid item className={Style.listItem}>
            <Link color="inherit" href="/">
              Privacy Policy
            </Link>
          </Grid>
          <Grid item className={Style.listItem}>
            <Link color="inherit" href="/contact/">
              Contact
            </Link>
          </Grid>
        </Grid>
      </Typography>
    </div>
  );
};

export default FooterNav;
