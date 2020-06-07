import React, { useState } from 'react';
import {Icon,Menu, Segment, Sidebar, Accordion } from 'semantic-ui-react';
import {Link,Switch,Route} from 'react-router-dom';
import { Landing, SingleDeviceUI, MultipleDevices,
        ThingsBoard, Signup, ResetPassword, RemoveUser,
        NestedLinks } from 'components';
import './AdminDashboard.css';


const AdminDashboard=(props)=>{
    const [activeIndex,setActiveindex] = useState(parseInt(sessionStorage.getItem('activeIndex')));
    const [nestedActiveIndex, setNestedActiveIndex] = useState(parseInt(sessionStorage.getItem('nestedActiveIndex')));

    const handleClick = (_,titleProps) => {
        setActiveindex(prevIndex=>{
            const {index,active} = titleProps
            if(!active){
                if(sessionStorage.getItem('nestedActiveIndex')){
                    sessionStorage.clear()
                }
                sessionStorage.setItem("activeIndex",index)
                return index;
            }
            return '';
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
                <Menu.Item as={Link} to="/dashboard/landingpage" active={activeIndex === 0}  index={0} onClick={handleClick}>
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
                    
                    <Accordion.Title style={{color:'white',textAlign:'justify'}} active={activeIndex === 2} index={2} onClick={handleClick}>
                            <Icon name='dropdown' />
                            Set Users
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 2}>
                    <NestedLinks 
                    setNestedActiveIndex={setNestedActiveIndex}
                    nestedActiveIndex={nestedActiveIndex}
                            links={[
                                {index:2,to:'/dashboard/newuser',name:'user plus',title:'Add New User'},
                                {index:3,to:'/dashboard/deleteuser',name:'remove user',title:'Remove User'},
                                {index:4,to:'/dashboard/resetpassword',name:'redo',title:'Reset Admin Passsword'}]} 
                        />
                    </Accordion.Content>

                    <Accordion.Title style={{color:'white',textAlign:'justify'}} active={activeIndex === 3} index={3} onClick={handleClick}>
                            <Icon name='dropdown' />
                            Generate CSV
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 3}>
                    <NestedLinks 
                    setNestedActiveIndex={setNestedActiveIndex}
                    nestedActiveIndex={nestedActiveIndex}
                            links={[
                                {index:5,to:'/dashboard/thingsboard',name:'user plus',title:'THINGSBOARD'},
                            ]}
                        />
                    </Accordion.Content>


                </Menu.Item>
                
                <Menu.Item as={Link} to="/" onClick={props.logoutHandler}>
                    <Icon name='external' />
                    Logout
                </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher >
                
                    <Switch>
                        <Route exact path="/dashboard/landingpage" render={(p)=><Landing {...p}  />} />
                        <Route exact path="/dashboard/newdevice" component={SingleDeviceUI} />
                        <Route exact path="/dashboard/newuser" component={Signup} />
                        <Route exact path="/dashboard/resetpassword" component={ResetPassword} />
                        <Route exact path="/dashboard/deleteuser" component={RemoveUser} />
                        <Route exact path="/dashboard/bulkdevices" component={MultipleDevices} />
                        <Route exact path="/dashboard/thingsboard" render={(p)=><ThingsBoard {...p}  />} />
                    </Switch>
                
            </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    )
    
    
}

export { AdminDashboard };