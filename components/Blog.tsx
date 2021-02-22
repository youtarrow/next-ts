import React from "react";
import { NextPage } from "next";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from 'dayjs'
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Style from "components/styles/style.module.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 5,
  },
  media: {
    height: 140,
  },
});

export type Props = {
  postTitle: string;
  postDate: string;
}

export const Blog: NextPage<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={`${classes.root} ${Style.iteme}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://placehold.jp/300x300.png"
            title="Contemplative Reptile"
          />
          <CardContent>
            <p>{`${dayjs(props.postDate).format('YYYY年MM月DD日')}`}</p>
            <Typography gutterBottom variant="h5" component="h2">
              {props.postTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default Blog
