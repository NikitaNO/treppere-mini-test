import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Input, Select } from 'antd';
import { Row, Col } from 'antd';

export default class PlansFormItem extends Component {
  constructor(props) {
    super(props);
    this.destinations = ['Japan', 'USA', 'Ukraine', 'England', 'Australia', 'Canada' ];
    this.currencies = ['USD', 'EUR', 'UAH'];
  }

  formatNumber = (value) => {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  };

  renderNumericInput = props => {
    const onChange = (e) => {
      const { value } = e.target;
      const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
      if (value === '') {
        props.input.onChange(0);
      } else if (value[0] === '0' && !isNaN(value.slice(1)) && reg.test(value.slice(1))) {
        props.input.onChange(value.slice(1));
      } else if (!isNaN(value) && reg.test(value)) {
        props.input.onChange(value);
      }
    };

    return (
      <Input placeholder={ props.placeholder }
             value={ props.input.value }
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
    const { fields, handleRemovePlan } = this.props;

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
                    placeholder="Currencies"/>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <span onClick={() => handleRemovePlan(index)} className="delete-plan">delete</span>
            </Col>
          </Row>
        )}
      </div>
    )
  }
}
