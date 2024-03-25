import { useDispatch, useSelector } from "react-redux";
import {
  pageSize,
  fetchEverything,
  selectEverything,
  selectCurrentPage,
  nextPage,
  prevPage,
  clearForm,
} from "./store/newsSlice";
import Pagination from "./components/pagination";
import SearchForm from "./components/searchForm";

import {
  Container,
  Card,
  CardWrapper,
  Image,
  DateWrapper,
  Title,
  Text,
  Bottom,
} from "./App.styled";

function App() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectCurrentPage);
  const everything = useSelector(selectEverything);

  const submitForm = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    const startDate = e.target.start.value;
    const endDate = e.target.end.value;
    const category = e.target.category.value;
    const country = e.target.country.value;
    let source = [];
    try {
      source =
        [...e.target?.sources]
          .filter((item) => item.selected)
          .map((item) => item.value) || [];
    } catch {
      source = [];
    }
    dispatch(
      fetchEverything({
        search,
        from: startDate,
        to: endDate,
        country,
        category,
        source: source.join(","),
      })
    );
  };

  const resetForm = () => {
    dispatch(clearForm());
  };

  return (
    <Container>
      <Card>
        <SearchForm
          submit={submitForm}
          reset={resetForm}
          error={everything?.error}
        />
        {!isNaN(everything?.total) && everything?.total > 0 && (
          <Pagination
            currentPage={currentPage}
            nextPage={() => dispatch(nextPage())}
            prevPage={() => dispatch(prevPage())}
            totalPage={Math.ceil(everything?.total / pageSize)}
          />
        )}
      </Card>
      {everything?.isLoading ? (
        <div>is loading......</div>
      ) : (
        <CardWrapper>
          {everything?.data
            ?.filter((item) => item.title !== "[Removed]")
            .map((item, index) => (
              <Card key={index}>
                <Title>{item?.title}</Title>
                <DateWrapper>
                  {new Date(item?.publishedAt).toDateString()}
                </DateWrapper>
                <Image src={item?.urlToImage} alt={item?.title} />
                <Text
                  key={index}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></Text>
                {item?.author && (
                  <Bottom>
                    <b>author:</b> {item?.author}
                  </Bottom>
                )}
              </Card>
            ))}
        </CardWrapper>
      )}
    </Container>
  );
}

export default App;
