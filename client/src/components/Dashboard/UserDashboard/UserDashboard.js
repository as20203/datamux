import React, { useState } from 'react';
import {Icon,Menu, Segment, Sidebar,Accordion } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import { Landing, SingleDeviceUI, MultipleDevices, NestedLinks } from 'components';
import './UserDashboard.css';


const UserDashboard=(props)=>{
    const [activeIndex,setActiveindex] = useState(parseInt(sessionStorage.getItem('activeIndex')));
    const [nestedActiveIndex, setNestedActiveIndex] = useState(parseInt(sessionStorage.getItem('nestedActiveIndex')));

    const handleClick = (_,titleProps) => {
        setActiveindex(_=>{
            const { index } = titleProps;
            if(sessionStorage.getItem('nestedActiveIndex')){
                sessionStorage.clear()
            }
            sessionStorage.setItem("activeIndex",index)
            return index;
        });
    }
    

    return (
        <div className='user-dashboard-main'>
            <Sidebar.Pushable style={{overflowX:window.matchMedia("(max-width: 500px)").matches?'scroll':'visible'}} as={Segment} className='user-sidebar-pushable'>
            <Sidebar
                as={Menu}
                animation='push'
                icon='labeled'
                inverted
                vertical
                visible={true}
                width='thin'>
                <Menu.Item as={Link} to="/dashboard/landingpage" active={activeIndex === 0} index={0} onClick={handleClick}>
                    <Icon name='user' />
                    View Devices
                </Menu.Item>
                
                <Menu.Item as={Accordion} >
                    <Accordion.Title style={{color:'white',textAlign:'justify'}} active={activeIndex === 1} index={1} onClick={handleClick}>
                            <Icon name='dropdown' />
                            Add  Devices
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 1}>
                        <NestedLinks
                         setNestedActiveIndex={setNestedActiveIndex}
                         nestedActiveIndex={nestedActiveIndex} 
                            links={[
                                {index:0,to:'/dashboard/newdevice',name:'plus circle',title:'Add Single Device'},
                                {index:1,to:'/dashboard/bulkdevices',name:'plus circle',title:'Add Multiple Device'}]} 
                        />

                    </Accordion.Content>
                </Menu.Item>
                <Menu.Item as={Link} to="/" onClick={props.logoutHandler}>
                    <Icon name='external' />
                    Logout
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher >
                <Segment basic>
                    <Switch>
                        <Route exact path="/dashboard/landingpage" render={(p)=><Landing {...p} user={props.user} />} />
                        <Route exact path="/dashboard/newdevice" component={SingleDeviceUI} />
                        <Route exact path="/dashboard/bulkdevices" component={MultipleDevices} />
                    </Switch>
                </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export { UserDashboard };