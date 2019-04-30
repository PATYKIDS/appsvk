import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, PanelHeader, Panel, Group, List, Cell, Footer, Input, HeaderButton, FormStatus, Link, Checkbox, Textarea, Radio, FormLayoutGroup, FormLayout, Button, Avatar, Div, ScreenSpinner } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class CartPanel extends React.Component {
   constructor (props) {
    super(props);

    this.state = {
    activePanel: 'notifications',
    cart: [JSON.parse(localStorage.getItem('cart_c'))],
    pay: [],
    delivery: [],
    logins: [],
    auth: [],
    isLoggedIn: null,
    isLoading: null
    };
    this.deleted = this.deleted.bind(this);
  }

  deleted(property, itemId, variantId){
fetch('https://patykids.ru/cart', {
  method: 'post',
  mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('action=cart&delFromCart=1&itemId='+itemId+'&property='+property+'8&variantId='+variantId)
})
  .then(res=>res.json())
  .then(data => localStorage.setItem('cart_c', JSON.stringify(data.data)));
  document.location.reload(true);
  }

 componentDidMount() {       
//localStorage.setItem('auth', JSON.stringify([]));
this.setState({ logins: JSON.parse(localStorage.getItem('auth'))});

fetch('https://patykids.ru/ajaxrequest', {
  method: 'post',
   mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('actionerClass=Ajaxuser&action=isUserAuth')
})   

  .then(res=>res.json())
  .then(data => localStorage.setItem('auth', JSON.stringify(data.data.auth)));
  var login = JSON.parse(localStorage.getItem('auth'));

  var sr_login = login.length === 0;
  if (sr_login) {
    this.setState({isLoggedIn: false});
  } else {
    this.setState({isLoggedIn: true});
  }
  }

  deliverysumm(id) {
fetch('https://patykids.ru/order', {
  method: 'post',
   mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('action=getPaymentByDeliveryId&deliveryId='+ id +'&customer=fiz&lang=LANG')
})
  .then(res=>res.json())
  .then(data => this.setState({ delivery: data }));
  }

  paysumm(id) {
fetch('https://patykids.ru/order', {
  method: 'post',
   mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('action=setPaymentRate&paymentId='+ id)
})
  .then(res=>res.json())
  .then(data => this.setState({ pay: data }));
  }

  render () {
    const { cart,isLoggedIn } = this.state;



  if (cart[0].cart_count === 0) {
      return <View><Panel><PanelHeader>Корзина</PanelHeader><Group><Div>В корзине пусто</Div></Group></Panel></View>;
    }
    
    console.log(this.state);
    return (
<View id="notifications" activePanel={this.state.activePanel}>
          <Panel id="notifications">
            <PanelHeader>Корзина</PanelHeader>
<Group title="Товары в корзине" >   
{this.state.cart.map((person, index) => person.dataCart.map((list, index) => (
 <List> 
<Cell removable onRemove={() => this.deleted(list.property, list.id, list.variantId)} before={<Avatar style="borderradius: '1%'" src={list.image_url_new} size={64}/>}description={list.priceInCart + list.countInCart + ' шт'}>{list.title}</Cell> 
</List>
)))
}
{this.state.cart.map((person, index) => (
   <List> 
<Cell  key={index} indicator={person.cart_price_wc}>Итого:</Cell>
<Cell key={index} indicator={person.cart_count}>Всего товаров:</Cell>
</List>
))}
</Group>  
<Group>
    <Div>
       <Button onClick={(e) => this.setState({ activePanel: 'nothing'})} size="xl" level="commerce">Оформить</Button>
     </Div>
     </Group>      
 </Panel>

  <Panel id="nothing">
   {isLoggedIn ? (
<View>
<PanelHeader left={ <HeaderButton onClick={() => this.setState({ activePanel: 'notifications'})}> <Icon24Back/>  </HeaderButton> }>Оформление заказа</PanelHeader>
<Group title="Информация о пользователе">
<FormLayout>
            <Input
              type="email"
              top="E-mail"
              required
              name="email"
              value={this.state.logins.email}
            />

                        <Input
              type="email"
              top="Телефон"
              name="tel"
              value={this.state.logins.phone}
            />

                        <Input
              type="email"
              top="Фамилия Имя Отчество"
              name="email"
              value={this.state.logins.name}
            />

                        <Input
              type="email"
              top="Адрес доставки"
              name="email"
              value={this.state.logins.address}
            />
 <FormLayoutGroup top="Серия и номер паспорта + информация о дозаказе:" bottom="При отправке СДЭКом укажите адрес пункта выдачи, при отправки почтой России: полный домашний адрес.">
                        <Textarea
              type="email"
              name="email"
            />
              </FormLayoutGroup>

            </FormLayout>
            </Group>

            <Group title="Доставка">
<FormLayout>
         <FormLayoutGroup>
              <Radio  onClick={() => this.deliverysumm(2)} name="type">Доставка до почтового отделения 100 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(3)} name="type">Доставка до терминала ТК Энергия 100 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(4)} name="type">Доставка до терминала ТК Деловые Линии 100 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(6)} name="type">Доставка до терминала ТК ПЭК 100 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(7)} name="type">Дозаказ к основному заказу 0 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(8)} name="type">Доставка до терминала ТК Кит 150 руб.</Radio>
              <Radio  onClick={() => this.deliverysumm(12)} name="type">Доставка до пункта СДЭК 100 руб.</Radio>
            </FormLayoutGroup>
</FormLayout> </Group>



            <Group title="Выберите способ оплаты">
<FormLayout>
         <FormLayoutGroup>
              <Radio onClick={() => this.paysumm(17)} name="type">На карту Сбербанка</Radio>
              <Radio onClick={() => this.paysumm(18)} name="type">Тинькофф</Radio>
            </FormLayoutGroup>

            <Footer>{'Сумма заказа:' + this.state.pay.summ + ' + доставка:' + this.state.delivery.summDelivery}</Footer>

               <Checkbox>Заполняя форму вы соглашаетесь с обработкой персональных данных согласно <Link>пользовательского соглашения</Link></Checkbox>
            <Button size="xl">Оформить</Button>
</FormLayout> </Group>
</View>
     ) : (
          <View>
          <PanelHeader left={ <HeaderButton onClick={() => this.setState({ activePanel: 'notifications'})}> <Icon24Back/>  </HeaderButton> }>Оформление заказа</PanelHeader>
          <Group>
          <FormStatus title="Ошибка оформления заказа" state="error">Для оформления заказа необходимо войти</FormStatus>
          </Group>
          </View>
            
)}
 </Panel>
        </View>
)
}
}

export default CartPanel;
