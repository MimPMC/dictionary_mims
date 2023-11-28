import { Box } from "@mui/material"
import ContentBox from "./components/ContentBox"
import Header from "./components/Header"


function App() {
  
  return (
    <Box bgcolor={"primary"} minHeight={"100vh"} width="100%">
      <Header/>
      <Box sx={{my:2}}>
        <ContentBox></ContentBox>
      </Box>
    </Box>
  )
}

export default App
