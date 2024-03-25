import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const pageSize = 10;

const initialState = {
  currentPage: 0,
  search: "",
  from: null,
  to: null,
  country: null,
  category: null,
  source: null,

  topHeadlines: {
    data: [],
    isLoading: false,
    error: null,
  },
  everything: {
    data: [],
    totalResults: 0,
    isLoading: false,
    error: null,
  },
  categoryList: [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ],
  countryList: [
    "ae",
    "ar",
    "at",
    "au",
    "be",
    "bg",
    "br",
    "ca",
    "ch",
    "cn",
    "co",
    "cu",
    "cz",
    "de",
    "eg",
    "fr",
    "gb",
    "gr",
    "hk",
    "hu",
    "id",
    "ie",
    "il",
    "in",
    "it",
    "jp",
    "kr",
    "lt",
    "lv",
    "ma",
    "mx",
    "my",
    "ng",
    "nl",
    "no",
    "nz",
    "ph",
    "pl",
    "pt",
    "ro",
    "rs",
    "ru",
    "sa",
    "se",
    "sg",
    "si",
    "sk",
    "th",
    "tr",
    "tw",
    "ua",
    "us",
    "ve",
    "za",
  ],
};

export const fetchTopHeadlines = createAsyncThunk(
  "news/top-headlines",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/top-headlines/sources`);
      if (data.status === "ok") {
        return data.sources;
      } else {
        throw new Error(`status is ${data.status}`);
      }
    } catch (err) {
      return rejectWithValue(err?.message);
    }
  }
);

export const fetchEverything = createAsyncThunk(
  "news/everything",
  async (
    { search, page, from, to, country, category, source },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState();
      if (search) {
        dispatch(setSearch(search));
      }
      const _search = search || state?.news?.search;

      if (+page >= 0) {
        dispatch(setPage(+page));
      }
      const _page = (page || state?.news?.page) + 1;

      if (from) {
        dispatch(setFrom(from));
      }
      const _from = from || state?.news?.from;

      if (to) {
        dispatch(setTo(to));
      }
      const _to = to || state?.news?.to;

      if (country) {
        dispatch(setCountry(country));
      }
      const _country = country || state?.news?.country;

      if (category) {
        dispatch(setCategory(category));
      }
      const _category = category || state?.news?.category;

      if (source) {
        dispatch(setSource(source));
      }
      const _source = source || state?.news?.source;

      const fromQuery = _from ? "&from=" + _from : "";
      const toQuery = _to ? "&to=" + _to : "";
      const pageQuery = _page ? "&page=" + _page : "";
      const searchQuery = _search ? "&q=" + _search : "";
      const countryQuery = _country ? "&country=" + _country : "";
      const categoryQuery = _category ? "&category=" + _category : "";
      const sourceQuery = _source ? "&sources=" + _source : "";
      const query = `${pageQuery}${fromQuery}${toQuery}${searchQuery}${countryQuery}${categoryQuery}${sourceQuery}`;

      const { data } = await axios.get(
        `/everything?pageSize=${pageSize}${query}`
      );
      if (data.status === "ok") {
        return data;
      } else {
        throw new Error(data?.message);
      }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const nextPage = createAsyncThunk(
  "news/next-page",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const currentPage = state?.news?.currentPage;
      dispatch(fetchEverything({ page: currentPage + 1 }));
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || err.message);
    }
  }
);

export const prevPage = createAsyncThunk(
  "news/prev-page",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      const currentPage = state?.news?.currentPage;
      dispatch(fetchEverything({ page: currentPage - 1 }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      state.currentPage = 0;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    clearForm: (state) => {
      state.search = "";
      state.from = null;
      state.to = null;
      state.country = null;
      state.category = null;
      state.currentPage = 0;
      state.everything = {
        data: [],
        totalResults: 0,
        isLoading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // top-headlines
    builder.addCase(fetchTopHeadlines.pending, (state, action) => {
      state.topHeadlines.isLoading = true;
      state.topHeadlines.error = null;
    });
    builder.addCase(fetchTopHeadlines.fulfilled, (state, action) => {
      state.topHeadlines.data = action.payload;
      state.topHeadlines.isLoading = false;
    });
    builder.addCase(fetchTopHeadlines.rejected, (state, action) => {
      state.topHeadlines.error = action.payload;
      state.topHeadlines.isLoading = false;
    });

    // everything
    builder.addCase(fetchEverything.pending, (state, action) => {
      state.everything.isLoading = true;
      state.everything.error = null;
    });
    builder.addCase(fetchEverything.fulfilled, (state, action) => {
      state.everything.data = action.payload?.articles;
      state.everything.total = action.payload?.totalResults;
      state.everything.isLoading = false;
    });
    builder.addCase(fetchEverything.rejected, (state, action) => {
      state.everything.error = action.payload;
      state.everything.isLoading = false;
    });
  },
});

export const selectTopHeadLines = (state) => state?.news?.topHeadlines;
export const selectEverything = (state) => state?.news?.everything;
export const selectCurrentPage = (state) => state?.news?.currentPage;
export const selectCategory = (state) => state?.news?.categoryList;
export const selectCountry = (state) => state?.news?.countryList;

export const {
  setSearch,
  setPage,
  setFrom,
  setTo,
  setCountry,
  setCategory,
  setSource,
  clearForm,
} = newsSlice.actions;

export default newsSlice.reducer;
