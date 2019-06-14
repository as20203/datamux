import React, { Component } from 'react';
import {Icon,Menu, Segment, Sidebar } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import UserLanding from '../../Landing/UserLanding/UserLanding';
import DeviceUI from '../../DeviceUI/DeviceUI';
import './UserDashboard.css';


class UserDashboard extends Component{

    render() {
      
        return (
            <div>
                <Sidebar.Pushable as={Segment} style={{height:'180vh',margin:'0px'}}>
                <Sidebar
                    as={Menu}
                    animation='push'
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
                    <Menu.Item as={Link} to="/" onClick={this.props.logoutHandler}>
                        <Icon name='external' />
                        Logout
                    </Menu.Item>
                </Sidebar>

                <Sidebar.Pusher >
                    <Segment basic>
                        <Switch>
                            <Route exact path="/dashboard/landing" component={UserLanding} />
                            <Route exact path="/dashboard/newdevice" component={DeviceUI} />
                        </Switch>
                    </Segment>
                </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    
    }
}

export default UserDashboard;