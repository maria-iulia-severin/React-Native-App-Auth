import { ADD_INPUT, SET_INPUTS, DELETE_INPUT } from '../actions/incomes';
import Input from '../../models/input';
const initialState = {
  inputs: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_INPUT:
      return {
        ...state,
        inputs: state.inputs.filter(
         inputs => inputs.id !== action.id
       )
      
     };
    case SET_INPUTS:
      return {
        inputs: action.inputs.map(
          inp => new Input(inp.id.toString(), inp.name, inp.imageURL,inp.address, inp.amount.toString(), inp.description,inp.lat, inp.lng)
        )
      };
    case ADD_INPUT:
      const newInput = new Input(
        action.inputData.id.toString(),
        action.inputData.name,
        action.inputData.imageURL,
        action.inputData.address,
        action.inputData.amount.toString(),
        action.inputData.description,
        action.inputData.lat,
        action.inputData.lng
      );
      return {
        inputs: state.inputs.concat(newInput)
      };
    default:
      return state;
  }
};