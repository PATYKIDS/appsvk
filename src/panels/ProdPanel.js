import React from 'react';
import connect from '@vkontakte/vkui-connect';
import PropTypes from 'prop-types';
import { View, Epic, Tabbar, platform, IOS, ANDROID, HeaderButton, Route, FormLayout, SelectMimicry, Link, Avatar, ScreenSpinner, Search, TabbarItem, Panel, Gallery, CellButton, List, Cell, Group, PanelHeader, Div, Header, HorizontalScroll, Button } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Search from '@vkontakte/icons/dist/24/search';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import App from '../App';
const osname = platform();

  /*{person.property.map(item => item.data[0].map(items => (
<Cell expandable indicator={items.name}>{item.name}</Cell>
)))}*/


class ProdPanel extends React.Component {
   constructor (props) {
    super(props);

    this.state = {
      activePanel: 'discover',
      variants: '',
      variantid: '',
      error: null,
      data: [],
      shere: [],
      variant: [],
      id: [],
      popout: null,
      idc: [],
      search: '',
      prod:[]
  };

  this.onStoryChange = this.onStoryChange.bind(this);
  this.onChange = this.onChange.bind(this);
}



onChange (search) { this.setState({ search }); }

  componentDidMount() {
          this.setState({ popout: <ScreenSpinner /> });
          fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getProduct&param={"page":1,"count":20,"variants":"true","property":"false"}')
         // .then(response => response.json())
          .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({error: true, popout: null});
        }
      })
          .then(data => this.setState({ prod: data.response.products, popout: null }));
    if (this.props.item !== null) {
          this.idcontent(this.props.item);
    } 
  }

  cartadd(id, variantid){
      //fetch('https://patykids.ru/cart?updateCart=1&inCartProductId='+ id)
      //.then(response => response.json())
      //.then(data => this.setState({ data: data.response.data }));

fetch('https://patykids.ru/cart', {
  method: 'post',
  mode: 'cors',
  credentials: 'include',
  cache: 'default',
  body:new URLSearchParams('updateCart=1&variant='+variantid+'&inCartProductId='+id)
})
  .then(res=>res.json())
  .then(data => localStorage.setItem('cart_c', JSON.stringify(data.data)));
  //this.props.activeStory({activeStory: 'messages'})
  }

  shepr(id){

          var idc = this.state.idc;
          var shere = this.state.shere;

fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getCategory&param={"id":['+id+']}')
          .then(response => response.json())
          .then(data => this.setState({ shere: data.response.categories}));

          connect.send("VKWebAppShare", {"link": "https://patykids.ru/"+shere[0].parent_url+shere[0].url +"/"+idc[0].url});
  }

  idcontent(id) {

this.setState({ popout: <ScreenSpinner /> });

          fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getProduct&param={"id":['+id+'],"variants":"true","property":"false"}')
          .then(response => response.json())
          .then(data => this.setState({ idc: data.response.products, popout: null}));
          this.setState({ activePanel: 'nothing'});
  }

    /*get thematics () {
      const search = this.state.search.toLowerCase();
      return this.state.prod.filter(({title}) => title.toLowerCase().indexOf(search) > -1);
    }*/

  onStoryChange (e) {
    this.setState({ activeStory: e.currentTarget.dataset.story })
  }

  render () {
    return (

<View popout={this.state.popout} id="discover" activePanel={this.state.activePanel}>


          <Panel id="discover">

            <PanelHeader>
Каталог
          </PanelHeader>
          <Search value={this.state.search} onChange={this.onChange}/>

                  <Group title="Товары">
 <List>
        {this.state.prod.map((person, index) => (
<List key={index}>

               <Cell
          photo="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
          description={person.description}
          onClick={(e) => this.idcontent(person.id, e)}
          bottomContent={<Button>Добавить</Button>}
          before={<Avatar src={"https://patykids.ru/uploads/product/4200/" + person.id + "/" + person.image_url} size={80}/>}
          size="l"
        >
         {person.title} {person.price} руб
        </Cell>

                  </List>

                            ))}
                    </List>


                  </Group>

          </Panel>


<Panel id="nothing">

{this.state.idc.map((person, index) => (
  <Div key={index} style={{padding: '0'}}>
<Group>
              <Gallery
                slideWidth="100%"
                align="center"
                style={{ height: 350 }}
                bullets="dark"
              >
            
                <Div align="center">
                <Div style={{ position: 'relative', width: '450px', height: '300px' }}>
                <img style={{ position: 'absolute', display: 'block', left: '0.524091px', top: '0px', height: '300px' }} src={"https://patykids.ru/uploads/product/4200/" + person.id + "/" + person.image_url} />
                </Div>
                </Div>

              </Gallery>
</Group>

              <PanelHeader left={ <HeaderButton onClick={() => this.setState({ activePanel: 'discover', idc: [], variants: ''})}> <Icon24Back/>  </HeaderButton> } >Товар {person.code}</PanelHeader>



<Group title="Название"><Div>{person.title}</Div></Group>
<Group title="Описание"><Div>{person.description}</Div></Group>
<Group>
<List>
<Cell indicator={person.price + ' руб'}>Цена</Cell>
</List>
</Group>
  <Group title="Характеристики">
  <List>

<Cell expandable indicator={person.property[1].data[0].name}>{person.property[1].name}</Cell>
<Cell expandable indicator={person.property[2].data[0].name}>{person.property[2].name}</Cell>

</List>
</Group>

  <Group title="Варианты товара">
 <FormLayout>
                <SelectMimicry
                  placeholder="Не выбран"
                  onClick={() => this.setState({ activePanel: 'variants' })}
                >{this.state.variants}</SelectMimicry>
              </FormLayout>
</Group>

<Group>
    <Div>
       <Button onClick={() => this.cartadd(person.id, this.state.variantid)} size="xl" level="commerce">Купить</Button>
     </Div>
     </Group>
     

    
      <Group>
     <Div>
     <Button 
    size="xl" 
    level="secondary"
    onClick={() => this.shepr(person.cat_id)}
  >
  Рассказать друзьям
  </Button>
  </Div>
            </Group>
</Div>
    ))}
           
          </Panel>

            <Panel id="variants">
              <PanelHeader>
                Выбор варианта
              </PanelHeader>
              <Group>
                <List>

                {this.state.idc.map((person, index) => person.variants.map((item, index) => (
                  <Cell key={index}
                    onClick={() => this.setState({ variants: item.title_variant, variantid: item.id, activePanel: 'nothing' })}
                    asideContent={this.state.variants === item.title_variant ? <Icon24Done fill="var(--accent)" /> : null}
                  >
                    {item.title_variant}
                  </Cell>
                )))}

                </List>
              </Group>
            </Panel>

        </View>
         

)
}
}

export default ProdPanel;

