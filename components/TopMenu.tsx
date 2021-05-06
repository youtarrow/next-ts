import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export type Props = {};

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const TopMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Blog
              </Typography>
              <Typography variant="body2" component="p">
                技術的なブログを記載しています。<br></br>
                主に個人開発で得た知識などを書いています。
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Profile
              </Typography>
              <Typography variant="body2" component="p">
                私個人の経歴を記載しております。<br></br>
                <br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} variant="h4" component="h3">
                Contact
              </Typography>
              <Typography variant="body2" component="p">
                ご連絡等はこちらでお願いいたします。
                <br></br>&nbsp;
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default TopMenu;
