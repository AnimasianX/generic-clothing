import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route, } from "react-router-dom";
import LogIn from "./routes/login/login.component";
import Shop from "./routes/shop/shop.component";

const App = () => {
  //In this example, Navigation exists on all the pages that start with / and each sibling(adjacent divs not nested) under that path(ie /home or /shop), will always render Navigation first and then
  // the respective pages content. So for example, each page here will have the navigation bar and under that, it will render other components based off where <Outlet> is placed.
  //in this case, we have navigation on top and the other route paths content below it as a sibling.

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
      </Route>


    </Routes>

  );
}

export default App;
