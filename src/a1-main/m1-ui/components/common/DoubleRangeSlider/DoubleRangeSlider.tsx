import React from 'react';

import 'styles/DoubleRangeSlider.css';
import 'nouislider/dist/nouislider.css';
import Nouislider from 'nouislider-react';

import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';

type MapDispatchToPropsType = {
  onChangeRange: (value: [number, number]) => void;
};

type MapStateToPropsType = {
  startValues: [number, number];
  min: number;
  max: number;
  step: number;
  value1: number;
  value2: number;
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
  constructor(props: any) {
    super(props);
    this.state = {
      start: props.startValues,
    };
  }

  componentDidUpdate(prevProps: Readonly<SuperDoubleRangePropsType>): any {
    const { value1 } = this.props;
    if (value1 !== prevProps.value1) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        start: [value1, prevProps.value2],
      });
    }
  }

  onUpdate = (values: any[], handle: number, unencodedValues: number[]): any => {
    const { onChangeRange } = this.props;
    onChangeRange([unencodedValues[FIRST_ELEMENT], unencodedValues[SECOND_ELEMENT]]);
  };

  render(): any {
    const { min, max, step, disable } = this.props;
    const { start } = this.state;
    return (
      <span className="doubleRangeSliderRangeContainer">
        <Nouislider
          range={{ min, max }}
          start={start}
          step={step}
          disabled={disable}
          onUpdate={this.onUpdate}
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
