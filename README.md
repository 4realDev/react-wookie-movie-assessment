# I. Classic Assessment Task

**Objective**
Your assignment is to implement a movie streaming dashboard using JavaScript and React.

**Tasks**
- Implement your frontend app with React
- Implement a list page as outlined in list.jpg.
- Group the movies by genres (don't hardcode the genres). Retrieve the data through <http://localhost:3001/movies> 
- Implement a detail page as outlined in detail.jpg. Retrieve the data through <http://localhost:3001/movies/:slug> 
- Implement the search. Retrieve the data through [http://localhost:3001/movies?q=${search_term}](http://localhost:3001/movies?q=$%7Bsearch_term%7D) 
- Use a common routing library and make sure that linking and bookmarking to detail pages work as expected (use the slug and not the id in the url)
- For authentication pass the header Authorization: Bearer Wookie2019 
- You may use any state management library of your choice
- You may use TypeScript
- You may use SASS, but no CSS-in-JS like styled-components

**Bonus Tasks**
- Make the App responsive
- Use the movies backdrop image creatively
- Implement an In-Memory Cache for the API responses
- Testing

**Design**
![list](https://github.com/user-attachments/assets/63c0e6f3-0f29-4f18-93f7-671a9bbb123a)

![detail](https://github.com/user-attachments/assets/2746b58e-9419-40fc-8ca1-2c576c09f24c)

**Evaluation Criteria**
- **JavaScript** best practices
- We're looking for you to produce working code, with enough room to demonstrate how to structure components in a small program.
- Show us your work through your commit history
- **Completeness**: did you complete the features?
- **Correctness**: does the functionality act in sensible, thought-out ways?
- **Maintainability**: is it written in a clean, maintainable way?

<br/>
<br/>
<br/>
<br/>

---

# II. Best Practices, Findings and Documentation
## FRONTEND TO BACKEND (inside src/api)
### 1. .env File in root directory
Stores `REACT_APP_BASE_URL` and `REACT_APP_AUTHORIZATION_TOKEN` for API calls 

### 2. ReactQuery
- Using ReactQuery for API calls
- Creating `tanstack/react-query` **queryClient** inside `src/api/config/query.ts`
- Initiate and pass to App.tsx inside **QueryClientProvider**

### 3. Axios
- Using Axios for HTTP requests
- Creating axiosClient with Bearer for authorization and basic errorLog inside `src/api/config/axios.ts`

### 4. Module for movies API requests
- Using **axiosClient** to fetch movie data from `https://wookie.codesubmit.io/`
- Using **ReactQuery** **useQuery** hook to cache new movie data and **useMutation** for updating cached data
- Using **types** for fetched movie Data inside `src/types/types.ts`

  *Usage in frontend components/pages:*
#### 4.1 **GET** all **movies** or all movies matching **SEARCHQUERY** Parameter
Used on HomePage in useMovies
```
const { data: movies, isLoading: moviesLoading } = 
```

```
useMovies(searchParams.get('q') ?? '', true);
```

If no searchQuery exists, just GET all existing movies -> `<http://localhost:3000>` \
If searchQuery exists, GET all movies matching query -> `<http://localhost:3000/?q=badmen>`

#### 4.2 **GET** specific **movie** with **SLUG** (`movies/slug`)
Used on MovieDetailsPage in useMovie

   ```
   const {
       data: movie,
       isError: movieError,
       isFetching: movieFetching,
       isLoading: movieLoading,
   } = useMovie(params.slug!!, true);
   ```

## FRONTEND
### 1. Typography component
Enables quick and consequent usage of text throughout the app with predefined classes: `'header'`, `'subheader'`, `'body'`	

```
<Typography variant='header'>
   {movie.title}
</Typography>
```

```
<Typography variant='subheader' tag='span'>
    {`${movieYear} | `}
</Typography>
```

### 2. LayoutContainer
Enables quick and consequent usage of paddings including their changes and adaptions for different media queries throughout the app. \
Implemented to be used as overall Layout Container as well as generic LayoutContainer for in-page Layouts/Containers. \
Implementation of an additional class `".layoutOverrideFullWidth"` inside `style/global.scss` to escape LayoutContainer paddings and use components in fullwidth.

### 3. Layout
React Best Practice to reuse same Layout with the same page-padding values (`LayoutContainer`), Navigation and Footer for multiple pages \
(used in `src/Router.tsx` in `createBrowserRouter()` as `"element"`)

```
export const Layout = () => {
    return (
        <>
            <Navigation />
                <div className={classes.content}>
                    <LayoutContainer>
                        <Outlet />
                    </LayoutContainer>
                </div>
            <Footer />
        </>
    );
};
```

### 4. Pages
React Best Practice with Router, RouterProvider, createBrowserRouter, the pages (inside src/pages) as children, Layout as element and NotFoundPage as errorElement

### 5. Debounce
Use debounce for search to prevent memory overload or too many expensive operations

```
const handleSearchParamsChange = useCallback(
    debounce((searchQuery: string) => {
        setSearchParams(searchQuery ? `?q=${searchQuery}` : '');
    }),
    []
);
```

### 6. Styles
Includes:
  - global
  - fonts
  - mixins
  - variables
  - normalization
  - UI component style overrides
  - UI component theme

### 7. Assets folder
Special folder for all assets: divided into `src\assets\fonts`, `src\assets\icons` and `src\assets\illustrations` \
`.\declaration.d.ts`  allows TypeScript to understand and provide accurate typings for JavaScript, different files and libraries.

```
declare module '*.scss';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
```

### Folder Structure Overview

📦src\
` `┣ 📂api\
` `┃ ┣ 📂config\
` `┃ ┃ ┣ 📜axios.ts\
` `┃ ┃ ┗ 📜query.ts\
` `┃ ┗ 📂modules\
` `┃ ┃ ┗ 📂movies\
` `┃ ┃ ┃ ┗ 📜index.ts\
` `┣ 📂assets\
` `┃ ┣ 📂fonts\
` `┃ ┃ ┣ 📜calibre-r-web-medium.otf\
` `┃ ┃ ┣ 📜calibre-r-web-regular.otf\
` `┃ ┃ ┣ 📜calibre-r-web-semibold.otf\
` `┃ ┃ ┣ 📜TestFinancierDisplay-Bold.otf\
` `┃ ┃ ┣ 📜TestFinancierDisplay-Medium.otf\
` `┃ ┃ ┗ 📜TestFinancierDisplay-Regular.otf\
` `┃ ┣ 📂icons\
` `┃ ┃ ┣ 📜FilledStar.tsx\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜Search.tsx\
` `┃ ┃ ┗ 📜UnfilledStar.tsx\
` `┃ ┗ 📂illustrations\
` `┃ ┃ ┗ 📜logo.png\
` `┣ 📂components\
` `┃ ┣ 📂common\
` `┃ ┃ ┣ 📂IconButton\
` `┃ ┃ ┃ ┣ 📜IconButton.module.scss\
` `┃ ┃ ┃ ┣ 📜IconButton.tsx\
` `┃ ┃ ┃ ┗ 📜index.ts\
` `┃ ┃ ┣ 📂Input\
` `┃ ┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┃ ┣ 📜Input.module.scss\
` `┃ ┃ ┃ ┗ 📜Input.tsx\
` `┃ ┃ ┣ 📂LayoutContainer\
` `┃ ┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┃ ┣ 📜LayoutContainer.scss\
` `┃ ┃ ┃ ┗ 📜LayoutContainer.tsx\
` `┃ ┃ ┣ 📂LoadingSpinner\
` `┃ ┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┃ ┣ 📜LoadingSpinner.module.scss\
` `┃ ┃ ┃ ┗ 📜LoadingSpinner.tsx\
` `┃ ┃ ┗ 📂Typography\
` `┃ ┃ ┃ ┣ 📜colors.ts\
` `┃ ┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┃ ┣ 📜Typegraphy.scss\
` `┃ ┃ ┃ ┗ 📜Typography.tsx\
` `┃ ┣ 📂MovieItem\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜MovieItem.module.scss\
` `┃ ┃ ┗ 📜MovieItem.tsx\
` `┃ ┣ 📂SearchBarPress\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜SearchBarPress.module.scss\
` `┃ ┃ ┗ 📜SearchBarPress.tsx\
` `┃ ┣ 📂SearchBarRealtime\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜SearchBar.tsx\
` `┃ ┃ ┗ 📜SearchBarRealtime.module.scss\
` `┃ ┗ 📂Slider\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜SlickSliderOverrides.scss\
` `┃ ┃ ┗ 📜Slider.tsx\
` `┣ 📂layouts\
` `┃ ┗ 📂Layout\
` `┃ ┃ ┣ 📂components\
` `┃ ┃ ┃ ┣ 📂Footer\
` `┃ ┃ ┃ ┃ ┣ 📜Footer.module.scss\
` `┃ ┃ ┃ ┃ ┣ 📜Footer.tsx\
` `┃ ┃ ┃ ┃ ┗ 📜index.ts\
` `┃ ┃ ┃ ┗ 📂Navigation\
` `┃ ┃ ┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┃ ┃ ┣ 📜Navigation.module.scss\
` `┃ ┃ ┃ ┃ ┗ 📜Navigation.tsx\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜Layout.module.scss\
` `┃ ┃ ┗ 📜Layout.tsx\
` `┣ 📂pages\
` `┃ ┣ 📂HomePage\
` `┃ ┃ ┣ 📜HomePage.module.scss\
` `┃ ┃ ┣ 📜HomePage.tsx\
` `┃ ┃ ┗ 📜index.ts\
` `┃ ┣ 📂MovieDetailsPage\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┣ 📜MovieDetailsPage.module.scss\
` `┃ ┃ ┗ 📜MovieDetailsPage.tsx\
` `┃ ┣ 📂NotFoundPage\
` `┃ ┃ ┣ 📜index.ts\
` `┃ ┃ ┗ 📜NotFoundPage.tsx\
` `┃ ┗ 📜index.ts\
` `┣ 📂styles\
` `┃ ┣ 📜antdOverrides.scss\
` `┃ ┣ 📜antdTheme.ts\
` `┃ ┣ 📜fonts.scss\
` `┃ ┣ 📜global.scss\
` `┃ ┣ 📜index.ts\
` `┃ ┣ 📜mixins.scss\
` `┃ ┣ 📜modernNormalize.scss\
` `┃ ┣ 📜tailwindPreflight.scss\
` `┃ ┣ 📜variables.json\
` `┃ ┗ 📜variables.scss\
` `┣ 📂types\
` `┃ ┗ 📜movie.ts\
` `┣ 📜App.tsx\
` `┣ 📜index.tsx\
` `┗ 📜Router.tsx

