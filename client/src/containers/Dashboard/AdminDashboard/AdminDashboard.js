import React, { Component } from 'react';
import {Icon,Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import AdminLanding from '../../Landing/AdminLanding/AdminLanding';
import DeviceUI from '../../DeviceUI/DeviceUI';
import Signup from '../../Authentication/Signup/Signup';
import ResetPassword from '../../ResetPassword/ResetPassword';
import RemoveUser from '../../RemoveUser/RemoveUser';
import './AdminDashboard.css';


class AdminDashboard extends Component{

    render() {
      
        return (
            <div>
                <Sidebar.Pushable as={Segment} style={{height:'150vh',margin:'0px'}}>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible={true}
                    width='thin'
                >
                    <Menu.Item as={Link} to="/dashboard/landing">
                        <Icon name='user' />
                       View Devices
                    </Menu.Item>
                    <Menu.Item as={Link} to="/dashboard/newdevice">
                        <Icon name='plus circle' />
                       Add new Device
                    </Menu.Item>
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
                      Reset Password
                    </Menu.Item>
                    <Menu.Item as={Link} to="/" onClick={this.props.logoutHandler}>
                        <Icon name='external' />
                        Logout
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher >
                    <Segment basic>
                        <Switch>
                            <Route exact path="/dashboard/landing" component={AdminLanding} />
                            <Route exact path="/dashboard/newdevice" component={DeviceUI} />
                            <Route exact path="/dashboard/newuser" component={Signup} />
                            <Route exact path="/dashboard/resetpassword" component={ResetPassword} />
                            <Route exact path="/dashboard/deleteuser" component={RemoveUser} />
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    
    }
}

export default AdminDashboard;