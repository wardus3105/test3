/* 
    Created by thaolt
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import {
    StyleSheet
} from 'react-native';
import { Test3Props } from './test-3.props';
import { Test3Adapter } from './test-3.adapter';

export class Test3Component extends PureComponent<Test3Props> {
  private Test3Adapter: Test3Adapter;
 constructor(props: Test3Props) {
    super(props);
    this.Test3Adapter = new Test3Adapter(this);
  }

  render() {
    return (
      <>
        
      </>
    );
  }
}

const styles = StyleSheet.create({
    container: {

    }
});


