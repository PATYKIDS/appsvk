import React from 'react';
import PropTypes from 'prop-types';
import { View, Epic, Tabbar, Route, Link, Avatar, ScreenSpinner, Search, TabbarItem, Panel, Gallery, CellButton, List, Cell, Group, PanelHeader, Div, Header, HorizontalScroll, Button } from '@vkontakte/vkui';

const itemStyle = {
    flexShrink: 0,
    width: 80,
    height: 94,
    display: 'flex',
    flexDirection:
    'column',
    alignItems: 'center',
    fontSize: 12
  };

const IndexPanel = ({ id, go, fetchedUser }) => (
	
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
           

            <Group style={{ paddingBottom: 8 }}>
        <Header level="2">Категории</Header>
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            <div style={itemStyle}>
              <Avatar size={64} style={{ marginBottom: 8, backgroundImage: 'url(https://patykids.ru/uploads/cat_malhhfghfrHAWr.jpg)', backgroundSize: 'cover' }}></Avatar>
              Мальчикам
            </div>
            <div style={itemStyle}>
              <Avatar size={64} style={{ marginBottom: 8, backgroundImage: 'url(https://patykids.ru/uploads/cat_58c9138a8f582.jpg)', backgroundSize: 'cover' }}></Avatar>
              Девочкам
            </div>

          </div>
        </HorizontalScroll>
      </Group>

          </View>
		     
);

export default IndexPanel;
