import React from 'react';

import 'styles/DoubleRangeSlider.css';
import 'nouislider/dist/nouislider.css';
import Nouislider from 'nouislider-react';

type MapDispatchToPropsType = {
  onChange: (values: any) => void;
};

type MapStateToPropsType = {
  startValues: [number, number];
  min: number;
  max: number;
  step: number;
  disable: boolean;
};

export type SuperDoubleRangePropsType = MapStateToPropsType & MapDispatchToPropsType;

type StateType = {
  start: number[];
};

export class DoubleRangeSlider extends React.Component<
  SuperDoubleRangePropsType,
  StateType
> {
  constructor(props: SuperDoubleRangePropsType) {
    super(props);
    this.state = {
      start: props.startValues,
    };
  }

  render(): React.ReactElement {
    const { min, max, step, disable, onChange } = this.props;
    const { start } = this.state;
    return (
      <span className="doubleRangeSliderRangeContainer">
        <Nouislider
          range={{ min, max }}
          start={start}
          step={step}
          disabled={disable}
          onChange={onChange}
          animate={false}
          connect
          tooltips={[
            {
              to(value: number) {
                return Math.round(value);
              },
              from(value: number) {
                return Math.round(value);
              },
            },
            {
              to(value: number) {
                return Math.round(value);
              },
              from(value: number) {
                return Math.round(value);
              },
            },
          ]}
        />
      </span>
    );
  }
}
