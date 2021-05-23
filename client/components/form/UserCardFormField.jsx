import React from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import Input from '#/components/input';

function UserCardFormField({ label, name, type, register }) {
  const { errors } = useFormContext();

  return (
    <div>
      <label htmlFor={`${name}-field`}>
        <div className="flex">
          <div className="mb-1 uppercase font-bold tracking-wide text-xs text-gray-700">
            {label}
          </div>
          <div className="text-xs text-red-700 ml-auto" id={`${name}-field-error`}>
            {errors[name] && errors[name].message}
          </div>
        </div>
        <Input
          className="w-full mb-4"
          id={`${name}-field`}
          name={name}
          type={type}
          aira-invalid={errors[name] ? 'true' : 'false'}
          aira-describedby={`${name}-field-error`}
          ref={register}
        />
      </label>
    </div>
  );
}

UserCardFormField.propTypes = {
  label: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

UserCardFormField.defaultProps = {
  type: 'text',
};

export default UserCardFormField;
