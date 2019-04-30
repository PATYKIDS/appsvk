import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, Route, Link, Avatar, ScreenSpinner, Search, TabbarItem, Panel, Gallery, CellButton, List, Cell, Group, PanelHeader, Div, Header, HorizontalScroll, Button } from '@vkontakte/vkui';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28Search from '@vkontakte/icons/dist/28/search';
import Icon28Messages from '@vkontakte/icons/dist/28/messages';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon24Settings from '@vkontakte/icons/dist/28/settings';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import Icon24Privacy from '@vkontakte/icons/dist/24/privacy';
import Icon24User from '@vkontakte/icons/dist/24/user_outline';
import Icon28Keyboard from '@vkontakte/icons/dist/28/keyboard_bots_outline';
import Icon28Cart from '@vkontakte/icons/dist/28/cart';
import '@vkontakte/vkui/dist/vkui.css?18042019';
import IndexPanel from './panels/IndexPanel';
import LoginPanel from './panels/LoginPanel';
import ProdPanel from './panels/ProdPanel';
import CartPanel from './panels/CartPanel';

class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
    activeStory: 'feed',
    slideIndex: 0,
    id_c: null,
    };
    this.onStoryChange = this.onStoryChange.bind(this);
  }

   componentDidMount() {
  fetch('https://patykids.ru/t.php', {
  method: 'get',
  mode: 'cors',
  credentials: 'include',
})
  .then(res=>res.json())
  .then(data => localStorage.setItem('cart_c', JSON.stringify(data)));

   fetch('https://patykids.ru/ajaxrequest', {
  method: 'post',
   mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('actionerClass=Ajaxuser&action=isUserAuth')
})   

  .then(res=>res.json())
  .then(data => localStorage.setItem('auth', JSON.stringify(data.data.auth)));

const stringActivePanel = this.getActivePanelRenderString();
if (stringActivePanel.indexOf('discover') !== -1) {
const stringHash = this.getLocationHash();
const objectParametrs = this.getObjectUrlString(stringHash);
const id = objectParametrs.itemId;
this.setState({ id_c: id });
console.log(objectParametrs, id, stringActivePanel);
}
  }
    
    getObjectUrlString(string) {
    let search = string
    let objectUrl = search === "" ? null : search.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[decodeURIComponent(key)] = decodeURIComponent(value);
      return prev;
    }, {});
    return objectUrl
  }  

  getLocationHash() {
    return window.location.hash.replace('#','')
  }

  getActivePanelRenderString() {
    const stringHash = this.getLocationHash();
    const objectParametrs = this.getObjectUrlString(stringHash);
    let renderStingActivePanel = 'feed';

    if (objectParametrs !== null && typeof objectParametrs.itemId !== 'undefined') {
      renderStingActivePanel = 'discover';
       this.setState({ activeStory: renderStingActivePanel });
    }
    if (objectParametrs !== null && typeof objectParametrs.cart !== 'undefined') {
      renderStingActivePanel = 'notifications';
       this.setState({ activeStory: renderStingActivePanel });
    }
    return renderStingActivePanel
  }

 onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }

  render () {
    console.log(this.state);
    return (
      <Epic activeStory={this.state.activeStory} tabbar={
        <Tabbar>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'feed'}
            data-story="feed"
          ><Icon28Newsfeed /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'discover'}
            data-story="discover"
          ><Icon28Keyboard /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'messages'}
            data-story="messages"
          ><Icon28InfoOutline /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory ==='notifications'}
            data-story="notifications"
          ><Icon28Cart /></TabbarItem>
          <TabbarItem
            onClick={this.onStoryChange}
            selected={this.state.activeStory === 'more'}
            data-story="more"
          ><Icon24User /></TabbarItem>
        </Tabbar>
      }>

        <View id="feed" activePanel="feed">
          <Panel id="feed">
        <IndexPanel id="IndexPanel" activeStory={this.state.activeStory}/>
        </Panel>
        </View>
            <ProdPanel item={this.state.id_c} id="discover"/>
        <View id="messages" activePanel="messages">
          <Panel id="messages">
            <PanelHeader>Страницы</PanelHeader>
          </Panel>
        </View>
        <CartPanel id="notifications"/>
        <LoginPanel id="more"/>
      </Epic>

)
}
}

export default App;
