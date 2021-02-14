import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Title from "components/Title";
import Style from "components/styles/style.module.scss";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin:5
  },
  media: {
    height: 140,
  },
});

let roop = ["記事1", "記事2", "記事3", "記事4", "記事5"];

export default function Blog() {
  const classes = useStyles();

  return (
    <div className="blog">
      <div className="inner">
        <Title title={"Contents"} className={Style.title} />
        <Box
          display="flex"
          flexWrap="wrap"
          bgcolor="background.paper"
          className={Style.blog__list}
        >
          {roop.map((val) => (
            <Card key={val.toString()} className={`${classes.root} ${Style.iteme}`}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://placehold.jp/300x300.png"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <p>2021/02/17</p>
                  <Typography gutterBottom variant="h5" component="h2">
                    {val}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
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
          ))}
        </Box>
      </div>
    </div>
  );
}
