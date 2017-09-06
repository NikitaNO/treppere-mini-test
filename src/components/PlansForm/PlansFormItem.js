import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select } from 'antd';
import { Row, Col } from 'antd';

export default class PlansFormItem extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.destinations = ['Japan', 'USA', 'Ukraine', 'England', 'Australia', 'Canada' ];
    this.currencies = ['USD', 'EUR', 'UAH'];
    this.initialPlan = {
      destination: 'Japan',
      duration: 2,
      price: 120,
      currency: 'EUR'
    };
  }

  renderNumericInput = props => {
    const onChange = (e) => {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if (value === '') {
        props.input.onChange(0);
      } else if (value[0] === '0' && !isNaN(value.slice(1)) && reg.test(value.slice(1))) {
        props.input.onChange(+value.slice(1));
      } else if (!isNaN(value) && reg.test(value)) {
        props.input.onChange(+value);
      }
    };

    return (
      <Input placeholder={ props.placeholder }
             value={ +props.input.value }
             onChange={ onChange }
      />
    );
  };

  renderDestinationsSelect = props => (
    <Select value={ props.input.value }
            onChange={ props.input.onChange }>
      {this.destinations.map((d, i) => <Select.Option key={i} value={d}>{d}</Select.Option>)}
    </Select>
  );

  renderCurrenciesSelect = props => (
    <Select value={ props.input.value }
            onChange={ props.input.onChange }>
      {this.currencies.map((c, i) => <Select.Option key={i} value={c}>{c}</Select.Option>)}
    </Select>
  );

  render() {
    const { fields } = this.props;

    return (
      <div>
        {fields.map((plan, index) =>
          <Row key={index}>
            <hr/>
            <Col span={16}>
              <div className="fields-row">
                <div className="field-block">
                  <span>Destinations</span>
                  <Field
                    name={`${plan}.destination`}
                    type="text"
                    component={this.renderDestinationsSelect}
                    placeholder="Destinations"/>
                </div>
                <div className="field-block">
                  <span>Duration</span>
                  <Field
                    name={`${plan}.duration`}
                    type="text"
                    component={this.renderNumericInput}
                    placeholder="Duration"/>
                </div>
              </div>
              <div className="fields-row">
                <div className="field-block">
                  <span>Price</span>
                  <Field
                    name={`${plan}.price`}
                    type="text"
                    component={this.renderNumericInput}
                    placeholder="Price"/>
                </div>
                <div className="field-block">
                  <Field
                    name={`${plan}.currency`}
                    type="text"
                    component={this.renderCurrenciesSelect}
                    placeholder="Currencies" />
                </div>
              </div>
            </Col>
            <Col span={8}>
              <span onClick={() => fields.length && fields.remove(index)} className="delete-plan">delete</span>
            </Col>
          </Row>
        )}
        <span className="add-plan-btn" onClick={() => fields.push(this.initialPlan)}>+ Add plan (optional)</span>
      </div>
    )
  }
}
