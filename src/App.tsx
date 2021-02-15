import React from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Home from './pages/Home/Home';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

function App() {

    const logout = async () => {
       await Auth.signOut;     
       window.location.reload();
    };

    return (
        <div className="popular-places-app">
            <AppBar position='static'>
                <Toolbar className="toolbar">
                    <Typography variant='h4' className="toolbar-title">
                        Popular places app
                    </Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Home />
            </Container>
        </div>
    );
}

export default withAuthenticator(App);
