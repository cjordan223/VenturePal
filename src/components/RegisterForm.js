// components/RegisterForm.js

import React, { useState } from "react";

const RegisterForm = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        onRegister(username, email, password);

    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label> Username </label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label> Email </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label> Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit"> Register </button>
        </form>
    );
};

export default RegisterForm;