import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  actionUpdateResultPoisson,
  actionUpdateResultCumulativePoisson,
  actionUpdateInputForm1,
  actionUpdateInputForm2
} from '../../../Redux/Reducers/Pages/Reducer_Home'




class Home extends React.Component {
    constructor(props){
        super(props)
        // this.handleUpdateInputForm1 = this.handleUpdateInputForm1.bind(this)
        // this.handleUpdateInputForm2 = this.handleUpdateInputForm2.bind(this)
        this.state = {
            localStateOptionsRekening : [   { value: '15c518fb-4bb0-4e91-9b70-b80bdf543cfa', label: 'BCA 2' },
                                            { value: '7fb5c02b-2ed5-4daa-a731-747bf1cd0062', label: 'Kas'}],
            localStateOptionKeterangan : [  { value: '883b1178-9e0f-4574-a2e8-4b2d157149d1', label: 'Modal Usaha(Setoran Tunai)' },
                                            { value: '222ba568-9ef1-4db6-96f6-86109a357ea5', label: 'Beli Peralatan(Komputer,Rak, Kursi, Meja, Printer) Tunai'}],
            localStateSelectedRekeningDebet : '',
            localStateSelectedRekeningCredit : '',
            localStateSelectedKeterangan : '',            
        }
        this.handleCatchOptionDebet = this.handleCatchOptionDebet.bind(this)
        this.handleCatchOptionCredit = this.handleCatchOptionCredit.bind(this)
        this.handleCatchOptionKeterangan = this.handleCatchOptionKeterangan.bind(this)
    }
    handleCatchOptionDebet(value){
        console.log("handleCatchOptionDebet >>>", value)
    }
    handleCatchOptionCredit(value){
        console.log("handleCatchOptionCredit >>>", value)
    }
    handleCatchOptionKeterangan(value){
        // console.log("handleCatchOptionKeterangan >>>", value)
        // console.log("Object-> Label ", value.label) 
        // console.log("Object-> Value ", value.value) 
        this.setState({
            localStateSelectedKeterangan: value.value
        })      
        // console.log(this.state.localStateSelectedKeterangan, '<<<<<< selected keterangan')
    }

    // handleUpdateInputForm1(event){
    // let currentInputForm1 = event.target.value
    // this.props.actionUpdateInputForm1(currentInputForm1)
    // }
    // handleUpdateInputForm2(event){
    // let currentInputForm2 = event.target.value
    // this.props.actionUpdateInputForm2(currentInputForm2)
    // }
  render() {
    return (
        <div>
            <h1>Home</h1>
            <br/>
            {/*
            <label>Input One</label>
            <br/>
              <input type="number" value={this.props.inputForm1} onChange={this.handleUpdateInputForm1}/>
            <br/>
            <label>Input Two</label>
            <br/>            
              <input type="number" value={this.props.inputForm2} onChange={this.handleUpdateInputForm2}/>
            <br/>*/
            }
            <div>
                <Select
                name="form-field-name"
                value={this.state.localStateSelectedKeterangan}
                options={this.state.localStateOptionKeterangan}
                onChange={currentValue => this.handleCatchOptionKeterangan(currentValue)}
                searchable='true'
                clearable='true'
                
                />
            </div>
       
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
  