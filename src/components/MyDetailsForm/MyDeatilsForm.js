import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { reduxForm, Field } from 'redux-form';
import {
  Input,
  Row,
  Col,
  Button,
  DatePicker,
  Select
} from 'antd';

class MyDetailsForm extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    handleCreateUser: PropTypes.func.isRequired
  };

  renderInput = props => (
    <Input placeholder={ props.placeholder }
           value={ props.input.value }
           onChange={ props.input.onChange }
    />
  );

  renderDatePicker = props => (
    <DatePicker onChange={ props.input.onChange }
                value={ moment(props.input.value) }
                showToday
                style={{ width: '100%' }}
                placeholder={ props.placeholder }/>
  );

  renderDropdown = props => (
    <Select value={ props.input.value }
            onChange={ props.input.onChange }
            style={{ width: '100%' }}>
      <Select.Option value="Male">Male</Select.Option>
      <Select.Option value="Female">Female</Select.Option>
    </Select>
  );

  render() {
    const {
      handleSubmit,
      handleCreateUser
    } = this.props;

    return (
      <form className="my-details__form" onSubmit={handleSubmit(handleCreateUser)}>
        <Row className="form__header">
          <h2>Name</h2>
        </Row>
        <Row className="form form__body">
          <Col span={11}>
            <Field
              className="field_block"
              name="firstName"
              component={this.renderInput}
              placeholder="First Name"
            />
          </Col>
          <Col span={11} offset={2}>
            <Field
              className="field_block"
              name="lastName"
              component={this.renderInput}
              placeholder="Last Name"
            />
          </Col>
        </Row>

        <Row className="form form__header">
          <h2>Age and Gender</h2>
        </Row>
        <Row className="form__body">
          <Col span={11}>
            <Field
              className="field_block"
              name="dateOfBirth"
              component={this.renderDatePicker}
              placeholder="Date Of Birth"
            />
          </Col>
          <Col span={11} offset={2}>
            <Field
              className="field_block"
              name="gender"
              component={this.renderDropdown}
              placeholder="Gender"
            />
          </Col>
        </Row>

        <Row className="form form__btn">
          <Button
            type="primary"
            htmlType="submit"
          >NEXT</Button>
        </Row>
      </form>
    );
  }
}

MyDetailsForm = reduxForm({
  form: 'myDetailsForm',
  enableReinitialize: true
})(MyDetailsForm);

export default MyDetailsForm;
