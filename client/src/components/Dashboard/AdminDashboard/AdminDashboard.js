import React, { useState } from 'react';
import {Icon,Menu, Segment, Sidebar, Accordion } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import Landing from 'components/Landing/Landing';
import DeviceUI from 'components/DeviceUI/SingleDevice/DeviceUI';
import MultipleDeviceUI from 'components/DeviceUI/BulkDevices/BulkDevices';
import Signup from 'components/Authentication/Signup/Signup';
import ResetPassword from 'components/ResetPassword/ResetPassword';
import RemoveUser from 'components/RemoveUser/RemoveUser';
import './AdminDashboard.css';


const AdminDashboard=(props)=>{
    const [activeIndex,setActiveindex] = useState(1);
    const handleClick = (e,titleProps) => {
        setActiveindex(activeIndex=>{
            const { index } = titleProps
            const newIndex = activeIndex === index ? -1 : index
            return newIndex;
        });
    }
    
    return (
        <div className='admin-dashboard-main'>
            <Sidebar.Pushable style={{overflowX:window.matchMedia("(max-width: 500px)").matches?'scroll':'visible'}} as={Segment} className='admin-sidebar-pushable' >
            <Sidebar
                as={Menu}
                animation='uncover'
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
                    <Accordion.Title style={{color:'white',textAlign:'justify'}} active={activeIndex === 0} index={0} onClick={handleClick}>
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
                    
                    <Accordion.Title style={{color:'white',textAlign:'justify'}} active={activeIndex === 1} index={1} onClick={handleClick}>
                            <Icon name='dropdown' />
                            Set Users
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 1}>
                        <Menu.Item as={Link} to="/dashboard/newuser">
                            <Icon name='user plus' />
                            Add new User
                        </Menu.Item>
                        <Menu.Item as={Link} to="/dashboard/deleteuser">
                            <Icon name='remove user' />
                            Remove User
                        </Menu.Item>
                        <Menu.Item as={Link} to="/dashboard/resetpassword">
                            <Icon name='redo' />
                        Reset Admin Password
                        </Menu.Item>

                    </Accordion.Content>

                    
                </Menu.Item>
                
                <Menu.Item as={Link} to="/" onClick={props.logoutHandler}>
                    <Icon name='external' />
                    Logout
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher >
                
                    <Switch>
                        <Route exact path="/dashboard/landingpage" render={(p)=><Landing {...p} user={props.user} />} />
                        <Route exact path="/dashboard/newdevice" component={DeviceUI} />
                        <Route exact path="/dashboard/newuser" component={Signup} />
                        <Route exact path="/dashboard/resetpassword" component={ResetPassword} />
                        <Route exact path="/dashboard/deleteuser" component={RemoveUser} />
                        <Route exact path="/dashboard/bulkdevices" component={MultipleDeviceUI} />
                    </Switch>
                
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
    
    
}

export default AdminDashboard;