import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Style from "components/styles/topMenu.module.scss";

export type Props = {};

const useStyles = makeStyles({
  root: {
    maxWidth: 232,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
    fontWeight: "bold",
    fontSize: 25,
  },
  tex: {
    height: 70,
  },
});

export const TopMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={Style.topMenu}>
      <Grid container direction="row" justify="center" wrap="wrap" spacing={2}>
        <Grid item className={classes.root}>
          <Card>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Blogs
              </Typography>
              <Typography variant="body2" component="p" className={classes.tex}>
                主に個人開発で得た知識などを書いています。<br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/blog/page/1/`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item className={classes.root}>
          <Card>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Profile
              </Typography>
              <Typography variant="body2" component="p" className={classes.tex}>
                私個人の経歴を記載しております。<br></br>
                <br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/profile/`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item className={classes.root}>
          <Card>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Portfolio
              </Typography>
              <Typography variant="body2" component="p" className={classes.tex}>
                当サイトの情報を掲載しています。<br></br>
                <br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/portfolio/`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item className={classes.root}>
          <Card>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Contact
              </Typography>
              <Typography variant="body2" component="p" className={classes.tex}>
                ご連絡等はこちらからお願いいたします。
                <br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={`/contact/`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopMenu;
