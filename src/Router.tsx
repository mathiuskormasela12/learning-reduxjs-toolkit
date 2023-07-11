// ========= Router
// import all modules
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Home from './page/Home'
import { store, persitor } from './redux/store'

const Router: React.FC = () => {
  return (
   <Provider store={store}>
    <PersistGate persistor={persitor}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </PersistGate>
   </Provider>
  )
}

export default Router
