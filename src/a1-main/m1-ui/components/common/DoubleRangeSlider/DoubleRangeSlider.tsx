import React from 'react';

import 'styles/DoubleRangeSlider.css';
import 'nouislider/dist/nouislider.css';
import Nouislider from 'nouislider-react';

import { FIRST_ELEMENT, SECOND_ELEMENT } from 'constants/common';

type MapDispatchToPropsType = {
  onUpdate: (value: [number, number]) => void;
  onChange: (values: any) => void;
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
  constructor(props: SuperDoubleRangePropsType) {
    super(props);
    this.state = {
      start: props.startValues,
    };
  }

  componentDidUpdate(prevProps: Readonly<SuperDoubleRangePropsType>): void {
    const { value1 } = this.props;
    if (value1 !== prevProps.value1) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        start: [value1, prevProps.value2],
      });
    }
  }

  onUpdate = (values: any[], handle: number, unencodedValues: number[]): void => {
    const { onUpdate } = this.props;
    onUpdate([unencodedValues[FIRST_ELEMENT], unencodedValues[SECOND_ELEMENT]]);
  };

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
          onUpdate={this.onUpdate}
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
