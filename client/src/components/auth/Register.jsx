import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert';
import { register } from '../../redux/actions/auth';
import { clearPosts } from '../../redux/actions/post';

const Register = ({ isAuthenticated, clearPosts, setAlert, register }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        password2: '',
    });

    const { name, email, username, password, password2 } = formData;

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

        if (password !== password2) {
            setAlert('Passwords do not match', 'danger', 3000);
        } else {
            register({ name, email, username, password });
        }
    };

    return (
        <div className='auth-container'>
            <div className='login-right'>
                <p className='brand-logo'>Instagram</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            type='name'
                            placeholder='Name'
                            name='name'
                            value={name}
                            onChange={e => onChange(e)}
                        />
                    </div>
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
                            type='username'
                            placeholder='Username'
                            name='username'
                            value={username}
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
                        <input
                            type='password'
                            placeholder='Enter Password again'
                            name='password2'
                            value={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-primary'>
                            Sign Up
                        </button>
                    </div>
                </form>
                <p className='my-1 auth-bottom-link'>
                    Already have an account?{' '}
                    <Link to='/login' className='link'>
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    clearPosts: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { clearPosts, setAlert, register })(Register);
