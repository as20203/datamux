import React, { useState } from 'react';
import {Icon,Menu, Segment, Sidebar,Accordion } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import Landing from 'components/Landing/Landing';
import DeviceUI from 'components/DeviceUI/SingleDevice/DeviceUI';
import MultipleDeviceUI from 'components/DeviceUI/BulkDevices/BulkDevices';
import './UserDashboard.css';


const UserDashboard=(props)=>{
    const [activeIndex,setActiveIndex] = useState(1);

    const handleClick = (e,titleProps) => {
        setActiveIndex(activeIndex=>{
            const { index } = titleProps
            const newIndex = activeIndex === index ? -1 : index
            return newIndex;
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
                <Menu.Item as={Link} to="/dashboard/landingpage">
                    <Icon name='user' />
                    View Devices
                </Menu.Item>
                <Menu.Item as={Accordion} >
                    <Accordion.Title style={{color:'white'}} active={activeIndex === 1} index={0} onClick={handleClick}>
                            <Icon name='dropdown' />
                            Add  Devices
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 0}>
                        <Menu.Item as={Link} to="/dashboard/newdevice">
                            <Icon name='plus circle' />
                            Add Single Device
                        </Menu.Item>
                        <Menu.Item as={Link} to="/dashboard/bulkdevices">
                            <Icon name='plus circle' />
                            Add Multiple Devices
                        </Menu.Item>

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
                        <Route exact path="/dashboard/newdevice" component={DeviceUI} />
                        <Route exact path="/dashboard/bulkdevices" component={MultipleDeviceUI} />
                    </Switch>
                </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
}

export default UserDashboard;