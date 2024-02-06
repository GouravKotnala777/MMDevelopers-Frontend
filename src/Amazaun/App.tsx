import { ComponentType, FC, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
// import { userExist, userNotExist } from "./redux/reducer/userReducer";



// --------- Components ------------
import Header from "./components/Header";
import Loader from "./components/Loader";
import BarChartPage from "./pages/BarChartPage";
import PieChartPage from "./pages/PieChartPage";
import LineChartPage from "./pages/LineChartPage";
import Coupan from "./pages/apps/Coupan";
import StopWatch from "./pages/apps/StopWatch";
import Toss from "./pages/apps/Toss";
import LoginPage from "./LoginPage";
import { getUser } from "./redux/api/userAPI";


// --------- Pages ------------
// import HomePage from "./HomePage";
// import ProductPage from "./ProductsPage";
// import CartPage from "./CartPage";
// import Customers from "./Customers";
// import Transaction from "./Transaction";

const HomePage = lazy(() => import("./HomePage"));
const ProductPage = lazy(() => import("./pages/ProductsPage"));
const CartPage = lazy(() => import("./CartPage"));
const Customers = lazy(() => import("./pages/Customers"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Transaction = lazy(() => import("./pages/Transaction"));
const NewProduct = lazy(() => import("./pages/management/NewProduct"));
const ProductManagement = lazy(() => import("./pages/management/ProductManagement"));
const TransactionManagement = lazy(() => import("./pages/management/TransactionManagement"));




const App:FC = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
        // onAuthStateChanged(auth, async (user) => {
        //     if (user) {
        //         console.log("Logged In");
        //         const data = await getUser(user.uid);
        //         console.log("------ App.tsx  data");
        //         console.log(data);
        //         console.log("------ App.tsx  data");
                
        //         dispatch(userExist(data.message));
        //     }
        //     else{
        //         console.log("------ App.tsx  else");
        //         dispatch(userNotExist());
        //     }
        // });
    }, []);

    return(
    <BrowserRouter>
        {/* <Header /> */}
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/product" element={<ProductPage />} />
                <Route path="/admin/customer" element={<Customers />} />
                <Route path="/admin/transaction" element={<Transaction />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/cart" element={<CartPage />} />

                {/* Charts */}
                <Route path="/admin/chart/bar" element={<BarChartPage />} />
                <Route path="/admin/chart/pie" element={<PieChartPage />} />
                <Route path="/admin/chart/line" element={<LineChartPage />} />


                {/* Apps */}

                <Route path="/admin/app/coupan" element={<Coupan />} />
                <Route path="/admin/app/stopwatch" element={<StopWatch />} />
                <Route path="/admin/app/toss" element={<Toss />} />




                {/* Management */}
                <Route path="/admin/product/new" element={<NewProduct />} />
                <Route path="/admin/product/:id" element={<ProductManagement />} />
                <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
    )
};

export default App;