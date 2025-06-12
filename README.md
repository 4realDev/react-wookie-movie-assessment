## FRONTEND TO BACKEND (inside src/api)
### 1. .env File in root directory
Stores `REACT_APP_BASE\_URL` and `REACT_APP_AUTHORIZATION\_TOKEN` for API calls 

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
#### **GET** all **movies** or all movies matching **SEARCHQUERY** Parameter
Used on HomePage in useMovies
```
const { data: movies, isLoading: moviesLoading } = 
```

```
useMovies(searchParams.get('q') ?? '', true);
```

If no searchQuery exists, just GET all existing movies -> `<http://localhost:3000>` \
If searchQuery exists, GET all movies matching query -> `<http://localhost:3000/?q=badmen>`

#### **GET** specific **movie** with **SLUG** (`movies/slug`)
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
Special folder for all assets: divided into fonts, icons and illustrations \
declarations.d.ts?

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
` `┣ 📂constants\
` `┃ ┗ 📜routes.ts\
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

