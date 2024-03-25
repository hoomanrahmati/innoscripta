import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTopHeadlines,
  selectTopHeadLines,
  selectCategory,
  selectCountry,
} from "../../store/newsSlice";
import {
  Controller,
  SubmitButton,
  ResetButton,
  ErrorWrapper,
  Col2,
} from "./index.style";

function SearchForm({ submit, error, reset }) {
  const dispatch = useDispatch();
  const topHeadLines = useSelector(selectTopHeadLines);
  const categoryList = useSelector(selectCategory);
  const countryList = useSelector(selectCountry);

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);
  return (
    <form onSubmit={submit} onReset={reset}>
      <Controller>
        <label htmlFor="search">Search</label>
        <input
          name="search"
          id="search"
          type="text"
          placeholder="Search"
        ></input>
      </Controller>
      <Col2>
        <Controller>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="">Select category</option>
            {categoryList?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Controller>
        <Controller>
          <label htmlFor="country">Country</label>
          <select name="country" id="country">
            <option value="">Select country</option>
            {countryList?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Controller>
      </Col2>
      <Col2>
        <Controller>
          <label htmlFor="start">Start date:</label>
          <input
            type="date"
            id="start"
            name="start"
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </Controller>
        <Controller>
          <label htmlFor="end">End date:</label>
          <input type="date" id="end" name="end" pattern="\d{4}-\d{2}-\d{2}" />
        </Controller>
      </Col2>
      <Controller>
        <label htmlFor="sources">Select Sources</label>
        <select name="sources" id="sources" multiple={true}>
          {topHeadLines.isLoading && <option value="">Loading...</option>}
          {topHeadLines?.data?.map((item) => (
            <option key={item?.id} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
      </Controller>
      <SubmitButton type="submit">Search</SubmitButton>
      <ResetButton type="reset">Reset</ResetButton>
      {error && <ErrorWrapper>{error}</ErrorWrapper>}
    </form>
  );
}

export default SearchForm;
