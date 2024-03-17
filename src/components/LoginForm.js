//components/LoginForm.js

import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onLogin(username,password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;