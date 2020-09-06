import React from 'react';
import loader from '../../img/loader.gif';

const Loader = () => {
  return (
    <img
      src={loader}
      alt='Loading...'
      style={{ width: 180, margin: 'auto', display: 'block' }}
    />
  );
};

export default Loader;
