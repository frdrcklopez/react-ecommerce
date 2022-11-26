import { 
  Routes, 
  Route,
} from 'react-router-dom'
import { Fragment, useEffect, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux'

import { checkUserSession } from './store/user/user.action'
import Spinner from './components/spinner/spinner.component'
import { Globalstyle } from './global.styles'

const Navigation = lazy(() => import('./routes/navigation/navigation.component'))
const Authentication = lazy(() => import('./routes/authentication/authentication.component'))
const  Home = lazy(() => import('./routes/home/home.component')) 
const  Shop = lazy(() => import('./routes/shop/shop.component')) 
const  CheckOut = lazy(() => import('./routes/checkout/checkout.component')) 

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSession())
  }, [dispatch]);

  return (
    <Fragment>
      <Globalstyle/>
      <Suspense fallback={<Spinner/>}>
        <Routes>
            <Route path='/' element={<Navigation/>}>
              <Route index element={<Home/>}/>
              <Route path='shop/*' element={<Shop/>}/>
              <Route path='auth' element={<Authentication/>}/>
              <Route path='checkout' element={<CheckOut/>}/>
            </Route>
        </Routes>
      </Suspense>
    </Fragment>
  )
}

export default App
