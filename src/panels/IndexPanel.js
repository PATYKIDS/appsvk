import React from 'react';
import PropTypes from 'prop-types';
import { View, Epic, Tabbar, Route, Link, Avatar, ScreenSpinner, Search, TabbarItem, Panel, Gallery, CellButton, List, Cell, Group, PanelHeader, Div, Header, HorizontalScroll, Button } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import ProdPanel from '../panels/ProdPanel';

const itemStyle = {
    flexShrink: 0,
    width: 80,
    height: 94,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 12
  }

class IndexPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    isLoading: false,
    category: [],
    newpr: [],
    rappr:[],
    pr_c: true
    };
  }

  rec(){
   return <ProdPanel id="discover"/>;
  }

  componentDidMount() {
    this.setState({ isLoading: true });
fetch("https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getCategorylevel")
          .then(response => response.json())
          .then(data => this.setState({ category: data.response.categories }));
fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getProductNew&param={"page":1,"count":20,"variants":"false","property":"false"}')
          .then(response => response.json())
          .then(data => this.setState({ newpr: data.response.products }));
fetch('https://patykids.ru/api?token=gfgdfgsdfgh5484fdg89df4gd&method=getProductRap&param={"page":1,"count":20,"variants":"false","property":"false"}')
          .then(response => response.json())
          .then(data => this.setState({ rappr: data.response.products, isLoading: false })); 
              
  }

  go = (e) => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
  };

  render() {
        const { isLoading, pr_c } = this.state;

    if (isLoading) {
      return <View><ScreenSpinner /></View>;
    }

    return (

           <View>
            <PanelHeader>PatyKids</PanelHeader>
                
              <Gallery
                slideWidth="90%"
                style={{ height: 150 }}
                bullets="dark"
              >
                <div style={{ backgroundImage: 'url(https://pp.userapi.com/c851224/v851224107/a93f8/O_vhThb5DEs.jpg)', backgroundSize: 'cover' }} />
                <div style={{ backgroundImage: 'url(https://pp.userapi.com/c849428/v849428725/1356f4/_GKalL7LD0o.jpg)', backgroundSize: 'cover' }} />
                <div style={{ backgroundImage: 'url(https://patykids.ru/uploads/thumbs/chidghdxghcldrens.png)', backgroundSize: 'cover' }} />
              </Gallery>
           

            <Group style={{ paddingBottom: 10 }}>
        <Header level="2">Категории</Header>
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
{this.state.category.map((person, index) => (
              <div key={index} onClick={ () => localStorage.setItem('activeStory', 'discover')} style={itemStyle}>
              <Avatar size={64} src={"https://patykids.ru/" + person.image_url} style={{ marginBottom: 8, backgroundSize: 'cover' }}></Avatar>
              {person.title}
            </div>
            ))}

          </div>
        </HorizontalScroll>
      </Group>

      <ProdPanel id="discover"/>

<Group title="Новинки" style={{ paddingBottom: 10 }}>
      <HorizontalScroll>
          <div style={{ display: 'flex' }}>
          {this.state.newpr.map((person1, index) => (
            <div style={{itemStyle, paddingLeft: 4, width: 'unset' }}>
                 <Cell
                          photo="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
                          description={person1.price + ' руб'}
                          onClick={() => this.rec()}
                          bottomContent={<Button>Купить</Button>}
                          before={<Avatar object="borderradius: '1%'" src={"https://patykids.ru/uploads/product/4100/" + person1.id + "/" + person1.image_url} size={80}/>}
                          size="l">
                          {person1.title}
                  </Cell> 
            </div>
 ))}
            
          </div>
        </HorizontalScroll>
</Group>

<Group title="Распродажа" style={{ paddingBottom: 10 }}>
      <HorizontalScroll>
          <div style={{ display: 'flex' }}>
           {this.state.rappr.map((person, index) => (
            <div style={{itemStyle, paddingLeft: 4, width: 'unset' }}>
              <Cell
                          photo="https://pp.userapi.com/c841034/v841034569/3b8c1/pt3sOw_qhfg.jpg"
                          description={person.price + ' руб'}
                          bottomContent={<Button>Купить</Button>}
                          before={<Avatar style="borderradius: '1%'" src={"https://patykids.ru/uploads/product/3800/" + person.id + "/" + person.image_url} size={80}/>}
                          size="l">
                          {person.title}
                  </Cell> 
            </div>
            ))}
          </div>
        </HorizontalScroll>
</Group>
          </View>
    );
  }
}

export default IndexPanel;
