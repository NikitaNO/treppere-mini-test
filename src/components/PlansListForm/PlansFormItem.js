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

  renderInput = props => (
    <Input placeholder={ props.placeholder }
           value={ props.input.value }
           onChange={ props.input.onChange }
    />
  );

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
                    component={this.renderInput}
                    placeholder="Duration"/>
                </div>
              </div>
              <div className="fields-row">
                <div className="field-block">
                  <span>Price</span>
                  <Field
                    name={`${plan}.price`}
                    type="text"
                    component={this.renderInput}
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
