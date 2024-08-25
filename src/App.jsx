
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import * as Layouts from "@/layouts.js";
import * as Pages from "@/pages.js";


/*

make images work from hosted backend
extract apk
audio ghanaNLP  +

*/

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layouts.General />}>
        <Route index                    element={<Pages.Login         />} />
        <Route path="forgot"            element={<Pages.Forgot        />} />
        <Route path="verify"            element={<Pages.Verification  />} />
        <Route path="verify2"           element={<Pages.Verification2 />} />
        <Route path="reset"             element={<Pages.Reset         />} />
        <Route path="info"              element={<Pages.PersonalInfo  />} />

        <Route element={<Layouts.User />}>
          <Route path="home"              element={<Pages.Home         />} />
          <Route path="article/:id"       element={<Pages.Article      />} />
          <Route path="diagnosis/:id"     element={<Pages.Diagnosis    />} />
          <Route path="history"           element={<Pages.History      />} />
          <Route path="store"             element={<Pages.Store        />} />
          <Route path="orders"            element={<Pages.MyOrders     />} />
          <Route path="order/:id"         element={<Pages.MyOrder      />} />
          <Route path='settings'          element={<Pages.Settings     />} />
          <Route path="checkout"          element={<Pages.Checkout     />} />
        </Route>
        
        <Route path="product/:id"           element={<Pages.StoreProduct />} />

        <Route path='camera' element={<Pages.Camera />}/>

        <Route path="/admin" element={<Layouts.Admin />} >
          <Route index                       element={<Pages.Dashboard        />} />
          <Route path="products"             element={<Pages.Products         />} />
          <Route path="orders"               element={<Pages.Orders           />} />
          <Route path="orders/:id"           element={<Pages.Order            />} />
          <Route path="products/add"         element={<Pages.AddProduct       />} />
          <Route path="products/:id"         element={<Pages.EditProduct      />} />
          <Route path="categories"           element={<Pages.Categories       />} />
          <Route path="categories/add"       element={<Pages.AddCategory      />} />
          <Route path="category/:id"         element={<Pages.EditCategory     />} />
          <Route path="articles"             element={<Pages.Articles         />} />
          <Route path="articles/add"         element={<Pages.AddArticle       />} />
          <Route path="articles/:id"         element={<Pages.EditArticle      />} />
          <Route path="blog/categories"      element={<Pages.BlogCategories   />} />
          <Route path="blog/categories/add"  element={<Pages.BlogAddCategory  />} />
          <Route path="blog/category/:id"    element={<Pages.BlogEditCategory />} />

        </Route>
      </Route>
    )
  );

  return (
   <RouterProvider router={router} />
  )
}

export default App
