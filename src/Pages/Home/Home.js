import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actionUpdateResultPoisson,
  actionUpdateResultCumulativePoisson,
  actionUpdateInputForm1,
  actionUpdateInputForm2
} from '../../Redux/Reducers/Pages/Reducer_Home'
class Home extends React.Component {
    constructor(props){
        super(props)
        this.handleUpdateInputForm1 = this.handleUpdateInputForm1.bind(this)
        this.handleUpdateInputForm2 = this.handleUpdateInputForm2.bind(this)
        this.handleButtonGetResultPoisson = this.handleButtonGetResultPoisson.bind(this)
        this.handleFactorial = this.handleFactorial.bind(this)
        this.handlePoisson = this.handlePoisson.bind(this)
      }
      handleUpdateInputForm1(event){
        let currentInputForm1 = event.target.value
        this.props.actionUpdateInputForm1(currentInputForm1)
      }
      handleFactorial(param1){
        if (param1 === 1 || param1 === 0)
        {
          return 1
        }
        return param1 * this.handleFactorial(param1-1)
      }
      handleUpdateInputForm2(event){
        let currentInputForm2 = event.target.value
        this.props.actionUpdateInputForm2(currentInputForm2)
      }
      handlePoisson(x, miu){
        const ePoisson = 2.71828
        let temporayResult = Math.pow(ePoisson,-(miu))
        let xFactorial = this.handleFactorial(x)
        temporayResult = temporayResult*Math.pow(miu,x)/xFactorial
        return temporayResult
        
      }
      handleButtonGetResultPoisson(){
        let currentInputForm1 = parseFloat(this.props.inputForm1)
        let currentInputForm2 = parseFloat(this.props.inputForm2)
        console.log('Current Input Form 1', currentInputForm1)
        console.log('Current Input Form 2', currentInputForm2)
        if(isNaN(currentInputForm1) === true){
          currentInputForm1 = 0
        }
        if(isNaN(currentInputForm2) === true){
          currentInputForm2 = 0
        }
        //
        let resultNonCummulative = this.handlePoisson(currentInputForm1, currentInputForm2)
        console.log(resultNonCummulative)
        this.props.actionUpdateResultPoisson(resultNonCummulative)
        let resultCummulative = 0
        for(let indexY = 0; indexY < currentInputForm1; indexY++){
          resultCummulative = resultCummulative + this.handlePoisson(indexY, currentInputForm2)
          if(indexY === (currentInputForm1-1)){
            this.props.actionUpdateResultCumulativePoisson(resultCummulative)
          }
        }
        console.log(">> RESULT CUMMULATIVE >>  ", resultCummulative)
      }
  render() {
    return (
        <div>
            <h1>Home</h1>
            <br/>
            <label>Input One</label>
            <br/>
              <input type="number" value={this.props.inputForm1} onChange={this.handleUpdateInputForm1}/>
            <br/>
            <label>Input Two</label>
            <br/>            
              <input type="number" value={this.props.inputForm2} onChange={this.handleUpdateInputForm2}/>
            <br/>
            <button onClick={this.handleButtonGetResultPoisson}>Test</button>
            <h2>RESULT POISSON : {this.props.result_poisson}</h2>
            <h2>RESULT POISSON CUMMULATIVE : {this.props.result_cumulative_poisson}</h2>
            <br/>
        </div>
    );
  }
}


const mapStateToProps = state => ({
    result_poisson: state.Reducer_Home.result_poisson,
    result_cumulative_poisson: state.Reducer_Home.result_cumulative_poisson,
    inputForm1: state.Reducer_Home.inputForm1,
    inputForm2: state.Reducer_Home.inputForm2
})
  
const mapDispatchToProps = dispatch => bindActionCreators({
    actionUpdateResultPoisson,
    actionUpdateResultCumulativePoisson,
    actionUpdateInputForm1,
    actionUpdateInputForm2
  }, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
  