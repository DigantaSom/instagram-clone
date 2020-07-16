import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import LoginImg from '../../img/insta-login-mobile.jpg';
// Redux
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { clearPosts } from '../../redux/actions/post';

const Login = ({ isAuthenticated, clearPosts, login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    useEffect(() => {
        clearPosts();
    }, [clearPosts]);

    if (isAuthenticated) {
        return <Redirect to='/' />;
    }

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        login({ email, password });
    };

    return (
        <div className='auth-container'>
            <div className='login-left'>
                <img src={LoginImg} alt='Mobile' />
            </div>
            <div className='login-right'>
                <p className='brand-logo'>Instagram</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='my-1 auth-bottom-link'>
                    Dont't have an account?{' '}
                    <Link to='/register' className='link'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    clearPosts: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { clearPosts, login })(Login);
