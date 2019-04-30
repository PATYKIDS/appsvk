import React from 'react';
import connect from '@vkontakte/vkui-connect';
import PropTypes from 'prop-types';
import { View, Div, PanelHeader, Panel, Cell, Footer, HeaderButton, ScreenSpinner, List, FormLayout, FormStatus, Input, Group, Button, CellButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';


class LoginPanel extends React.Component {
   constructor (props) {
    super(props);

    this.state = {
    idsak: [],
    activePanel: 'mores',
    auth: [],
    email: '',
    passs: '',
    isLoggedIn: false,
    popout: null,
    isLoading: false,
    error: false,
    getorder_id: [],
    getorder_email: [],
    users: []
  }
  this.handlepass = this.handlepass.bind(this);
  this.handleemail = this.handleemail.bind(this);
}


  componentDidMount() {

  //localStorage.setItem('auth', JSON.stringify([]));
 fetch('https://patykids.ru/ajaxrequest', {
  method: 'post',
   mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('actionerClass=Ajaxuser&action=isUserAuth')
})   

  .then(res=>res.json())
  .then(data => localStorage.setItem('auth', JSON.stringify(data.data.auth)));
   // .then(data => this.setState({ auth: data.data.auth }));
  //var login = JSON.parse(localStorage.getItem('auth'));
  var sr_login = JSON.parse(localStorage.getItem('auth')).length === 0;
  if (sr_login) {

  } else {
    this.setState({error: false});
    this.setState({isLoggedIn: true});
  }
   }

exit() {
fetch('https://patykids.ru/enter?logout=1', {
  method: 'GET',
   mode: 'cors',
  credentials: 'include'
})   
 .then(res => res.json())
  .then(json => console.log(json));
   this.setState({isLoggedIn: false});
   localStorage.setItem('auth', JSON.stringify([]));
}

 getorder_id(id) {
this.setState({ popout: <ScreenSpinner /> });
          fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getOrder&param={"id":['+id+']}')
          .then(response => response.json())
          .then(data => this.setState({ getorder_id: data.response.orders, popout: null}));
          this.setState({ activePanel: 'order_id'});
  }
   getorder_email() {
    this.setState({ popout: <ScreenSpinner /> });
          var login = JSON.parse(localStorage.getItem('auth'));
          fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getOrder&param={"email":["'+login.email+'"]}')
          .then(response => response.json())
          .then(data => this.setState({ getorder_email: data.response.orders, popout: null}));
          this.setState({ activePanel: 'order'});
  }

  handlepass(event) {
    this.setState({passs: event.target.value});
  }
  handleemail(event) {
    this.setState({email: event.target.value});
  }

  opengroup() {
    connect.send("VKWebAppJoinGroup", {"group_id": 146767762});
  }

          auth() {
            this.setState({ popout: <ScreenSpinner /> });

                 fetch('https://patykids.ru/ajaxrequest', {
  method: 'post',
  mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('actionerClass=Ajaxuser&action=isUserAuth')
})   

  .then(res=>res.json())
  .then(data => localStorage.setItem('auth', JSON.stringify(data.data.auth)), this.setState({popout: null}));
  //.then(data => this.setState({ auth: data.data.auth }));
  var login = JSON.parse(localStorage.getItem('auth'));
  var sr_login = login.length === 0;
  if (sr_login) {
    this.setState({error: true});
  } else {
    this.setState({error: false});
    this.setState({isLoggedIn: true});
  }

  /* JSON.parse(localStorage.getItem('cart_c'))

          var srr = this.state.auth;
          var match = srr.auth.email === this.state.email;
          console.log(match);

          if (match) {
          localStorage.setItem('auth', true);
          this.setState({isLoggedIn: true});
          this.setState({error: false});

          } else {
            localStorage.setItem('auth', false);
            this.setState({error: true});
            console.log('Нажата кнопка 2');
          }*/
        
        }

  click(){


          fetch('https://patykids.ru/enter', {
  method: 'post',
  mode: 'no-cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('email='+ this.state.email +'&pass=' + this.state.passs)
});
 this.auth();        
}
  
  render () {
    const isLoggedIn = this.state.isLoggedIn;
    const error = this.state.error;
    console.log(this.state);
    var logins = JSON.parse(localStorage.getItem('auth'));

    return (
      
        <View popout={this.state.popout} activePanel={this.state.activePanel}>
          <Panel id="mores">
      {isLoggedIn ? (
        
         <View>  
        <PanelHeader>Личный кабинет</PanelHeader>
     <Group title={logins.name}>
    <List>
                <Cell expandable onClick={() => this.getorder_email()}>Мои заказы</Cell>
              </List>
      <CellButton onClick={() => this.exit()} level="danger">Выйти</CellButton>
    </Group>

    <Footer>Version App: 3.0.1</Footer>
         </View>  
      ) : (
                   <View>   
                        <PanelHeader>Личный кабинет</PanelHeader>



                 <Group>   <FormLayout>

                                         {error ? (
             <FormStatus title="Ошибка входа" state="error">
        Проверьте правильность пароля или Email.
      </FormStatus>
      ) : (
<list></list>
      )}

      <Input value={this.state.email} onChange={this.handleemail} top="Email" />
      <Input value={this.state.passs} onChange={this.handlepass} type="password" top="Пароль" />
      <Button onClick={() => this.click()} size="xl" level="secondary">Войти</Button>
    </FormLayout> </Group>

    <Group>
              <CellButton >
                Регистрация
              </CellButton>
              <CellButton onClick={() => this.opengroup()}>
                Вступить в сообщество
              </CellButton>
            </Group>
            <Footer>Version App: 3.0.1</Footer>
        
</View>
      )} 
      </Panel>




          <Panel id="order">
  
<PanelHeader left={ <HeaderButton onClick={() => this.setState({ activePanel: 'mores'})}> <Icon24Back/>  </HeaderButton> }>Ваши заказы</PanelHeader>
{this.state.getorder_email.map((order, index) => (
<Group onClick={() => this.getorder_id(order.id)} indicator={order.status_id} title={'Заказ ' + order.number + ' от ' + order.add_date} description={'Комментарий пользователя: ' + order.user_comment + '. Комментарий менеджера: ' + order.comment}>

          <Cell>
            На сумму: {order.summ} руб.
          </Cell>
          <Cell>
            На имя: {order.name_buyer}.
          </Cell>
      </Group>
))}
          </Panel>

          <Panel id="order_id">
  <PanelHeader left={ <HeaderButton onClick={() => this.setState({ activePanel: 'order'})}> <Icon24Back/>  </HeaderButton> }>Заказ</PanelHeader>

<Group title="Товары в заказе">
{this.state.getorder_id.map((order, index) => order.order_content.map((ordersp, index) => (
          <Cell>
            {ordersp.name}, {ordersp.count + ' шт.'}
          </Cell>
)))}
      </Group>

  </Panel>

 </View>
)
}
}

export default LoginPanel;