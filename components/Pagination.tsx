import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

export type Props = {
  totalCount: any;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

export const PageList: React.FC<Props> = ({ totalCount }) => {
  const PER_PAGE = 6;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const totalNation = range.length;

  return (
    <div style={{ textAlign: "center" }}>
      <Pagination
        count={totalNation}
        variant="outlined"
        shape="rounded"
        page={2}
        renderItem={(item) => <PaginationItem />}
      />
    </div>
  );
};

export default PageList;
