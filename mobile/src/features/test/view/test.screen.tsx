/* 
    Created by thaolt
*/

import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ContainerComponent } from "libraries/main/container/container.component";
import { TestAdapter} from "../model/test.adapter";
import { TestProps} from "../model/test.props";
import { TestStates} from "../model/test.states";

export default class TestContainer extends React.PureComponent<
  TestProps, TestStates, 
> {
  TestAdapter: TestAdapter
  //Local States

  constructor(props: TestProps) {
    super(props);
    this.TestAdapter = new TestAdapter(this)
    this.state = {
    };
  }

  render() {
    return (
      <ContainerComponent style={styles.container}>

      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});


