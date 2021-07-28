import './App.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import GallaryPage from './Screens/GallaryPage';

const theme = createTheme({
  breakpoints : {
      values: {
          xs: 0,
          sm: 767,
          md: 992,
          lg: 1080,
          xl: 1920,
          
      }
  }
})

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <div style = {{minHeight : '100vh', backgroundColor : "#F3F2EF"}}>
        <GallaryPage/>
      </div>
    </ThemeProvider>
    
  );
}


export default App;
