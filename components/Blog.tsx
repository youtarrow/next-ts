import React from "react";
import { NextPage } from "next";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import dayjs from "dayjs";
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
    maxWidth: 310,
    width: "calc(100%/3)",
    margin: 5,
  },
  media: {
    height: 140,
  },
});

export type Props = {
  postTitle: string;
  postDate: string;
  postKv: string;
  postId: string;
  postTags: string;
};

export const Blog: NextPage<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Card className={`${classes.root} ${Style.iteme}`} component="li">
        <Link href={`/blog/${props.postId}`}>
          <a>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`${props.postKv}`}
                title="Contemplative Reptile"
              />
              <CardContent>
                <p>{`${dayjs(props.postDate).format("YYYY年MM月DD日")}`}</p>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.postTitle}
                </Typography>
              </CardContent>
            </CardActionArea>
          </a>
        </Link>
        <CardActions>
          タグ：
          <Button size="small" color="primary">
            {props.postTags}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Blog;
