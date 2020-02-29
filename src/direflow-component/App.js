import React from 'react'
import { Provider } from 'react-redux'

import { store } from './store'

import TranslateArticle from './TranslateArticle'
import { LOCALSTORAGE_API_ROOT_KEY, LOCALSTORAGE_API_KEY_KEY } from './TranslateArticle/constants';

class App extends React.Component {

  componentWillMount = () => {
    // Set the API KEY to the local storage
    window.localStorage.setItem(LOCALSTORAGE_API_KEY_KEY, this.props.apiKey)
    window.localStorage.setItem(LOCALSTORAGE_API_ROOT_KEY, this.props.apiRoot)
    
  }
  render() {
    return (

      <Provider store={store} >
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />

        <TranslateArticle
          {...this.props}
        />
      </Provider>
    )
  }
}

export default (App);
