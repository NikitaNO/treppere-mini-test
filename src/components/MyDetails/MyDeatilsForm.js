import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  renderInput = props => (
    <Input placeholder={ props.placeholder }
           value={ props.input.value }
           onChange={ props.input.onChange }
    />
  );

  renderDatePicker = props => (
    <DatePicker onChange={ props.input.onChange }
                value={ props.input.value }
                showToday
                style={{ width: '100%' }}
                placeholder={ props.placeholder }/>
  );

  renderDropdown = props => (
    <Select value={ props.input.value }
            onChange={ props.input.onChange }
            style={{ width: '100%' }}>
      <Select.Option value="male">Male</Select.Option>
      <Select.Option value="female">Female</Select.Option>
    </Select>
  );

  render() {
    const {
      handleSubmit,
      handleAddUpdateAim
    } = this.props;

    return (
      <form onSubmit={handleSubmit(handleAddUpdateAim)}>
        <Row>
          <h2>Name</h2>
        </Row>
        <Row>
          <Col span={11}>
            <Field
              className="field_block"
              name="first_name"
              component={this.renderInput}
              placeholder="First Name"
            />
          </Col>
          <Col span={11} offset={2}>
            <Field
              className="field_block"
              name="last_name"
              component={this.renderInput}
              placeholder="Last Name"
            />
          </Col>
        </Row>

        <Row>
          <h2>Age and Gender</h2>
        </Row>
        <Row>
          <Col span={11}>
            <Field
              className="field_block"
              name="date_of_birth"
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

        <div className="buttons_block">
          <Button
            type="primary"
            htmlType="submit"
          >NEXT</Button>
        </div>
      </form>
    );
  }
}

MyDetailsForm = reduxForm({
  form: 'myDetailsForm',
  enableReinitialize: true
})(MyDetailsForm);

export default MyDetailsForm;
