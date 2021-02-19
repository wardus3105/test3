/* 
    Created by tuPC
*/

import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ContainerComponent } from "libraries/main/container/container.component";
import { TestUiAdapter} from "../model/test-ui.adapter";
import { TestUiProps} from "../model/test-ui.props";
import { TestUiStates} from "../model/test-ui.states";

export default class TestUiContainer extends React.PureComponent<
  TestUiProps, TestUiStates, 
> {
  TestUiAdapter: TestUiAdapter
  //Local States

  constructor(props: TestUiProps) {
    super(props);
    this.TestUiAdapter = new TestUiAdapter(this)
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


